import { languages } from "vscode";
import { BallerinaExtension, LANGUAGE, WEB_IDE_SCHEME } from "../../extension";
import { ExecutorCodeLensProvider } from "./code-lens-provider";

export function activateEditorSupport(ballerinaExtInstance: BallerinaExtension) {
    if (!ballerinaExtInstance.context || !ballerinaExtInstance.langClient) {
        return;
    }

    // Register code lens provider
    languages.registerCodeLensProvider(
        [
            { language: LANGUAGE.BALLERINA, scheme: WEB_IDE_SCHEME }
        ],
        new ExecutorCodeLensProvider(ballerinaExtInstance)
    );
}
