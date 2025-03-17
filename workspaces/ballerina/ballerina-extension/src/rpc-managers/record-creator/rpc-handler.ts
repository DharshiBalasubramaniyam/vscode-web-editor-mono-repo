import {
    JsonToRecordParams,
    XMLToRecordParams,
    convertJsonToRecord,
    convertJsonToRecordType,
    convertXMLToRecord,
    convertXmlToRecordType
} from "@dharshi/ballerina-core";
import { Messenger } from "vscode-messenger";
import { RecordCreatorRpcManager } from "./rpc-manager";

export function registerRecordCreatorRpcHandlers(messenger: Messenger) {
    const rpcManger = new RecordCreatorRpcManager();
    messenger.onRequest(convertJsonToRecord, (args: JsonToRecordParams) => rpcManger.convertJsonToRecord(args));
    messenger.onRequest(convertXMLToRecord, (args: XMLToRecordParams) => rpcManger.convertXMLToRecord(args));
    messenger.onRequest(convertJsonToRecordType, (args: JsonToRecordParams) => rpcManger.convertJsonToRecordType(args));
    messenger.onRequest(convertXmlToRecordType, (args: XMLToRecordParams) => rpcManger.convertXmlToRecordType(args));
}
