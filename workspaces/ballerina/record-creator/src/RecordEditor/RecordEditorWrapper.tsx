// tslint:disable: jsx-no-multiline-js
import React, { useMemo } from "react";
import { Context } from "../Context";
import { useBallerinaProjectComponent, useBallerinaVersion, useFullST } from "../Hooks";
import { RecordEditorC } from "./RecordEditorC";
import { RecordEditorProps } from ".";

export function RecordEditorWrapper(props: RecordEditorProps) {
    const {
        model,
        fullST: fullSyntaxTree,
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
        onUpdate,
    } = props;
    const { ballerinaVersion, isFetching: isFetchingBallerinaVersion } = useBallerinaVersion(langServerRpcClient);
    const { fullST, isFetching: isFetchingFullST } = useFullST(currentFile.path, langServerRpcClient);
    const { ballerinaProjectComponents, isFetching: isFetchingBallerinaProjectComponents } =
        useBallerinaProjectComponent(currentFile.path, langServerRpcClient);

    const contextValue = useMemo(() => {
        if (isFetchingBallerinaVersion || isFetchingFullST || isFetchingBallerinaProjectComponents) {
            return undefined;
        }

        return {
            props: {
                targetPosition,
                langServerRpcClient,
                libraryBrowserRpcClient,
                recordCreatorRpcClient,
                currentFile,
                importStatements,
                currentReferences,
                ballerinaVersion,
                fullST : fullSyntaxTree || fullST.syntaxTree,
                ballerinaProjectComponents,
            },
            api: {
                applyModifications,
                onCancelStatementEditor,
                onClose,
            },
        };
    }, [isFetchingBallerinaVersion, isFetchingFullST, isFetchingBallerinaProjectComponents, fullSyntaxTree]);

    return (
        <Context.Provider value={contextValue}>
            {contextValue && (
                <RecordEditorC
                    model={model}
                    isDataMapper={isDataMapper}
                    onCancel={onCancel}
                    showHeader={showHeader}
                    onUpdate={onUpdate}
                />
            )}
        </Context.Provider>
    );
}
