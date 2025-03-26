import { MACHINE_VIEW } from "@dharshi/ballerina-core";
import { commands } from "vscode";

export function setGoToSourceContext(view: MACHINE_VIEW) {
    console.log("setting go to source: ", view);
    switch (view) {
        case MACHINE_VIEW.Overview:
        case MACHINE_VIEW.FunctionForm:
        case MACHINE_VIEW.AddConnectionWizard:
        case MACHINE_VIEW.ViewConfigVariables:
        case MACHINE_VIEW.ServiceWizard:
        case MACHINE_VIEW.TypeDiagram:
            commands.executeCommand('setContext', 'showGoToSource', false);
            break;
        default:
            commands.executeCommand('setContext', 'showGoToSource', true);
    }

}
