import React, { useEffect } from "react";
import { PersistERModel, VisualizerLocation } from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { PersistDiagram as PersistDiagramComponent} from "@dharshi/persist-layer-diagram";

export function ERDiagram() {
    const { rpcClient } = useRpcContext();
    const persistDiagramRPCClient = rpcClient.getPersistDiagramRpcClient();
    const [visualizerLocation, setVisualizerLocation] = React.useState<VisualizerLocation>();

    useEffect(() => {
        if (rpcClient) {
            rpcClient.getVisualizerLocation().then((value) => {
                setVisualizerLocation(value);
            });
        }
    }, [rpcClient]);


    const getPersistModel = async () => {
        if (!rpcClient) {
            return;
        }
        const response: PersistERModel = await persistDiagramRPCClient.getPersistERModel();
        return response;
    };

    const showProblemPanel = async () => {
        if (!rpcClient) {
            return;
        }
        await persistDiagramRPCClient.showProblemPanel();
    }

    return (
        <PersistDiagramComponent
            getPersistModel={getPersistModel} 
            selectedRecordName={visualizerLocation?.identifier} 
            showProblemPanel={showProblemPanel} 
        />
    )

}
