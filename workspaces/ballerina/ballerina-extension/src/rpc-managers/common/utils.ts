import { NodePosition } from "@dharshi/syntax-tree";
import { Position, Range, Uri, window, workspace, WorkspaceEdit } from "vscode";
import { TextEdit } from "@dharshi/ballerina-core";

export function getUpdatedSource(
    statement: string,
    currentFileContent: string,
    targetPosition: NodePosition,
    skipSemiColon?: boolean,
): string {
    const updatedStatement = skipSemiColon ? statement : statement.trim().endsWith(";") ? statement : statement + ";";
    const updatedContent: string = addToTargetPosition(currentFileContent, targetPosition, updatedStatement,);
    return updatedContent;
}

export function addToTargetPosition(currentContent: string, position: NodePosition, codeSnippet: string): string {

    const splitContent: string[] = currentContent.split(/\n/g) || [];
    const splitCodeSnippet: string[] = codeSnippet.trimEnd().split(/\n/g) || [];
    const noOfLines: number = position.endLine - position.startLine + 1;
    const startLine = splitContent[position.startLine].slice(0, position.startColumn);
    const endLine = isFinite(position?.endLine) ?
        splitContent[position.endLine].slice(position.endColumn || position.startColumn) : '';

    const replacements = splitCodeSnippet.map((line, index) => {
        let modifiedLine = line;
        if (index === 0) {
            modifiedLine = startLine + modifiedLine;
        }
        if (index === splitCodeSnippet.length - 1) {
            modifiedLine = modifiedLine + endLine;
        }
        if (index > 0) {
            modifiedLine = " ".repeat(position.startColumn) + modifiedLine;
        }
        return modifiedLine;
    });

    splitContent.splice(position.startLine, noOfLines, ...replacements);

    return splitContent.join('\n');
}

export async function askProjectPath() {
    return await window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        title: "Select a folder"
    });
}

export async function askFilePath() {
    return await window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        filters: {
            'Files': ['yaml', 'json']
        },
        title: "Select a file",
    });
}

export async function applyBallerinaTomlEdit(tomlPath: Uri, textEdit: TextEdit) {
    const workspaceEdit = new WorkspaceEdit();

    const range = new Range(new Position(textEdit.range.start.line, textEdit.range.start.character),
        new Position(textEdit.range.end.line, textEdit.range.end.character));

    // Create the position and range
    workspaceEdit.replace(tomlPath, range, textEdit.newText);

    // Apply the edit
    workspace.applyEdit(workspaceEdit).then(success => {
        if (success) {
        } else {
        }
    });
}
