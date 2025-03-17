import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionDefinition } from "@dharshi/syntax-tree";
import { HistoryEntry, STModification } from "@dharshi/ballerina-core";
import { DataMapper } from "./components/DataMapper/DataMapper";
import { LangClientRpcClient } from "@dharshi/ballerina-rpc-client";
import { LibraryBrowserRpcClient } from "@dharshi/ballerina-rpc-client/lib/rpc-clients/library-browser/rpc-client";
import { StatementEditorComponentProps } from "@dharshi/record-creator";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 1000,
            cacheTime: 1000,
        },
    },
});

export interface DataMapperViewProps {
    fnST: FunctionDefinition;
    filePath: string;
    langServerRpcClient: LangClientRpcClient;
    libraryBrowserRpcClient?: LibraryBrowserRpcClient;
    applyModifications: (modifications: STModification[], isRecordModification?: boolean) => Promise<void>;
    goToFunction?: (componentInfo: HistoryEntry) => Promise<void>;
    onClose?: () => void;
    renderRecordPanel?: (props: {
        closeAddNewRecord: (createdNewRecord?: string) => void,
        onUpdate: (update: boolean) => void
    } & StatementEditorComponentProps) => React.ReactElement;
    isBI?: boolean;
    experimentalEnabled?: boolean;
}

export function DataMapperView(props: DataMapperViewProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <DataMapper {...props}/>
        </QueryClientProvider>
    );
}
