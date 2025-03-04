
import { AIVisualizerState, AddToProjectRequest, GetFromFileRequest, DeleteFromProjectRequest, GenerateMappingsRequest, GenerateMappingsResponse, NotifyAIMappingsRequest, ProjectSource, ProjectDiagnostics, InitialPrompt, GenerateTestRequest, GeneratedTestSource, GenerateMappingsFromRecordRequest, GenerateMappingFromRecordResponse, PostProcessRequest, PostProcessResponse, GenerateTypesFromRecordRequest, GenerateTypesFromRecordResponse } from "./interfaces";
import { RequestType, NotificationType } from "vscode-messenger-common";

const _preFix = "ai-panel";
export const getBackendURL: RequestType<void, string> = { method: `${_preFix}/getBackendURL` };
export const updateProject: NotificationType<void> = { method: `${_preFix}/updateProject` };
export const login: NotificationType<void> = { method: `${_preFix}/login` };
export const logout: NotificationType<void> = { method: `${_preFix}/logout` };
export const getAiPanelState: RequestType<void, AIVisualizerState> = { method: `${_preFix}/getAiPanelState` };
export const getAccessToken: RequestType<void, string> = { method: `${_preFix}/getAccessToken` };
export const refreshAccessToken: NotificationType<void> = { method: `${_preFix}/refreshAccessToken` };
export const getProjectUuid: RequestType<void, string> = { method: `${_preFix}/getProjectUuid` };
export const addToProject: NotificationType<AddToProjectRequest> = { method: `${_preFix}/addToProject` };
export const getFromFile: RequestType<GetFromFileRequest, string> = { method: `${_preFix}/getFromFile` };
export const getFileExists: RequestType<GetFromFileRequest, boolean> = { method: `${_preFix}/getFileExists` };
export const deleteFromProject: NotificationType<DeleteFromProjectRequest> = { method: `${_preFix}/deleteFromProject` };
export const getRefreshToken: RequestType<void, string> = { method: `${_preFix}/getRefreshToken` };
export const generateMappings: RequestType<GenerateMappingsRequest, GenerateMappingsResponse> = { method: `${_preFix}/generateMappings` };
export const notifyAIMappings: RequestType<NotifyAIMappingsRequest, boolean> = { method: `${_preFix}/notifyAIMappings` };
export const stopAIMappings: RequestType<void, GenerateMappingsResponse> = { method: `${_preFix}/stopAIMappings` };
export const promptLogin: RequestType<void, boolean> = { method: `${_preFix}/promptLogin` };
export const getProjectSource: RequestType<void, ProjectSource> = { method: `${_preFix}/getProjectSource` };
export const getShadowDiagnostics: RequestType<ProjectSource, ProjectDiagnostics> = { method: `${_preFix}/getShadowDiagnostics` };
export const checkSyntaxError: RequestType<ProjectSource, boolean> = { method: `${_preFix}/checkSyntaxError` };
export const getInitialPrompt: RequestType<void, InitialPrompt> = { method: `${_preFix}/getInitialPrompt` };
export const clearInitialPrompt: NotificationType<void> = { method: `${_preFix}/clearInitialPrompt` };
export const getGeneratedTest: RequestType<GenerateTestRequest, GeneratedTestSource> = { method: `${_preFix}/getGeneratedTest` };
export const getTestDiagnostics: RequestType<GeneratedTestSource, ProjectDiagnostics> = { method: `${_preFix}/getTestDiagnostics` };
export const getMappingsFromRecord: RequestType<GenerateMappingsFromRecordRequest, GenerateMappingFromRecordResponse> = { method: `${_preFix}/getMappingsFromRecord` };
export const getTypesFromRecord: RequestType<GenerateTypesFromRecordRequest, GenerateTypesFromRecordResponse> = { method: `${_preFix}/getTypesFromRecord` };
export const applyDoOnFailBlocks: NotificationType<void> = { method: `${_preFix}/applyDoOnFailBlocks` };
export const postProcess: RequestType<PostProcessRequest, PostProcessResponse> = { method: `${_preFix}/postProcess` };
export const getActiveFile: RequestType<void, string> = { method: `${_preFix}/getActiveFile` };
export const getFromDocumentation: RequestType<string, string> = { method: `${_preFix}/getFromDocumentation` };
export const openSettings: NotificationType<void> = { method: `${_preFix}/openSettings` };
export const openChat: NotificationType<void> = { method: `${_preFix}/openChat` };
export const promptGithubAuthorize: RequestType<void, boolean> = { method: `${_preFix}/promptGithubAuthorize` };
export const promptWSO2AILogout: RequestType<void, boolean> = { method: `${_preFix}/promptWSO2AILogout` };
export const isCopilotSignedIn: RequestType<void, boolean> = { method: `${_preFix}/isCopilotSignedIn` };
export const isWSO2AISignedIn: RequestType<void, boolean> = { method: `${_preFix}/isWSO2AISignedIn` };
export const showSignInAlert: RequestType<void, boolean> = { method: `${_preFix}/showSignInAlert` };
export const markAlertShown: NotificationType<void> = { method: `${_preFix}/markAlertShown` };
