
import { ICPEnabledResponse, ICPEnabledRequest } from "../../interfaces/extended-lang-client";

export interface ICPServiceAPI {
    addICP: (params: ICPEnabledRequest) => Promise<ICPEnabledResponse>;
    isIcpEnabled: (params: ICPEnabledRequest) => Promise<ICPEnabledResponse>;
    disableICP: (params: ICPEnabledRequest) => Promise<ICPEnabledResponse>;
}
