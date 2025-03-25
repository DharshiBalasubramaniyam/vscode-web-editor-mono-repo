/* eslint-disable @typescript-eslint/naming-convention */
import { createMachine, assign, interpret } from 'xstate';
import * as vscode from 'vscode';
import { EVENT_TYPE, AIVisualizerLocation, AIMachineStateValue, AI_EVENT_TYPE, AIUserTokens } from '@dharshi/ballerina-core';
import { AiPanelWebview } from './activators/ai/webview';
import { getAuthUrl, getLogoutUrl } from './activators/ai/auth';
import { balExtInstance } from './extension';
import { log } from './activators/editer-support/output-channel';

export const USER_CHECK_BACKEND_URL = '/user/usage';

interface ChatEntry {
    role: string;
    content: string;
    errorCode?: string;
}

interface UserToken {
    token?: string;
    userToken?: AIUserTokens;
}

interface AiMachineContext extends AIVisualizerLocation {
    token: string | undefined;
    errorMessage?: string;
    errorCode?: string;
    chatLog: ChatEntry[];
}

const aiStateMachine = createMachine<AiMachineContext>({
    /** @xstate-layout N4IgpgJg5mDOIC5QCMCGAbdYBOBLAdqgLSq4DEAIgJIDKACgPI0CiA2gAwC6ioADgPaxcAF1z98PEAA9EAFgBMAGhABPRAEZ2ANgB0WgKwBfQ8rSYcBYqR0ERuDLgBeYMhHFgb+AG78A1h7MsPEISXE87B2cEAh8AY1RRcQ5OZMkBIUSJJGk5AGYATj1c+QAOdXl9ZTUEWXUAdmNTDCDLUPDRSJc3fA8YvwDmixDrWw70JzBo7354zOTWdW5s9LtxSRkagqLS8srVRDKdIxMQQKGrMNH7cecyHGx+bB1edASAM0eAWx0z4Iv264TKZxBJifDzLhpQSrLKgDayLZaYplCpVRAVEo6XLYnG4nGNU6DP5tdD8KAwCAMACuwjIABkGABxKgAOVSy2hmXWGgUmPYJX0+VydT21RKJVyOjq7FyuwJv1a1mwYE+-C8YAAKv18K53J4fP4fkTFWFlar1Vr-PhgTNQUkuOy+JywdyEOpcrJ9DoSvIZbs0QgtOx2Dp2PoZbI6vJozH5PLjcMwgAlMCoCAqelMhgAVQ1jpAKy52Q2mjDUo9wtFiEFmP04Y9Udj0fj5mJ1hTaYzzAAGswAMK5tiQjkZF3FxBBuo6T2y1H7QNadQ6fL6WfHJqtk06Dvpsh9unMACCSfzhbHcMQdRXR3kBi0c+qddk04qDabzZOCsT29Tu4ZzLZYcnVHNZx0DXIQ3yIMhRFAM6nKadVzlT8E3+HcMxYDVszoU9nVAi83WDL06grWD50bZctGld1xVo8UWxab9YDAYRRHwKBYD3AAJQ88yAgs8NhHJCPkKd9HkUiq0DKNpyo9gaLo+iUM3b8IFwWBUGQLAIDIJNmA1JMAE1cJAoSNnvWs1wDX0pwlPF7PUBjzjaAB1Ug2KgAAxR46TJAg7mwB4nhed4viNFT-jcux2O87BfKgAgbVmMEISWYCYVdBFCiRHYHw0YNnxnZCN0YyL3IILyfL8nUaCoRkWQAfVZBqaGzPs+2YGgaBMjKwKy7YUSkup72XJCKictswiijzYvi-y+0PFkOrpHqiwI-qcsGgNNHyKd8m0cblNK1zypiqqEp1TzDyoOkqGYE9+LPfDhI25F-XndR1FkTFZAO9dCQitpmCkMBYhpCq9wYABZOgDw1Ic0oE0zMsRN68oQfRNEQtcJq3YHQfB9iyHupMGAexGnrMvJsrRqT9CDUacaO5zrHxsGPLIGgNQYHDHsElGadyqTFyXIrDpKlmwjZwmoEzRlmAoHM+Ip-m+tRoWA1yLRdGOE58H4CA4EkL8LihZGwKILQA0t3HvyuTozd6gj1C0QoBRgqSJT0f6TZJMkKWpYRHbW4T1DrKdsUFSsA3FZ9fSZiXJp0M01U1bVg-PUP3XkHRRMkgN9BFI560jd842ZpP0Iz56NivQpBXkKCSjI6poOXV9S-fW3-mY1iKvgEcnaz4pc5IhEW4nQ4wwjRsm27to1I0rTIGrqmEGGkN5B26P519EMRXn6xpoq2bqtX116h+sWhvUTF8nqWp2Hg3lC8PqWQfZirz7A+RvqOOotrzlyCUEM2ttbDQlPffIoljDGCAA */
    id: 'ballerina-ai',
    initial: "initialize",
    predictableActionArguments: true,
    context: {
        token: undefined,
        chatLog: [],
        errorCode: undefined,
        errorMessage: undefined,
    },
    on: {
        DISPOSE: {
            target: "initialize",
        }
    },
    states: {
        initialize: {
            invoke: {
                src: "checkToken",
                onDone: [
                    {
                        cond: (context, event) => event.data.token !== undefined, // Token is valid
                        target: "Ready",
                        actions: assign({
                            token: (context, event) => event.data.token,
                            userTokens: (context, event) => event.data.userToken
                        })
                    },
                    {
                        cond: (context, event) => event.data.token === undefined, // No token found
                        target: 'Settings'
                    }
                ],
                onError: {
                    target: 'disabled',
                    actions: assign({
                        errorCode: (context, event) => event.data
                    })
                }
            }
        },
        loggedOut: {
            on: {
                LOGIN: {
                    target: "WaitingForLogin",
                },
                SETUP: {
                    target: "Settings",
                }
            }
        },
        removeToken: {
            invoke: {
                src: 'removeToken',
                onDone: {
                    target: "Settings"
                }
            }
        },
        Ready: {
            on: {
                LOGOUT: "removeToken",
                EXECUTE: "Executing",
                CLEAR: {
                    target: "Ready",
                },
                LOGIN: {
                    target: "WaitingForLogin",
                },
                SETUP: {
                    target: "Settings",
                }
            }
        },
        Settings: {
            on: {
                CHAT: {
                    target: "Ready",
                },
                LOGIN: {
                    target: "WaitingForLogin",
                },
                LOGOUT: "removeToken",
            }
        },
        disabled: {
            invoke: {
                src: 'disableExtension'
            },
            on: {
                RETRY: {
                    target: "initialize",
                }
            }
        },
        WaitingForLogin: {
            invoke: {
                src: 'openLogin',
                onError: {
                    target: "Settings",
                    actions: assign({
                        errorCode: (context, event) => event.data
                    })
                }
            },
            on: {
                SIGN_IN_SUCCESS: "Ready",
                CANCEL: "Settings",
                FAILIER: "Settings"
            }
        },
        Executing: {
            on: {
                COMPLETE: "Ready",
                ERROR: "Ready",
                STOP: "Ready",
                LOGEDOUT: "Settings"
            }
        }
    }
}, {
    services: {
        checkToken: checkToken,
        openLogin: openLogin,
        removeToken: async (context, event) => {
            const logoutURL = await getLogoutUrl();
            vscode.env.openExternal(vscode.Uri.parse(logoutURL));
            await balExtInstance.context.secrets.delete('BallerinaAIUser');
            await balExtInstance.context.secrets.delete('BallerinaAIRefreshToken');
        },
    }
});


async function checkToken(context, event): Promise<UserToken> {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await balExtInstance.context.secrets.get('BallerinaAIUser');
            if (token) {
                if (token === '') {
                    resolve({ token: undefined, userToken: undefined });
                    return;
                }
                resolve({ token, userToken: undefined });
            } else {
                resolve({ token: undefined, userToken: undefined });
            }
        } catch (error: any) {
            log(error.toString());
            reject(error);
        }
    });
}

async function openLogin(context, event) {
    return new Promise(async (resolve, reject) => {
        try {
            const status:boolean = await initiateInbuiltAuth();
            console.log("Ai login Status: " + status);
            if (!status) {
                aiStateService.send({ type: "CANCEL" });
            }
        } catch (error) {
            console.log("Error while opening login: " + error);
            reject(error);
        }
    });
}


async function initiateInbuiltAuth() {
    const callbackUri = await vscode.env.asExternalUri(
        vscode.Uri.parse(`${vscode.env.uriScheme}://wso2.ballerina/signin`)
    );
    const oauthURL = await getAuthUrl(callbackUri.toString());
    return vscode.env.openExternal(vscode.Uri.parse(oauthURL));
}


// Create a service to interpret the machine
export const aiStateService = interpret(aiStateMachine);

// Define your API as functions
export const StateMachineAI = {
    initialize: () => aiStateService.start(),
    service: () => { return aiStateService; },
    context: () => { return aiStateService.getSnapshot().context; },
    state: () => { return aiStateService.getSnapshot().value as AIMachineStateValue; },
    sendEvent: (eventType: AI_EVENT_TYPE) => { aiStateService.send({ type: eventType }); }
};

export function openAIWebview(initialPrompt?: string) {
    balExtInstance.initialPrompt = typeof initialPrompt === 'string' ? initialPrompt : undefined;
    if (!AiPanelWebview.currentPanel) {
        AiPanelWebview.currentPanel = new AiPanelWebview();
    } else {
        AiPanelWebview.currentPanel!.getWebview()?.reveal();
    }
}

export function navigateAIView(type: EVENT_TYPE, viewLocation?: AIVisualizerLocation) {
    aiStateService.send({ type: type, viewLocation: viewLocation });
}

async function checkAiStatus() {
    return new Promise((resolve, reject) => {
        // Check for AI API status
        resolve(true);
    });
}
