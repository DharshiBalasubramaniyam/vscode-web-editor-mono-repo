
import React from "react";

import { DataMapperView } from "@dharshi/data-mapper-view";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { STModification, HistoryEntry } from "@dharshi/ballerina-core";
import { FunctionDefinition } from "@dharshi/syntax-tree";
import { RecordEditor, StatementEditorComponentProps } from "@dharshi/record-creator";
import { useExperimentalEnabled } from "../../Hooks";
import { LoadingRing } from "../../components/Loader";
import { View } from "@dharshi/ui-toolkit";
import { TopNavigationBar } from "../../components/TopNavigationBar";

interface DataMapperProps {
    filePath: string;
    model: FunctionDefinition;
    isBI: boolean;
    applyModifications: (modifications: STModification[], isRecordModification?: boolean) => Promise<void>;
}

export function DataMapper(props: DataMapperProps) {
    const { filePath, model, isBI, applyModifications } = props;
    const { rpcClient } = useRpcContext();
    const langServerRpcClient = rpcClient.getLangClientRpcClient();
    const libraryBrowserRPCClient = rpcClient.getLibraryBrowserRPCClient();
    const recordCreatorRpcClient = rpcClient.getRecordCreatorRpcClient();

    const { experimentalEnabled, isFetchingExperimentalEnabled } = useExperimentalEnabled();

    const goToFunction = async (entry: HistoryEntry) => {
        rpcClient.getVisualizerRpcClient().addToHistory(entry);
    };

    const applyRecordModifications = async (modifications: STModification[]) => {
        await props.applyModifications(modifications, true);
    };

    const renderRecordPanel = (props: {
        closeAddNewRecord: (createdNewRecord?: string) => void,
        onUpdate: (updated: boolean) => void
    } & StatementEditorComponentProps) => {
        return (
            <RecordEditor
                isDataMapper={true}
                onCancel={props.closeAddNewRecord}
                recordCreatorRpcClient={recordCreatorRpcClient}
                {...props}
                applyModifications={applyRecordModifications}
            />
        );
    };

    if (isFetchingExperimentalEnabled) {
        return <LoadingRing />;
    }

    return (
        <View>
            <TopNavigationBar />
            <DataMapperView
                fnST={model}
                filePath={filePath}
                langServerRpcClient={langServerRpcClient}
                libraryBrowserRpcClient={libraryBrowserRPCClient}
                applyModifications={applyModifications}
                goToFunction={goToFunction}
                renderRecordPanel={renderRecordPanel}
                isBI={isBI}
                experimentalEnabled={experimentalEnabled}
            />
        </View>
    );
};
