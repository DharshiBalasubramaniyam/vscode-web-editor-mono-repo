
import { SequenceModelResponse } from "../../interfaces/extended-lang-client";

export interface SequenceDiagramAPI {
    getSequenceModel: () => Promise<SequenceModelResponse>;
}
