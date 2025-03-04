
import { SequenceModelResponse } from "../../interfaces/extended-lang-client";
import { RequestType } from "vscode-messenger-common";

const _preFix = "sequence-diagram";
export const getSequenceModel: RequestType<void, SequenceModelResponse> = { method: `${_preFix}/getSequenceModel` };
