import { LANGUAGE } from '../extension';
import { ConfigurationTarget, workspace, WorkspaceConfiguration } from 'vscode';

interface BallerinaPluginConfig extends WorkspaceConfiguration {
    home?: string;
    debugLog?: boolean;
    classpath?: string;
}

export function getPluginConfig(): BallerinaPluginConfig {
    return workspace.getConfiguration("ballerina");
    
}
