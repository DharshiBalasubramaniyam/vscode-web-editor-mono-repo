
import React from "react";

/** @jsx jsx */
import type {} from "@emotion/styled";
import type {} from "@projectstorm/react-diagrams-core";
import type {} from "@projectstorm/react-diagrams";
import { css, Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IDMModel, Mapping } from "@dharshi/ballerina-core";
import { ErrorBoundary } from "@dharshi/ui-toolkit";

import { InlineDataMapper } from "./components/DataMapper/DataMapper";

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

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

export interface DataMapperViewProps {
    model: IDMModel;
    applyModifications: (mappings: Mapping[]) => Promise<void>;
    addArrayElement: (targetField: string) => Promise<void>;
    onClose: () => void;
}

export function DataMapperView(props: DataMapperViewProps) {
    return (
        <ErrorBoundary errorMsg="An error occurred while redering the Inline Data Mapper">
            <QueryClientProvider client={queryClient}>
                <Global styles={globalStyles} />
                <InlineDataMapper {...props}/>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}
