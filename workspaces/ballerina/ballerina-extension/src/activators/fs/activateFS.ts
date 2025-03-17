import * as vscode from "vscode";
import { balExtInstance, BallerinaExtension, STD_LIB_SCHEME, WEB_IDE_SCHEME } from "../../extension";
import { BalFileSystemProvider } from "./BalFileSystemProvider";

const fsProvider = new BalFileSystemProvider();

export function activateFileSystemProvider() {
    balExtInstance.fsProvider = fsProvider;
    balExtInstance.context.subscriptions.push(
        vscode.workspace.registerFileSystemProvider(WEB_IDE_SCHEME, fsProvider, { isReadonly: false }),
        vscode.workspace.registerFileSystemProvider(STD_LIB_SCHEME, fsProvider, { isReadonly: true })
    );

    // Register the command to open a github repository
    balExtInstance.context.subscriptions.push(vscode.commands.registerCommand('ballerina.openGithubRepository', async () => {
        // const repoUrl = await vscode.window.showInputBox({ placeHolder: 'Enter repository URL' });
        // if (!repoUrl) {
        //     return;
        // }
        const repoUrl = "https://github.com/DharshiBalasubramaniyam/RESTful-API-with-Ballerina";
        const repoInfo = extractGitHubRepoInfo(repoUrl);
        if (!repoInfo) {
            vscode.window.showErrorMessage('Invalid repository URL');
            return;
        }
        vscode.workspace.updateWorkspaceFolders(
            vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0, 0,
            {
                uri: vscode.Uri.parse(`${WEB_IDE_SCHEME}:/${repoInfo.username}/${repoInfo.repo}`),
                name: `${repoInfo.username}/${repoInfo.repo}`
            }
        );
        vscode.window.showInformationMessage('Cloning the repository...');
    }));

    // Delete folder in the fs while removing folder from the workspace
    vscode.workspace.onDidChangeWorkspaceFolders(event => {
        if (event.removed.length > 0) {
            console.log("Removed folders:", event.removed);
            for (const folder of event.removed) {
                if (folder.uri.scheme === WEB_IDE_SCHEME) {
                    fsProvider.delete(folder.uri);
                }
            }
        }
    });

    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (!editor && vscode.window.visibleTextEditors.length === 0) {
            balExtInstance.activeBalFileUri = undefined;
        }
        if (editor && editor.document.languageId === 'ballerina') {
            balExtInstance.activeBalFileUri = editor.document.uri.toString();
        }
        if (editor && editor.document.languageId !== 'ballerina') {
            balExtInstance.activeBalFileUri = undefined;
        }
        console.log("active file changed: ", {editor: editor, uri: balExtInstance.activeBalFileUri});
    });
}

function extractGitHubRepoInfo(url: string): { username: string; repo: string } | null {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?$/);
    return match ? { username: match[1], repo: match[2].replace(".git", "") } : null;
}
