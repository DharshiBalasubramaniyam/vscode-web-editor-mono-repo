
// This function allows us to format strings by adding indentation as tabs to the lines
export function formatJSONLikeString(input: string): string {
    const lines = input.split('\n');
    let indentLevel = 0;
    const formattedLines = lines.map((line) => {
        line = line.trim();
        if (line.endsWith('{')) {
            const formatted = '\t'.repeat(indentLevel) + line;
            indentLevel++;
            return formatted;
        } else if (line.startsWith('}')) {
            indentLevel = Math.max(0, indentLevel - 1);
            return '\t'.repeat(indentLevel) + line;
        } else {
            return '\t'.repeat(indentLevel) + line;
        }
    });
    return formattedLines.join('\n');
}
