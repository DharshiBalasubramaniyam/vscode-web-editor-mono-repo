
import { ICPEnabledResponse, ICPEnabledRequest } from "../../interfaces/extended-lang-client";
import { RequestType } from "vscode-messenger-common";

const _preFix = "icp-service";
export const addICP: RequestType<ICPEnabledRequest, ICPEnabledResponse> =
    { method: `${_preFix}/addICP` };
export const isIcpEnabled: RequestType<ICPEnabledRequest, ICPEnabledResponse> =
    { method: `${_preFix}/isIcpEnabled` };
export const disableICP: RequestType<ICPEnabledRequest, ICPEnabledResponse> =
    { method: `${_preFix}/disableICP` };
