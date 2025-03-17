
import { createContext, useContext } from "react";
import { BallerinaRpcClient } from "../BallerinaRpcClient";

export interface VisualizerContext {
    rpcClient: BallerinaRpcClient
}

/**
 * Global visualizer context.
 * This will be used within all the other components
 */
const defaultState: VisualizerContext = {
    rpcClient:  null,
}
export const Context = createContext<VisualizerContext>(defaultState);

export const useRpcContext = () => useContext(Context);
