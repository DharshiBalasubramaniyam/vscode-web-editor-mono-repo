
import {
    JsonToRecord,
    JsonToRecordParams,
    RecordCreatorAPI,
    XMLToRecord,
    XMLToRecordParams,
    convertJsonToRecord,
    convertXMLToRecord,
    convertJsonToRecordType,
    convertXmlToRecordType,
    TypeDataWithReferences
} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class RecordCreatorRpcClient implements RecordCreatorAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }

    convertJsonToRecord(params: JsonToRecordParams): Promise<JsonToRecord> {
        return this._messenger.sendRequest(convertJsonToRecord, HOST_EXTENSION, params);
    }

    convertXMLToRecord(params: XMLToRecordParams): Promise<XMLToRecord> {
        return this._messenger.sendRequest(convertXMLToRecord, HOST_EXTENSION, params);
    }

    convertJsonToRecordType(params: JsonToRecordParams): Promise<TypeDataWithReferences> {
        return this._messenger.sendRequest(convertJsonToRecordType, HOST_EXTENSION, params);
    }

    convertXmlToRecordType(params: XMLToRecordParams): Promise<TypeDataWithReferences> {
        return this._messenger.sendRequest(convertXmlToRecordType, HOST_EXTENSION, params);
    }
}
