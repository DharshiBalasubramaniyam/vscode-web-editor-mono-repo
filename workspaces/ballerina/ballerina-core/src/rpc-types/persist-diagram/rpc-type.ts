
import { PersistERModel } from "../../interfaces/extended-lang-client";
import { RequestType, NotificationType } from "vscode-messenger-common";

const _preFix = "persist-diagram";
export const getPersistERModel: RequestType<void, PersistERModel> = { method: `${_preFix}/getPersistERModel` };
export const showProblemPanel: NotificationType<void> = { method: `${_preFix}/showProblemPanel` };
