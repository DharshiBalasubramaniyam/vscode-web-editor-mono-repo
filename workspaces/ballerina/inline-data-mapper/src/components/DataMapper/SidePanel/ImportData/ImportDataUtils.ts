
export function validateJSON(fileContent: string) {
    JSON.parse(fileContent);
};

export function validateCSV(fileContent: string) {
    const rows = fileContent.trim().split("\n");
    const columnCount = rows[0].split(',').length;
    for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(',');
        if (columns.length !== columnCount) {
            throw new Error();
        }
    }
};

export function validateXML(fileContent: string) {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(fileContent, "application/xml");
    const parserError = parsedDocument.getElementsByTagName("parsererror");
    if (parserError.length > 0) {
        throw new Error();
    }
};
