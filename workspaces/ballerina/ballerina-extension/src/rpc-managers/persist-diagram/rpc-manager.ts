import {
    PersistERModel,
    PersistDiagramAPI,
} from "@dharshi/ballerina-core";
import { commands } from "vscode";
import { StateMachine } from "../../state-machine";

export class PersistDiagramRpcManager implements PersistDiagramAPI {

    async getPersistERModel(): Promise<PersistERModel> {
        return new Promise(async (resolve) => {
            const currentDoc = StateMachine.context().documentUri;
            const res = await StateMachine.langClient().getPersistERModel({ documentUri: currentDoc});
            resolve(res);
        });
    }

    async showProblemPanel(): Promise<void> {
        return await commands.executeCommand('workbench.action.problems.focus');
    }
}
