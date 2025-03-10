import {
    JsonToRecord,
    JsonToRecordParams,
    RecordCreatorAPI,
    XMLToRecord,
    XMLToRecordParams,
    TypeDataWithReferences
} from "@dharshi/ballerina-core";
import * as vscode from "vscode";
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
        // const projectUri = StateMachine.context().projectUri;
        // const filePathUri = vscode.Uri.joinPath(vscode.Uri.parse(projectUri), 'types.bal').toString();
        return new Promise(async (resolve) => {
            const response = await StateMachine.langClient().convertJsonToRecordType({
                ...params
            }) as TypeDataWithReferences;
            resolve(response);
        });
    }

    async convertXmlToRecordType(params: XMLToRecordParams): Promise<TypeDataWithReferences> {
        // const projectUri = StateMachine.context().projectUri;
        // const filePath = vscode.Uri.joinPath(vscode.Uri.parse(projectUri), 'types.bal').toString();
        return new Promise(async (resolve) => {
            const response = await StateMachine.langClient().convertXmlToRecordType({
                ...params
            }) as TypeDataWithReferences;
            resolve(response);
        });
    }

}
