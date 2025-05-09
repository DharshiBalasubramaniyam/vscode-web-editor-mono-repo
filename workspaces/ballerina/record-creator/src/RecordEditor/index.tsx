// tslint:disable: jsx-no-multiline-js
import React from "react";

import { RecordTypeDesc, STNode, TypeDefinition } from "@dharshi/syntax-tree";

import { StatementEditorComponentProps } from "../types";
import { RecordCreatorRpcClient } from "@dharshi/ballerina-rpc-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecordEditorWrapper } from "./RecordEditorWrapper";
import { IntlProvider } from "react-intl";
import messages from "../lang/en.json";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 1000,
            gcTime: 1000,
        },
    },
});

export interface RecordEditorCProps {
    model?: RecordTypeDesc | TypeDefinition;
    isDataMapper?: boolean;
    onCancel: (createdNewRecord?: string) => void;
    showHeader?: boolean;
    onUpdate?: (updated: boolean) => void;
}

export interface RecordEditorProps extends RecordEditorCProps, StatementEditorComponentProps {
    recordCreatorRpcClient: RecordCreatorRpcClient;
    fullST?: STNode;
}

export function RecordEditor(props: RecordEditorProps) {
    const {
        model,
        fullST,
        isDataMapper,
        onCancel,
        showHeader,
        targetPosition,
        langServerRpcClient,
        libraryBrowserRpcClient,
        recordCreatorRpcClient,
        currentFile,
        applyModifications,
        onCancelStatementEditor,
        onClose,
        importStatements,
        currentReferences,
        onUpdate
    } = props;

    return (
        <QueryClientProvider client={queryClient}>
            <IntlProvider locale="en" defaultLocale="en" messages={messages}>
                <RecordEditorWrapper
                    model={model}
                    fullST={fullST}
                    isDataMapper={isDataMapper}
                    onCancel={onCancel}
                    showHeader={showHeader}
                    targetPosition={targetPosition}
                    langServerRpcClient={langServerRpcClient}
                    libraryBrowserRpcClient={libraryBrowserRpcClient}
                    recordCreatorRpcClient={recordCreatorRpcClient}
                    currentFile={currentFile}
                    applyModifications={applyModifications}
                    onCancelStatementEditor={onCancelStatementEditor}
                    onClose={onClose}
                    importStatements={importStatements}
                    currentReferences={currentReferences}
                    onUpdate={onUpdate}
                />
            </IntlProvider>
        </QueryClientProvider>
    );
}
