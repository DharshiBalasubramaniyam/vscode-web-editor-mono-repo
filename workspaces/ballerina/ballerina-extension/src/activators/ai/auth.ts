import { getPluginConfig } from '../../utils/config';

export interface AccessToken {
    accessToken: string;
    expirationTime?: number;
    loginTime: string;
    refreshToken?: string;
}

const CommonReqHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf8',
    'Accept': 'application/json'
};

const config = getPluginConfig();
const AUTH_ORG = config.get('authOrg') as string || "ballerinacopilot";
const AUTH_CLIENT_ID = config.get('authClientID') as string || "9rKng8hSZd0VkeA45Lt4LOfCp9Aa";
const AUTH_REDIRECT_URL = config.get('authRedirectURL') as string || "vscode://wso2.ballerina/signin";

export async function getAuthUrl(callbackUri: string): Promise<string> {

    // return `${this._config.loginUrl}?profile=vs-code&client_id=${this._config.clientId}`
    //     + `&state=${stateBase64}&code_challenge=${this._challenge.code_challenge}`;
    const state = encodeURIComponent(btoa(JSON.stringify({ callbackUri })));
    return `https://api.asgardeo.io/t/${AUTH_ORG}/oauth2/authorize?response_type=code&redirect_uri=https://98c70105-822c-4359-8579-4da58f0ab4b7.e1-us-east-azure.choreoapps.dev&client_id=${AUTH_CLIENT_ID}&scope=openid&state=${state}`;
}

export function getLogoutUrl() : string {
    return `https://api.asgardeo.io/t/${AUTH_ORG}/oidc/logout`;
}

// export async function exchangeAuthCodeNew(authCode: string): Promise<AccessToken> {
//     const params = new URLSearchParams({
//         client_id: AUTH_CLIENT_ID,
//         code: authCode,
//         grant_type: 'authorization_code',
//         // redirect_uri: 'vscode://wso2.micro-integrator/signin',
//         redirect_uri: 'https://98c70105-822c-4359-8579-4da58f0ab4b7.e1-us-east-azure.choreoapps.dev',
//         scope: 'openid'
//     });
//     try {
//         const response = await axios.post(`https://api.asgardeo.io/t/${AUTH_ORG}/oauth2/token`, params.toString(), { headers: CommonReqHeaders });
//         return {
//             accessToken: response.data.access_token,
//             refreshToken: response.data.refresh_token,
//             loginTime: new Date().toISOString(),
//             expirationTime: response.data.expires_in
//         };
//     } catch (err) {
//         throw new Error(`Error while exchanging auth code to token: ${err}`);
//     }
// }


// export async function exchangeAuthCode(authCode: string) {
//     if (!authCode) {
//         throw new Error("Auth code is not provided.");
//     } else {
//         try {
//             console.log("Exchanging auth code to token...");
//             const response = await exchangeAuthCodeNew(authCode);
//             console.log("Access token: " + response.accessToken);
//             console.log("Refresh token: " + response.refreshToken);
//             console.log("Login time: " + response.loginTime);
//             console.log("Expiration time: " + response.expirationTime);
//             let token = await extension.context.secrets.get('BallerinaAIUser');
//             console.log("Token before exchange: " + token);
//             await extension.context.secrets.store('BallerinaAIUser', response.accessToken);
//             await extension.context.secrets.store('BallerinaAIRefreshToken', response.refreshToken ?? '');
//             token = await extension.context.secrets.get('BallerinaAIUser');
//             console.log("Token after exchange: " + token);

//             StateMachineAI.sendEvent(AI_EVENT_TYPE.SIGN_IN_SUCCESS);
//         } catch (error: any) {
//             const errMsg = "Error while signing in to Copilot! " + error?.message;
//             throw new Error(errMsg);
//         }
//     }
// }
