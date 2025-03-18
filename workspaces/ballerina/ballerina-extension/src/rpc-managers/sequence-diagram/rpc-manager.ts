import { SequenceDiagramAPI, SequenceModelRequest, SequenceModelResponse } from "@dharshi/ballerina-core";
import { Uri } from "vscode";
import { StateMachine } from "../../state-machine";

export class SequenceDiagramRpcManager implements SequenceDiagramAPI {
    async getSequenceModel(): Promise<SequenceModelResponse> {
        return new Promise((resolve) => {
            const context = StateMachine.context();
            if (!context.position) {
                resolve(undefined);
            }
            const params: SequenceModelRequest = {
                filePath: Uri.parse(context.documentUri!).fsPath,
                startLine: {
                    line: context.position.startLine ?? 0,
                    offset: context.position.startColumn ?? 0,
                },
                endLine: {
                    line: context.position.endLine ?? 0,
                    offset: context.position.endColumn ?? 0,
                },
            };
            console.log(">>> requesting sequence model from backend ...", params);
            StateMachine.langClient()
                .getSequenceDiagramModel(params)
                .then((model) => {
                    console.log(">>> sequence model from backend:", model);
                    if (model) {
                        resolve(model);
                    }
                    resolve(undefined);
                })
                .catch((error) => {
                    console.log(">>> ERROR from backend:", error);
                    resolve(undefined);
                });
        });
    }
}
