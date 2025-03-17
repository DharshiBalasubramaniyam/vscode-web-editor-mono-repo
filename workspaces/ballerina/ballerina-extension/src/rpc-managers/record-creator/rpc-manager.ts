import {
    JsonToRecord,
    JsonToRecordParams,
    RecordCreatorAPI,
    XMLToRecord,
    XMLToRecordParams,
    TypeDataWithReferences
} from "@dharshi/ballerina-core";
import {Uri} from "vscode";
import { StateMachine } from "../../state-machine";

export class RecordCreatorRpcManager implements RecordCreatorAPI {
    async convertJsonToRecord(params: JsonToRecordParams): Promise<JsonToRecord> {
        return new Promise(async (resolve) => {
            const response = await StateMachine.langClient().convertJsonToRecord(params) as JsonToRecord;
            resolve(response);
        });
    }

    async convertXMLToRecord(params: XMLToRecordParams): Promise<XMLToRecord> {
        return new Promise(async (resolve) => {
            const response = await StateMachine.langClient().convertXMLToRecord(params) as XMLToRecord;
            resolve(response);
        });
    }

    async convertJsonToRecordType(params: JsonToRecordParams): Promise<TypeDataWithReferences> {
        if (StateMachine.context().isBI) {
            const projectDir = Uri.parse(StateMachine.context().projectUri);
            const targetFile = Uri.joinPath(projectDir, `types.bal`).toString();
            params.filePathUri = targetFile;
        } else {
            params.filePathUri = StateMachine.context().documentUri;
        }
        return new Promise(async (resolve) => {
            const response = await StateMachine.langClient().convertJsonToRecordType({
                ...params
            }) as TypeDataWithReferences;
            resolve(response);
        });
    }

    async convertXmlToRecordType(params: XMLToRecordParams): Promise<TypeDataWithReferences> {
        if (StateMachine.context().isBI) {
            const projectDir = Uri.parse(StateMachine.context().projectUri);
            const targetFile = Uri.joinPath(projectDir, `types.bal`).toString();
            params.filePath = targetFile;
        } else {
            params.filePath = StateMachine.context().documentUri;
        }
        return new Promise(async (resolve) => {
            const response = await StateMachine.langClient().convertXmlToRecordType({
                ...params
            }) as TypeDataWithReferences;
            resolve(response);
        });
    }

}
