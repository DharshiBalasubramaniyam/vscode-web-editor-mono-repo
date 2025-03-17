
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { Visualizer } from "./Visualizer";
import { VisualizerContextProvider, RpcContextProvider } from "./Context";
// import { clearDiagramZoomAndPosition } from "./utils/bi";

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

export function renderWebview(mode: string, target: HTMLElement) {
    // clear diagram memory
    // clearDiagramZoomAndPosition();

    const root = createRoot(target);
    root.render(
        <VisualizerContextProvider>
            <RpcContextProvider>
                <QueryClientProvider client={queryClient}>
                    <Visualizer mode={mode} />
                </QueryClientProvider>
            </RpcContextProvider>
        </VisualizerContextProvider>
    );
}
