import { createMachine, assign, interpret } from 'xstate';
import { EVENT_TYPE, SyntaxTree, History, HistoryEntry, MachineStateValue, STByRangeRequest, SyntaxTreeResponse, UndoRedoManager, VisualizerLocation, webviewReady, MACHINE_VIEW, DIRECTORY_MAP } from "@dharshi/ballerina-core";
// import { fetchAndCacheLibraryData } from './features/library-browser';
import { commands, Uri, workspace, RelativePattern, FileSystemProvider } from 'vscode';
import { notifyCurrentWebview, RPCLayer } from './RPCLayer';
import { generateUid, getComponentIdentifier, getNodeByIndex, getNodeByName, getNodeByUid, getView } from './utils/state-machine-utils';
import { ExtendedLanguageClient } from './extended-language-client';
import { activateLanguageServer } from './activators/ls/activateLS';
import { activateFileSystemProvider } from './activators/fs/activateFS';
import { VisualizerWebview } from './activators/visualizer/webview';
import { balExtInstance } from './extension';
// import { BiDiagramRpcManager } from './rpc-managers/bi-diagram/rpc-manager';
// import { StateMachineAI } from './views/ai-panel/aiMachine';
import { StateMachinePopup } from './state-machine-popup';

interface MachineContext extends VisualizerLocation {
    langClient: ExtendedLanguageClient | null;
    errorCode: string | null;
}

export let history: History;
export let undoRedoManager: UndoRedoManager;

const stateMachine = createMachine<MachineContext>(
    {
        /** @xstate-layout N4IgpgJg5mDOIC5QDUCWsCuBDANqgXmAE4B0AkgHaoAuAxBAPYVgmoUBuDA1i2prgWLkq1BG04BjLNVRMA2gAYAuoqWJQABwawasiupAAPRACYAjGZIKArCYUAOAMxnr1gJz23HgDQgAnqYKjiQmACxeXgBskaEA7KGRsfYAvsm+fNh4hKSUNLTERAykGjjSAGZFALYkGQLZwjRiHAxSMvLKqgZaOm36SEaI0ZEkZiZ21mY2jtbTvgEIbrEkkU4mK7Em7hZOqenomYKkAKJEhUS0AEpHACoXAJqd-d26TAbGCKNziKO7ILVZQguYCwED8tAA8gAFI4AOQA+sgyEcAOqPTTaF59UDvcLBSLTUKhBSbab40JfD6xBQkNyOeKxMzOBRuEyxFm-f6HGqoMAAdwAghIZOwwLQAMIAGXBAGUjmiQM9em9EI5IiYaSYWY57GY3GTEhTHCZ7MtVXFzMyxmZYhz9nUhGg+YLhaKobCEUjUcouhilf13saSI44rYzJ5Qjr4o5HBT7AphrZg9bpmEZpFbfwAaRHQKhagRbQAGJkCVHOFigAS-JhAHEjgAReWKvTKj4KWIUxLDTYKSaOPVeILWDMHeo5535ljsHm83J0RjMVjNHjczNc8d5kUkad8udNSTSPSqJu+lv+xCEhNORw2eyJOJOCludwkWLWXuM+N2SLWFJpP52lm3JOpuU4znO+SnEUJAlOUVSrqODozhOW47rOIj7i0h7tCo3pPKerznh8oSBi49ihKMTjhO+Hb+BexIkBGX5jJq0ZqiO9rZshoEkLyYAAEY5hKDAgpA9BMCw4jcLwgHrtxLq8QJQkiRAkCYa0R4dHh6I9Ge2KILEMRBs+STMmYkQWMSsb4iQ74KPZhJxFGf57GuY7yZOimCTOwmiRAkFnDBpTUBURDVJy7kgQpfHeXyvmqRA6nYRQx7aQqBFYgMCCGaExnWKZbjmZZJixuZVj2e2kRuHExKuBxQEbgpaHxWwUC0IiKJwlc-L1g8aXNoR+lthZjGsn2ozrO41nqhVvZEjE-bWKE9VyVFnkYBoEDSGAObiYuUkrhFSFrVuG1bdQO0zklvSpWo+G6YNWWXrZ163veSQxnR2UWOVvabCY0x-W4K2RbmClndtu0FNBsEhfBR1cSdLAQxdObXZpuF3TpmKts9v7Rm99KPl90TBHZCgkfi1VuL2qT-hQDCqfA-QIz6D2Ze8AC0iTLLYD6TBM9ibLR8yc2+tkVWYCR6vY77hCDQhzmzONESRFLWt24R6hMGw2KyjgK8cUFEMrfpDaMawkHG5iuHSstGtY6uTFY4yMiyzIUbENr-gjJBAiC8zY2bWWqsM+JLbE2rxjE1WffMdjqmEUR6jYHhGstPuyaDKFgKbelZZzuq82ESQC2GmwGl9+XWDSETU6yP6y4bwFg55aFK-dKtDca6ozKMDjGvNCRx4g1MS-ZtiR-lzgZ65iGI63W4xcpfl5497zuNS2ozFS1iRMykdmLGNivnZ5lqvGhVmM3jVtz5KmtWvHOjy4QahHSaw0-brLTePc3xu-Z8s8AJuWOovMCfJ-agifq2C2lhdTWwSESeI79f5a1pD+cyXhnA3w8qdTakMZwwKIpsXKCdL5hDjPGewFIva5R-L+Kk+9+wWG9nPTiLcc7bhnCcM4xChqFRrsGD+VUHAzB-iTKqp8PyhAmE5LwdNkhAA */
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
            initialize: {
                invoke: {
                    src: checkForProjects,
                    onDone: {
                        target: "activateLS",
                        actions: assign({
                            isBI: (context, event) => event.data.isBI,
                            projectUri: (context, event) => event.data.projectUri
                        })
                    },
                    onError: {
                        target: "activateLS"
                    }
                }
            },
            activateLS: {
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
                            src: 'findView', // NOTE: We only find the view and indentifer from this state as we already have the position and the file URL
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
                    commands.executeCommand('setContext', 'BI.status', 'loading');
                    const langClient = await activateLanguageServer();
                    // fetchAndCacheLibraryData();
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
            // Get context values from the project storage so that we can restore the earlier state when user reopens vscode
            return new Promise((resolve, reject) => {
                if (!VisualizerWebview.currentPanel) {
                    VisualizerWebview.currentPanel = new VisualizerWebview();
                    RPCLayer._messenger.onNotification(webviewReady, () => {
                        history = new History();
                        undoRedoManager = new UndoRedoManager();
                        const webview = VisualizerWebview.currentPanel?.getWebview();
                        if (webview && (context.isBI || context.view === MACHINE_VIEW.BIWelcome)) {
                            webview.title = "Kola";
                            webview.iconPath = {
                                light: Uri.file(Uri.joinPath(balExtInstance.context.extensionUri, 'resources', 'icons', 'dark-icon.svg').toString()),
                                dark: Uri.file(Uri.joinPath(balExtInstance.context.extensionUri, 'resources', 'icons', 'light-icon.svg').toString())
                            };
                        }
                        resolve(true);
                    });

                } else {
                    VisualizerWebview.currentPanel!.getWebview()?.reveal();
                    resolve(true);
                }
            });
        },
        findView(context, event): Promise<void> {
            return new Promise(async (resolve, reject) => {
                if (!context.view && context.langClient) {
                    if (!context.position || ("groupId" in context.position)) {
                        console.log("found group id in position");
                        if (context.isBI) {
                            // const entryPoints = (await new BiDiagramRpcManager().getProjectStructure()).directoryMap[DIRECTORY_MAP.SERVICES].length;
                            // if (entryPoints === 0) {
                            //     history.push({ location: { view: MACHINE_VIEW.Overview, documentUri: context.documentUri } });
                            //     return resolve();
                            // }
                        }
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
            StateMachinePopup.resetState();
            return new Promise(async (resolve, reject) => {
                StateMachinePopup.resetState();
                const historyStack = history.get();
                const selectedEntry = historyStack[historyStack.length - 1];

                if (!context.langClient) {
                    console.log("No lang client.....");
                    if (!selectedEntry) {
                        return resolve({ view: MACHINE_VIEW.Overview, documentUri: context.documentUri });
                    }
                    return resolve({ ...selectedEntry.location, view: selectedEntry.location.view ? selectedEntry.location.view : MACHINE_VIEW.Overview });
                }

                if (selectedEntry && selectedEntry.location.view === MACHINE_VIEW.ERDiagram) {
                    return resolve(selectedEntry.location);
                }

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
    // type: OPEN_VIEW, viewLocation: { documenturi, position }
    stateService.send({ type: type, viewLocation: viewLocation });
}

export function updateView() {
    const historyStack = history.get();
    stateService.send({ type: "VIEW_UPDATE", viewLocation: historyStack.length > 0 ? historyStack[historyStack.length - 1].location : { view: MACHINE_VIEW.Overview } });
    if (StateMachine.context().isBI) {
        commands.executeCommand("BI.project-explorer.refresh");
    }
    // notifyCurrentWebview();
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
