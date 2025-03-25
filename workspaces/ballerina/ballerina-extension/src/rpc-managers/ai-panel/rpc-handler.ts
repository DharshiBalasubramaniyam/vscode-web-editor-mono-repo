import {
    AddToProjectRequest,
    DeleteFromProjectRequest,
    GenerateMappingsFromRecordRequest,
    GenerateMappingsRequest,
    GenerateTestRequest,
    GenerateTypesFromRecordRequest,
    GeneratedTestSource,
    GetFromFileRequest,
    NotifyAIMappingsRequest,
    PostProcessRequest,
    ProjectSource,
    addToProject,
    applyDoOnFailBlocks,
    checkSyntaxError,
    clearInitialPrompt,
    deleteFromProject,
    generateMappings,
    getAccessToken,
    getActiveFile,
    getAiPanelState,
    getBackendURL,
    getFileExists,
    getFromDocumentation,
    getFromFile,
    getGeneratedTest,
    getInitialPrompt,
    getMappingsFromRecord,
    getProjectSource,
    getProjectUuid,
    getRefreshToken,
    getShadowDiagnostics,
    getTestDiagnostics,
    getTypesFromRecord,
    isCopilotSignedIn,
    isWSO2AISignedIn,
    login,
    logout,
    markAlertShown,
    notifyAIMappings,
    openChat,
    openSettings,
    postProcess,
    promptGithubAuthorize,
    promptLogin,
    promptWSO2AILogout,
    refreshAccessToken,
    showSignInAlert,
    stopAIMappings,
    updateProject
} from "@dharshi/ballerina-core";
import { Messenger } from "vscode-messenger";
import { AiPanelRpcManager } from "./rpc-manager";

export function registerAiPanelRpcHandlers(messenger: Messenger) {
    const rpcManger = new AiPanelRpcManager();
    // messenger.onRequest(getBackendURL, () => rpcManger.getBackendURL());
    // messenger.onNotification(updateProject, () => rpcManger.updateProject());
    // messenger.onNotification(login, () => rpcManger.login());
    // messenger.onNotification(logout, () => rpcManger.logout());
    // messenger.onRequest(getAiPanelState, () => rpcManger.getAiPanelState());
    // messenger.onRequest(getAccessToken, () => rpcManger.getAccessToken());
    // messenger.onNotification(refreshAccessToken, () => rpcManger.refreshAccessToken());
    // messenger.onRequest(getProjectUuid, () => rpcManger.getProjectUuid());
    // messenger.onNotification(addToProject, (args: AddToProjectRequest) => rpcManger.addToProject(args));
    // messenger.onRequest(getFromFile, (args: GetFromFileRequest) => rpcManger.getFromFile(args));
    // messenger.onRequest(getFileExists, (args: GetFromFileRequest) => rpcManger.getFileExists(args));
    // messenger.onNotification(deleteFromProject, (args: DeleteFromProjectRequest) => rpcManger.deleteFromProject(args));
    // messenger.onRequest(getRefreshToken, () => rpcManger.getRefreshToken());
    messenger.onRequest(generateMappings, (args: GenerateMappingsRequest) => rpcManger.generateMappings(args));
    messenger.onRequest(notifyAIMappings, (args: NotifyAIMappingsRequest) => rpcManger.notifyAIMappings(args));
    messenger.onRequest(stopAIMappings, () => rpcManger.stopAIMappings());
    messenger.onRequest(promptLogin, () => rpcManger.promptLogin());
    // messenger.onRequest(getProjectSource, () => rpcManger.getProjectSource());
    // messenger.onRequest(getShadowDiagnostics, (args: ProjectSource) => rpcManger.getShadowDiagnostics(args));
    // messenger.onRequest(checkSyntaxError, (args: ProjectSource) => rpcManger.checkSyntaxError(args));
    // messenger.onRequest(getInitialPrompt, () => rpcManger.getInitialPrompt());
    // messenger.onNotification(clearInitialPrompt, () => rpcManger.clearInitialPrompt());
    // messenger.onRequest(getGeneratedTest, (args: GenerateTestRequest) => rpcManger.getGeneratedTest(args));
    // messenger.onRequest(getTestDiagnostics, (args: GeneratedTestSource) => rpcManger.getTestDiagnostics(args));
    // messenger.onRequest(getMappingsFromRecord, (args: GenerateMappingsFromRecordRequest) => rpcManger.getMappingsFromRecord(args));
    // messenger.onRequest(getTypesFromRecord, (args: GenerateTypesFromRecordRequest) => rpcManger.getTypesFromRecord(args));
    // messenger.onNotification(applyDoOnFailBlocks, () => rpcManger.applyDoOnFailBlocks());
    // messenger.onRequest(postProcess, (args: PostProcessRequest) => rpcManger.postProcess(args));
    // messenger.onRequest(getActiveFile, () => rpcManger.getActiveFile());
    // messenger.onRequest(getFromDocumentation, (args: string) => rpcManger.getFromDocumentation(args));
    // messenger.onNotification(openSettings, () => rpcManger.openSettings());
    // messenger.onNotification(openChat, () => rpcManger.openChat());
    // messenger.onRequest(promptGithubAuthorize, () => rpcManger.promptGithubAuthorize());
    // messenger.onRequest(promptWSO2AILogout, () => rpcManger.promptWSO2AILogout());
    // messenger.onRequest(isCopilotSignedIn, () => rpcManger.isCopilotSignedIn());
    // messenger.onRequest(isWSO2AISignedIn, () => rpcManger.isWSO2AISignedIn());
    // messenger.onRequest(showSignInAlert, () => rpcManger.showSignInAlert());
    // messenger.onNotification(markAlertShown, () => rpcManger.markAlertShown());
}
