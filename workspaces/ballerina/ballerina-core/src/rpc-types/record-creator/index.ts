
import { JsonToRecord, JsonToRecordParams, XMLToRecord, XMLToRecordParams } from "../../interfaces/extended-lang-client";

export interface RecordCreatorAPI {
    convertJsonToRecord: (params: JsonToRecordParams) => Promise<JsonToRecord>;
    convertXMLToRecord: (params: XMLToRecordParams) => Promise<XMLToRecord>;
}
