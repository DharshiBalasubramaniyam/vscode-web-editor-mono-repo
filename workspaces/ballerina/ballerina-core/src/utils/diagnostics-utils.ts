import { NodePosition } from "@dharshi/syntax-tree";
import { Diagnostic } from "vscode-languageserver-types";

export function getSelectedDiagnostics(
    diagnostics: Diagnostic[],
    targetPosition: NodePosition,
    snippetColumn: number,
    inputLength: number,
    startExtraColumns: number = 0,
    endExtraColumns: number = 0,
    startExtraRows: number = 0,
    endExtraRows: number = 0,
): Diagnostic[] {
    const { startLine, endLine, startColumn } = targetPosition || {};
    const inputStartCol = startColumn + snippetColumn - startExtraColumns - 1;
    const inputEndCol = startColumn + snippetColumn + inputLength + endExtraColumns - 1;
    const inputStartLine = startLine + startExtraRows;
    const inputEndLine = endLine + endExtraRows;

    const filteredDiagnostics = diagnostics.filter((diagnostic) => {
        const isError = diagnostic.severity === 1;
        const { start, end } = diagnostic.range || {};
        const diagnosticStartCol = start?.character;
        const diagnosticEndCol = end?.character;
        const diagnosticStartLine = start?.line;
        const diagnosticEndLine = end?.line;
        return isError && inputStartLine <= diagnosticStartLine && inputEndLine >= diagnosticEndLine && diagnosticEndCol >= inputStartCol && diagnosticStartCol <= inputEndCol;
    });

    return filteredDiagnostics;
}

/** Messages to be ignored when displaying diagnostics in expression editor */
export const IGNORED_DIAGNOSTIC_MESSAGES: string[] = [`invalid token ';'`];

export function getFilteredDiagnostics(diagnostics: Diagnostic[], isCustomStatement: boolean, isStartWithSlash?: boolean) {
    const selectedDiagnostics =  diagnostics
        .filter(diagnostic =>
            !IGNORED_DIAGNOSTIC_MESSAGES.includes(diagnostic.message.toString()) && diagnostic.severity === 1);

    if (selectedDiagnostics.length && isStartWithSlash) {
        if (selectedDiagnostics[0]?.code === "BCE0400") {
            selectedDiagnostics[0].message = "resource path cannot begin with a slash"
        }
    }
    return selectedDiagnostics;
}
