import { NodePosition } from "@dharshi/syntax-tree";

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
