
import { JsonToRecord, JsonToRecordParams, XMLToRecord, XMLToRecordParams, TypeDataWithReferences } from "../../interfaces/extended-lang-client";
import { RequestType } from "vscode-messenger-common";

const _preFix = "record-creator";
export const convertJsonToRecord: RequestType<JsonToRecordParams, JsonToRecord> = { method: `${_preFix}/convertJsonToRecord` };
export const convertXMLToRecord: RequestType<XMLToRecordParams, XMLToRecord> = { method: `${_preFix}/convertXMLToRecord` };
export const convertJsonToRecordType: RequestType<JsonToRecordParams, TypeDataWithReferences> = { method: `${_preFix}/convertJsonToRecordType` };
export const convertXmlToRecordType: RequestType<XMLToRecordParams, TypeDataWithReferences> = { method: `${_preFix}/convertXmlToRecordType` };
