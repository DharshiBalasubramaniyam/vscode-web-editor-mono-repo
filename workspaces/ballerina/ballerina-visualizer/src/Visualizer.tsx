
import React, { useEffect } from "react";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { AIMachineStateValue, MachineStateValue } from "@dharshi/ballerina-core";
import MainPanel from "./MainPanel";
import { LoadingRing } from "./components/Loader";
// import AIPanel from "./views/AIPanel/AIPanel";

const MODES = {
    VISUALIZER: "visualizer",
    AI: "ai",
    RUNTIME_SERVICES: "runtime-services"
};

export function Visualizer({ mode }: { mode: string }) {
    const { rpcClient } = useRpcContext();
    const [state, setState] = React.useState<MachineStateValue>('initialize');
    const [aiState, setAIState] = React.useState<AIMachineStateValue>('Initialize');

    if (mode === MODES.VISUALIZER) {
        rpcClient?.onStateChanged((newState: MachineStateValue) => {
            setState(newState);
        });
    }

    if (mode === MODES.AI) {
        rpcClient?.onAIPanelStateChanged((newState: AIMachineStateValue) => {
            setAIState(newState);
        });
    }

    useEffect(() => {
        if (mode === MODES.VISUALIZER) {
            rpcClient.webviewReady();
        }
    }, []);

    return (
        <>
            {(() => {
                switch (mode) {
                    case MODES.VISUALIZER:
                        return <VisualizerComponent state={state} />
                    case MODES.AI:
                        // return <AIPanel state={aiState} />  
                }
            })()}
        </>
    );
};

const VisualizerComponent = React.memo(({ state }: { state: MachineStateValue }) => {
    switch (true) {
        case typeof state === 'object' && 'viewActive' in state && state.viewActive === "viewReady":
            return <MainPanel />;
        default:
            return <LoadingRing />;
    }
});
