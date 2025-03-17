
export enum ConsoleColor {
    RED = "red",
    BLUE = "blue",
    GREEN = "green",
    YELLOW = "yellow",
    ORANGE = "orange",
    PURPLE = "purple",
    PINK = "pink",
    GRAY = "gray",
    AUTO = "auto",
}

export function logger(message: string, color?: ConsoleColor, ...params: any[]) {
    // return; // Comment this line to enable logging

    if (color === ConsoleColor.AUTO) {
        console.log(`>>> ${message}`, ...params);
        return;
    }

    const logStyle = color ? `color: ${color};` : "";
    console.log(`>>> %c${message}`, logStyle, ...params);
}
