import { Uri, Webview } from "vscode";
import { balExtInstance } from "../extension";

export interface WebViewOptions {
    jsFiles?: string[];
    cssFiles?: string[];
    body: string;
    scripts: string;
    styles: string;
    bodyCss?: string;
}

export function getComposerWebViewOptions(componentName: string, webView: Webview): Partial<WebViewOptions> {
    return {
        cssFiles: getComposerCSSFiles(webView),
        jsFiles: getComposerJSFiles(componentName, webView)
    };
}

function getComposerCSSFiles(webView: Webview): string[] {
    const filePath = Uri.joinPath(balExtInstance.context.extensionUri, 'resources', 'jslibs', 'themes', 'ballerina-default.min.css');
    return [
        webView.asWebviewUri(filePath).path
    ];
}

function getComposerJSFiles(componentName: string, webView: Webview): string[] {
    const filePath = Uri.joinPath(balExtInstance.context.extensionUri, 'resources', 'jslibs').path + "/" + componentName + '.js'; 
    return [
            webView.asWebviewUri(Uri.parse(filePath)).path
    ];
}

function getComposerURI(webView: Webview): string {
    return getVSCodeResourceURI(Uri.joinPath(balExtInstance.context.extensionUri, 'resources',
        'jslibs').path, webView);
}

function getVSCodeResourceURI(filePath: string, webView: Webview): string {
    return webView.asWebviewUri(Uri.parse(filePath)).path;
}

function getWebViewResourceRoot(): string {
    return Uri.joinPath(balExtInstance.context.extensionUri, 'resources').path;
}

export function getLibraryWebViewContent(options: WebViewOptions, webView: Webview, background: string ="#fff", padding: string="0px"): string {
    const {
        jsFiles,
        cssFiles,
        body,
        scripts,
        styles,
        bodyCss
    } = options;
    const externalScripts = jsFiles
        ? jsFiles.map(jsFile =>
            '<script charset="UTF-8" onload="loadedScript();" src="' + jsFile + '"></script>').join('\n')
        : '';
    const externalStyles = cssFiles
        ? cssFiles.map(cssFile =>
            '<link rel="stylesheet" type="text/css" href="' + cssFile + '" />').join('\n')
        : '';
    const fontDir = Uri.joinPath(Uri.parse(getComposerURI(webView)), 'font');

    // in windows fontdir path contains \ as separator. css does not like this.
    // const fontDirWithSeparatorReplaced = fontDir.split(sep).join("/");

    // const isCodeServer = ballerinaExtInstance.getCodeServerContext().codeServerEnv;
    const resourceRoot = getVSCodeResourceURI(getWebViewResourceRoot(), webView);

    const codiconUri = webView.asWebviewUri(Uri.joinPath((balExtInstance.context).extensionUri, "resources", "codicons", "codicon.css")).path;
    const fontsUri = webView.asWebviewUri(Uri.joinPath((balExtInstance.context).extensionUri, "resources", "font-wso2-vscode", "dist", "wso2-vscode.css")).path;

    return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="${codiconUri}">
                <link rel="stylesheet" href="${fontsUri}">
                ${externalStyles}
                <style>
                    /* use this class for loader that are shown until the module js is loaded */
                    @font-face {
                        font-family: "Droid Sans Mono";
                        src: url("${fontDir}/DroidSansMono.ttf") format("truetype");
                        font-weight: normal;
                        font-style: normal;
                        font-stretch: normal;
                    }
                    html {
                        overflow: hidden;
                    }
                    ${styles}
                </style>
            </head>
            
            <body class="${bodyCss}" style="background: ${background}; padding: ${padding};">
                ${body}
                <script>
                    ${scripts}
                </script>
                <script charset="UTF-8" src="${resourceRoot}/jslibs/webviewCommons.js"></script>
                ${externalScripts}
            </body>
            </html>
        `;
}
