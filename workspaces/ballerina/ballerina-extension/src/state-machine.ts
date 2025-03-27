import { createMachine, assign, interpret } from 'xstate';
import { EVENT_TYPE, SyntaxTree, History, MachineStateValue, UndoRedoManager, VisualizerLocation, webviewReady, MACHINE_VIEW } from "@dharshi/ballerina-core";
import { commands, Uri, workspace, RelativePattern, window } from 'vscode';
import { RPCLayer } from './RPCLayer';
import { generateUid, getComponentIdentifier, getNodeByIndex, getNodeByName, getNodeByUid, getView } from './utils/state-machine-utils';
import { ExtendedLanguageClient } from './extended-language-client';
import { activateLanguageServer } from './activators/ls/activateLS';
import { activateFileSystemProvider } from './activators/fs/activateFS';
import { VisualizerWebview } from './activators/visualizer/webview';
import { balExtInstance } from './extension';
import { StateMachinePopup } from './state-machine-popup';
import { setGoToSourceContext } from './utils/commonUtils';

interface MachineContext extends VisualizerLocation {
    langClient: ExtendedLanguageClient | null;
    errorCode: string | null;
}

export let history: History;
export let undoRedoManager: UndoRedoManager;

const stateMachine = createMachine<MachineContext>(
    {
        id: "Visualizer",
        initial: 'initialize',
        predictableActionArguments: true,
        context: {
            langClient: null,
            errorCode: null,
            view: MACHINE_VIEW.Overview // initially it is "Overview"
        },
        on: {
            RESET_TO_EXTENSION_READY: {
                target: "extensionReady"
            }
        },
        states: {
            initialize : {
                invoke: {
                    src: 'activateLanguageServer',
                    onDone: {
                        target: "activateFS",
                        actions: assign({
                            langClient: (context, event) => event.data
                        })
                    },
                    onError: {
                        target: "extensionReady"
                    }
                }
            },
            activateFS: {
                invoke: {
                    src: 'activateFileSystemProvider',
                    onDone: {
                        target: "extensionReady"
                    },
                    onError: {
                        target: "extensionReady"
                    }
                }
            },
            lsError: {
                on: {
                    RETRY: "initialize"
                }
            },
            extensionReady: {
                on: {
                    OPEN_VIEW: {
                        target: "viewActive",
                        actions: assign({
                            view: (context, event) => event.viewLocation.view,
                            documentUri: (context, event) => event.viewLocation.documentUri,
                            projectUri: (context, event) => getProjectUri(event.viewLocation.documentUri),
                            position: (context, event) => event.viewLocation.position,
                            identifier: (context, event) => event.viewLocation.identifier,
                            serviceType: (context, event) => event.viewLocation.serviceType,
                            type: (context, event) => event.viewLocation?.type,
                            isGraphql: (context, event) => event.viewLocation?.isGraphql
                        })
                    }
                }
            },
            viewActive: {
                initial: "viewInit",
                states: {
                    viewInit: {
                        invoke: {
                            src: 'openWebView',
                            onDone: {
                                target: "webViewLoading"
                            },
                        }
                    },
                    webViewLoading: {
                        invoke: {
                            src: 'findView', 
                            onDone: {
                                target: "webViewLoaded"
                            }
                        }
                    },
                    webViewLoaded: {
                        invoke: {
                            src: 'showView',
                            onDone: {
                                target: "viewReady",
                                actions: assign({
                                    view: (context, event) => event.data.view,
                                    identifier: (context, event) => event.data.identifier,
                                    position: (context, event) => event.data.position,
                                    syntaxTree: (context, event) => event.data.syntaxTree,

                                })
                            }
                        }
                    },
                    viewReady: {
                        on: {
                            OPEN_VIEW: {
                                target: "viewInit",
                                actions: assign({
                                    view: (context, event) => event.viewLocation.view,
                                    documentUri: (context, event) => event.viewLocation.documentUri,
                                    projectUri: (context, event) => getProjectUri(event.viewLocation.documentUri),
                                    position: (context, event) => event.viewLocation.position,
                                    identifier: (context, event) => event.viewLocation.identifier,
                                    serviceType: (context, event) => event.viewLocation.serviceType,
                                    type: (context, event) => event.viewLocation?.type,
                                    isGraphql: (context, event) => event.viewLocation?.isGraphql
                                })
                            },
                            VIEW_UPDATE: {
                                target: "webViewLoaded",
                                actions: assign({
                                    documentUri: (context, event) => event.viewLocation.documentUri ? event.viewLocation.documentUri : context.documentUri,
                                    position: (context, event) => event.viewLocation.position,
                                    view: (context, event) => event.viewLocation.view,
                                    identifier: (context, event) => event.viewLocation.identifier,
                                    serviceType: (context, event) => event.viewLocation.serviceType,
                                    type: (context, event) => event.viewLocation?.type,
                                    isGraphql: (context, event) => event.viewLocation?.isGraphql
                                })
                            },
                            FILE_EDIT: {
                                target: "viewEditing",
                                actions: assign({
                                    documentUri: (context, event) => event.viewLocation.documentUri,
                                    projectUri: (context, event) => getProjectUri(event.viewLocation.documentUri),
                                    position: (context, event) => event.viewLocation.position,
                                    identifier: (context, event) => event.viewLocation.identifier,
                                    type: (context, event) => event.viewLocation?.type,
                                    isGraphql: (context, event) => event.viewLocation?.isGraphql
                                })
                            },
                        }
                    },
                    viewEditing: {
                        on: {
                            EDIT_DONE: {
                                target: "viewReady",
                                actions: assign({
                                    documentUri: (context, event) => event.viewLocation.documentUri,
                                    position: (context, event) => event.viewLocation.position,
                                    identifier: (context, event) => event.viewLocation.identifier,
                                    type: (context, event) => event.viewLocation?.type,
                                    isGraphql: (context, event) => event.viewLocation?.isGraphql
                                })
                            }
                        }
                    }
                }
            }
        }
    }, {
    services: {
        activateLanguageServer: (context, event) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const langClient = await activateLanguageServer();
                    // StateMachineAI.initialize();
                    StateMachinePopup.initialize();
                    resolve(langClient);
                } catch (error) {
                    throw new Error("LS Activation failed.");
                }
            });
        },
        activateFileSystemProvider: (context, event) => {
            return new Promise(async (resolve, reject) => {
                try {
                    await activateFileSystemProvider();
                    resolve(true);
                } catch (error) {
                    throw new Error("LS Activation failed.");
                }
            });
        },
        openWebView: (context, event) => {
            console.log("Opening webview...");
            // Get context values from the project storage so that we can restore the earlier state when user reopens vscode
            return new Promise((resolve, reject) => {
                if (!VisualizerWebview.currentPanel) {
                    console.log("Creating new webview...");
                    VisualizerWebview.currentPanel = new VisualizerWebview();
                    console.log("Webview created...");
                    history = new History();
                    undoRedoManager = new UndoRedoManager();
                    RPCLayer._messenger.onNotification(webviewReady, () => {
                        console.log("Webview ready...");
                        const webview = VisualizerWebview.currentPanel?.getWebview();
                        console.log("Webview: ", webview.title);
                        resolve(true);
                    });
                } else {
                    console.log("Revealing existing webview...");
                    VisualizerWebview.currentPanel!.getWebview()?.reveal();
                    resolve(true);
                }
            });
        },
        findView(context, event): Promise<void> {
            console.log("finding view...");
            return new Promise(async (resolve, reject) => {
                if (!context.view && context.langClient) {
                    if (!context.position || ("groupId" in context.position)) {
                        console.log("found group id in position");
                        history.push({ location: { view: MACHINE_VIEW.Overview, documentUri: context.documentUri } });
                        return resolve();
                    } else {
                        console.log("Not group id found position...");
                        const view = await getView(context.documentUri ? context.documentUri : "", context.position, context?.projectUri);
                        console.log("current view: ", view);
                        history.push(view);
                        return resolve();
                    }
                } else {
                    console.log("i am in out side else");
                    history.push({
                        location: {
                            view: context.view,
                            documentUri: context.documentUri,
                            position: context.position,
                            identifier: context.identifier,
                            serviceType: context?.serviceType,
                            type: context?.type,
                            isGraphql: context?.isGraphql
                        }
                    });
                    return resolve();
                }
            });
        },
        showView(context, event): Promise<VisualizerLocation> {
            console.log("showing view.");
            console.log("identifier: ", context.identifier);
            StateMachinePopup.resetState();
            return new Promise(async (resolve, reject) => {
                StateMachinePopup.resetState();
                const historyStack = history.get();
                const selectedEntry = historyStack[historyStack.length - 1];
                console.log("history stack: ", historyStack);
                if (!context.langClient) {
                    console.log("No lang client.....");
                    if (!selectedEntry) {
                        return resolve({ view: MACHINE_VIEW.Overview, documentUri: context.documentUri });
                    }
                    return resolve({ ...selectedEntry.location, view: selectedEntry.location.view ? selectedEntry.location.view : MACHINE_VIEW.Overview });
                }

                if (selectedEntry && selectedEntry.location.view === MACHINE_VIEW.ERDiagram) {
                    setGoToSourceContext(MACHINE_VIEW.ERDiagram);
                    return resolve(selectedEntry.location);
                }

                setGoToSourceContext(selectedEntry?.location?.view);

                const defaultLocation = {
                    documentUri: context.documentUri,
                    position: undefined
                };
                const {
                    location = defaultLocation,
                    uid
                } = selectedEntry ?? {};

                const { documentUri, position } = location;
                console.log("documentUri: ", documentUri);
                const node = documentUri && await StateMachine.langClient()?.getSyntaxTree({
                    documentIdentifier: {
                        uri: Uri.parse(documentUri).toString()
                    }
                }) as SyntaxTree;
                console.log("node: ", node.parseSuccess);

                if (!selectedEntry?.location.view) {
                    return resolve({ view: MACHINE_VIEW.Overview, documentUri: context.documentUri });
                }
                let selectedST;

                if (node?.parseSuccess) {
                    const fullST = node.syntaxTree;
                    if (!uid && position) {
                        const generatedUid = generateUid(position, fullST);
                        selectedST = getNodeByUid(generatedUid, fullST);
                        if (generatedUid) {
                            history.updateCurrentEntry({
                                ...selectedEntry,
                                location: {
                                    ...selectedEntry.location,
                                    position: selectedST.position,
                                    syntaxTree: selectedST
                                },
                                uid: generatedUid
                            });
                        } else {
                            // show identification failure message
                        }
                    }

                    if (uid && position) {
                        selectedST = getNodeByUid(uid, fullST);

                        if (!selectedST) {
                            const nodeWithUpdatedUid = getNodeByName(uid, fullST);
                            selectedST = nodeWithUpdatedUid[0];

                            if (selectedST) {
                                history.updateCurrentEntry({
                                    ...selectedEntry,
                                    location: {
                                        ...selectedEntry.location,
                                        position: selectedST.position,
                                        syntaxTree: selectedST
                                    },
                                    uid: nodeWithUpdatedUid[1]
                                });
                            } else {
                                const nodeWithUpdatedUid = getNodeByIndex(uid, fullST);
                                selectedST = nodeWithUpdatedUid[0];

                                if (selectedST) {
                                    history.updateCurrentEntry({
                                        ...selectedEntry,
                                        location: {
                                            ...selectedEntry.location,
                                            identifier: getComponentIdentifier(selectedST),
                                            position: selectedST.position,
                                            syntaxTree: selectedST
                                        },
                                        uid: nodeWithUpdatedUid[1]
                                    });
                                } else {
                                    // show identification failure message
                                }
                            }
                        } else {
                            history.updateCurrentEntry({
                                ...selectedEntry,
                                location: {
                                    ...selectedEntry.location,
                                    position: selectedST.position,
                                    syntaxTree: selectedST
                                }
                            });
                        }
                    }
                    undoRedoManager.updateContent(documentUri ? documentUri : "", node?.syntaxTree?.source);
                }
                const updatedHistory = history.get();
                console.log("updatedHistory: ", updatedHistory);
                return resolve(updatedHistory[updatedHistory.length - 1].location);
            });
        }
    }
});

// Create a service to interpret the machine
const stateService = interpret(stateMachine).onTransition(state => {
    console.log("state change to: ", state);
});

function startMachine(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        stateService.start().onTransition((state) => {
            if (state.value === "extensionReady") {
                resolve();
            }
        });
    });
}

// Define your API as functions
export const StateMachine = {
    initialize: async () => await startMachine(),
    service: () => { return stateService; },
    context: () => { return stateService.getSnapshot().context; },
    langClient: () => { return stateService.getSnapshot().context.langClient; },
    state: () => { return stateService.getSnapshot().value as MachineStateValue; },
    sendEvent: (eventType: EVENT_TYPE) => { stateService.send({ type: eventType }); },
    resetToExtensionReady: () => {
        stateService.send({ type: 'RESET_TO_EXTENSION_READY' });
    },
};

export function openView(type: EVENT_TYPE, viewLocation: VisualizerLocation, resetHistory = false) {
    if (resetHistory) {
        history.clear();
    }
    console.log("getting document uri: ", viewLocation);
    let location = viewLocation.documentUri || StateMachine.context().documentUri;
    if (viewLocation.documentUri && viewLocation.isNew) {
        const activeEditor = balExtInstance.activeBalFileUri; 
        console.log("new contruct: ", activeEditor);
        if (!activeEditor) {
            window.showErrorMessage("No active ballerina text editor found!");
            return;
        }
        location = activeEditor;
    }
    console.log({"document uri: ": viewLocation.documentUri, "location": location});
    stateService.send({ type: type, viewLocation: {...viewLocation, documentUri: location} });
}

export function updateView() {
    console.log("history stack: ", history);  
    const historyStack = history.get();
    stateService.send({ type: "VIEW_UPDATE", viewLocation: historyStack.length > 0 ? historyStack[historyStack.length - 1].location : { view: MACHINE_VIEW.Overview } });
    // notifyCurrentWebview();
}

function getProjectUri(filePath: string) : string {
    const workspaceFolders = workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        throw new Error("No workspace folders found");
    }
    const projectUri = workspaceFolders.find((folder) => {
        const folderUri = folder.uri.toString();
        return filePath?.includes(folderUri) && filePath.startsWith(folderUri);
    });
    console.log("finding project uri: ", {
        "filepath": filePath,
        "project uri": projectUri
    });
    if (!projectUri) {
        throw new Error(`No matching workspace folder found for the given file path: ${filePath}`);
    }
    return projectUri.uri.toString();
}

async function checkForProjects() {
    let isBI = false;
    let projectUri = '';
    try {
        const workspaceFolders = workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            throw new Error("No workspace folders found");
        }
        // Assume we are only interested in the root workspace folder
        const rootFolder = workspaceFolders[0];
        const tomlFile = await workspace.findFiles(new RelativePattern(rootFolder, "Ballerina.toml"), null, 1);
        if (tomlFile.length > 0) {
            const tomlFileContent = await workspace.fs.readFile(tomlFile[0]);
            const contentAsString = new TextDecoder('utf-8').decode(tomlFileContent);
            isBI = contentAsString.includes("bi = true");
        }
        projectUri = `${rootFolder.uri.scheme}:${rootFolder.uri.path}`;
    } catch (err) {
        console.error(err);
    }
    commands.executeCommand('setContext', 'isBIProject', isBI);
    return { isBI, projectUri };
}
