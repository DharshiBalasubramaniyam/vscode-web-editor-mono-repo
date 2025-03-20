import {
    SyntaxTreeResponse,
    CompletionParams,
    LinePosition,
    DiagnosticData,
    ExpressionRange,
    addToTargetPosition,
    ResolvedTypeForExpression
} from "@dharshi/ballerina-core";
import { NodePosition } from "@dharshi/syntax-tree";
import { CodeAction, CompletionItemKind, Diagnostic, WorkspaceEdit } from "vscode-languageserver-types";
import { URI } from "vscode-uri";

import { CompletionResponseWithModule } from "../../DataMapper/ConfigPanel/TypeBrowser";
import { EXPR_SCHEME, FILE_SCHEME } from "../../DataMapper/ConfigPanel/utils";
import { LangClientRpcClient } from "@dharshi/ballerina-rpc-client";

export async function getDiagnostics(docUri: string, langServerRpcClient: LangClientRpcClient): Promise<DiagnosticData[]> {
    const diagnostics = await langServerRpcClient.getDiagnostics({
        documentIdentifier: {
            uri: docUri,
        }
    });

    return diagnostics.diagnostics;
}

export const handleDiagnostics = async (fileURI: string, langServerRpcClient: LangClientRpcClient):
    Promise<Diagnostic[]> => {
    const diagResp = await getDiagnostics(URI.parse(fileURI).toString(), langServerRpcClient);
    const diag = diagResp[0]?.diagnostics ? diagResp[0].diagnostics : [];
    return diag;
}

export const filterDiagnostics = (diagnostics: Diagnostic[], nodePosition: NodePosition): Diagnostic[] => {
    return diagnostics.filter((diagnostic) => {
        const diagPosition: NodePosition = {
            startLine: diagnostic.range.start.line,
            startColumn: diagnostic.range.start.character,
            endLine: diagnostic.range.end.line,
            endColumn: diagnostic.range.end.character
        };
        return isDiagInRange(nodePosition, diagPosition);
    })
}

export function isDiagInRange(nodePosition: NodePosition, diagPosition: NodePosition): boolean {
    return diagPosition?.startLine >= nodePosition?.startLine &&
        (diagPosition?.startLine === nodePosition?.startLine ? diagPosition?.startColumn >= nodePosition?.startColumn : true) &&
        diagPosition?.endLine <= nodePosition?.endLine &&
        (diagPosition?.endLine === nodePosition?.endLine ? diagPosition?.endColumn <= nodePosition?.endColumn : true);
}


export async function getCodeAction(filePath: string, diagnostic: Diagnostic, langServerRpcClient: LangClientRpcClient): Promise<CodeAction[]> {
    const codeAction = await langServerRpcClient.codeAction({
        context: {
            diagnostics: [{
                code: diagnostic.code,
                message: diagnostic.message,
                range: {
                    end: {
                        line: diagnostic.range.end.line,
                        character: diagnostic.range.end.character
                    },
                    start: {
                        line: diagnostic.range.start.line,
                        character: diagnostic.range.start.character
                    }
                },
                severity: 1
            }],
            only: ["quickfix"]
        },
        range: {
            end: {
                line: diagnostic.range.end.line,
                character: diagnostic.range.end.character
            },
            start: {
                line: diagnostic.range.start.line,
                character: diagnostic.range.start.character
            }
        },
        textDocument: {
            uri: filePath
        }
    });

    return codeAction.codeActions;
}

export async function getRenameEdits(fileURI: string,
    newName: string,
    position: NodePosition,
    langServerRpcClient: LangClientRpcClient): Promise<WorkspaceEdit> {

    const renameEdits = await langServerRpcClient.rename({
        textDocument: { uri: URI.parse(fileURI).toString() },
        position: {
            line: position.startLine,
            character: position?.startColumn
        },
        newName
    });
    return renameEdits.workspaceEdit;
}

export const handleCodeActions = async (fileURI: string,
    diagnostics: Diagnostic[],
    langServerRpcClient: LangClientRpcClient): Promise<CodeAction[]> => {
    let codeActions: CodeAction[] = []

    for (const diagnostic of diagnostics) {
        const codeAction = await getCodeAction(URI.parse(fileURI).toString(), diagnostic, langServerRpcClient)
        codeActions = [...codeActions, ...codeAction]
    }
    return codeActions;
}

export async function getRecordCompletions(
    currentFileContent: string,
    importStatements: string[],
    fnSTPosition: NodePosition,
    path: string,
    langServerRpcClient: LangClientRpcClient): Promise<CompletionResponseWithModule[]> {

    const typeLabelsToIgnore = ["StrandData"];
    const completionMap = new Map<string, CompletionResponseWithModule>();
    const fileUri = URI.parse(path).toString();

    const completionParams: CompletionParams = {
        textDocument: { uri: fileUri },
        position: { character: 0, line: 0 },
        context: { triggerKind: 22 },
    };

    const completions = (await langServerRpcClient.getCompletion(completionParams)).completions;
    const recCompletions = completions.filter((item) => item.kind === CompletionItemKind.Struct);
    recCompletions.forEach((item) => completionMap.set(item.insertText, item));

    if (importStatements.length > 0) {

        for (const importStr of importStatements) {
            const moduleName = importStr.split("/").pop().split(".").pop().replace(";", "");
            const updatedContent = addToTargetPosition(
                currentFileContent,
                {
                    startLine: fnSTPosition.endLine,
                    startColumn: fnSTPosition.endColumn,
                    endLine: fnSTPosition.endLine,
                    endColumn: fnSTPosition.endColumn,
                },
                `${moduleName}:`
            );

            langServerRpcClient.didChange({
                textDocument: { uri: fileUri, version: 1 },
                contentChanges: [{ text: updatedContent }],
            });

            const importCompletions = await langServerRpcClient.getCompletion({
                textDocument: { uri: fileUri },
                position: { character: fnSTPosition.endColumn + moduleName.length + 1, line: fnSTPosition.endLine },
                context: { triggerKind: 22 },
            });

            const importRecCompletions = importCompletions.completions.filter((item) => item.kind === CompletionItemKind.Struct);

            importRecCompletions.forEach((item) => {
                if (!completionMap.has(`${item.insertText}${moduleName}`)) {
                    completionMap.set(`${item.insertText}${moduleName}`, { ...item, module: moduleName });
                }
            });
        }
        langServerRpcClient.didChange({
            textDocument: { uri: fileUri, version: 1 },
            contentChanges: [{ text: currentFileContent }],
        });
    }

    const allCompletions = Array.from(completionMap.values()).filter(
        (item) => !(typeLabelsToIgnore.includes(item.label) || item.label.startsWith("("))
    );

    return allCompletions;
}

export async function getTypesForExpressions(fileURI: string,
                                             expressionNodesRanges: ExpressionRange[],
                                             langServerRpcClient: LangClientRpcClient)
    : Promise<ResolvedTypeForExpression[]> {
    const typesFromExpression = await langServerRpcClient.getTypeFromExpression({
        documentIdentifier: {
            uri: URI.parse(fileURI).toString()
        },
        expressionRanges: expressionNodesRanges
    });

    return typesFromExpression.types;
}

export async function getDefinitionPosition(fileURI: string,
    position: LinePosition,
    langServerRpcClient: LangClientRpcClient): Promise<SyntaxTreeResponse> {

    const definitionPosition = await langServerRpcClient.getDefinitionPosition(
        {
            textDocument: {
                uri: URI.parse(fileURI).toString()
            },
            position: {
                line: position.line,
                character: position.offset
            }
        }
    )

    return definitionPosition;
}
