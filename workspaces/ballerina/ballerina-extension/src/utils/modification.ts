import { SyntaxTreeResponse, InsertorDelete, NOT_SUPPORTED_TYPE, STModification } from "@dharshi/ballerina-core";
// import { normalize } from "path";
import { Position, Range, Uri, WorkspaceEdit, workspace } from "vscode";
// import { URI } from "vscode-uri";
// import { writeFileSync } from "fs";
import { StateMachine, updateView } from "../state-machine";
import { balExtInstance } from "../extension";

interface UpdateFileContentRequest {
    filePath: string;
    content: string;
    skipForceSave?: boolean;
}

export async function applyModifications(fileName: string, modifications: STModification[]): Promise<SyntaxTreeResponse | NOT_SUPPORTED_TYPE> {
    const ast = await InsertorDelete(modifications);
    return await StateMachine.langClient().stModify({
        documentIdentifier: { uri: Uri.file(fileName).toString() },
        astModifications: ast
    });
}

export async function modifyFileContent(params: UpdateFileContentRequest): Promise<boolean> {
    const { filePath, content, skipForceSave } = params;
    console.log("modifyFileContent final: ", filePath);

    const encoder = new TextEncoder();

    try {
        balExtInstance.fsProvider.writeFile(Uri.parse(filePath), encoder.encode(content), {create: true, overwrite: true});
        StateMachine.langClient().didChange({
            contentChanges: [
                {
                    text: content
                }
            ],
            textDocument: {
                uri: Uri.parse(filePath).toString(),
                version: 1
            }
        });
        updateView();
        return true;
    } catch (error) {
        return false;
    }

    // const normalizedFilePath = normalize(filePath);
    // const doc = workspace.textDocuments.find((doc) => normalize(doc.fileName) === normalizedFilePath);

    // if (doc) {
    //     const edit = new WorkspaceEdit();
    //     edit.replace(URI.file(normalizedFilePath), new Range(new Position(0, 0), doc.lineAt(doc.lineCount - 1).range.end), content);
    //     await workspace.applyEdit(edit);
    //     StateMachine.langClient().updateStatusBar();
    //     if (skipForceSave) {
    //         // Skip saving document and keep in dirty mode
    //         return true;
    //     }
    //     return doc.save();
    // } else {
    //     console.log("doc is not valid....")
    //     // StateMachine.langClient().didChange({
    //     //     contentChanges: [
    //     //         {
    //     //             text: content
    //     //         }
    //     //     ],
    //     //     textDocument: {
    //     //         uri: URI.file(normalizedFilePath).toString(),
    //     //         version: 1
    //     //     }
    //     // });
    //     // writeFileSync(normalizedFilePath, content);
    //     // StateMachine.langClient().updateStatusBar();
    //     // updateView();
    // }

    // return false;
}

// export async function writeBallerinaFileDidOpen(filePath: string, content: string) {
//     writeFileSync(filePath, content.trim());
//     StateMachine.langClient().didChange({
//         textDocument: { uri: filePath, version: 1 },
//         contentChanges: [
//             {
//                 text: content,
//             },
//         ],
//     });
//     StateMachine.langClient().didOpen({
//         textDocument: {
//             uri: Uri.file(filePath).toString(),
//             languageId: 'ballerina',
//             version: 1,
//             text: content.trim()
//         }
//     });
// }
