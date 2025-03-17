
import React, { useMemo, useState } from "react";
import {
    Button,
    SidePanel,
    SidePanelTitleContainer,
    SidePanelBody,
    Codicon
} from "@dharshi/ui-toolkit";
import { useRpcContext } from '@dharshi/ballerina-rpc-client';

import { useDMIOConfigPanelStore } from "../../../../store/store";
import { ImportDataButtons } from "./ImportDataButtons";
import { ImportDataPanel } from "./ImportDataPanel";

export interface ImportType {
    type: string;
    label: string;
}

export enum FileExtension {
    JSON = ".json",
    XML = ".xml",
    CSV = ".csv"
}

export type ImportDataWizardProps = {
    configName: string;
    documentUri: string;
};

export function ImportDataForm(props: ImportDataWizardProps) {
    const { configName, documentUri } = props;
    const { rpcClient } = useRpcContext();

    const [selectedImportType, setSelectedImportType] = useState<ImportType>(undefined);

    const { isOpen, ioType, overwriteSchema, setSidePanelOpen } = useDMIOConfigPanelStore(state => ({
        isOpen: state.isIOConfigPanelOpen,
        ioType: state.ioConfigPanelType,
        overwriteSchema: state.isSchemaOverridden,
        setSidePanelOpen: state.setIsIOConfigPanelOpen
    }));

    const fileExtension = useMemo(() => {
        if (!selectedImportType) return undefined;

        switch (selectedImportType.type) {
            case 'JSON':
                return FileExtension.JSON;
            case 'CSV':
                return FileExtension.CSV;
            case 'XML':
                return FileExtension.XML;
            case 'JSONSCHEMA':
                return FileExtension.JSON;
        }
    }, [selectedImportType]);


    const loadSchema = async (content: string) => {
        const request = {
            documentUri: documentUri,
            overwriteSchema: overwriteSchema,
            resourceName: configName + '_' + ioType.toLowerCase() + 'Schema',
            content: content,
            ioType: ioType.toUpperCase(),
            schemaType: selectedImportType.type.toLowerCase(),
            configName: configName,
        }
        // await rpcClient.getMiDataMapperRpcClient().browseSchema(request).then(response => {
        //     setSidePanelOpen(false);
        //     if (response.success) {
        //         console.log("Schema imported successfully");
        //     } else {
        //         console.error("Error while importing schema");
        //     }
        // }).catch(e => {
        //     console.error("Error while importing schema", e);
        // });
    };

    const handleFileUpload = (text: string) => {
        loadSchema(text);
    };

    const onClose = () => {
        setSelectedImportType(undefined);
        setSidePanelOpen(false);
    };

    const handleImportTypeChange = (importType: ImportType) => {
        setSelectedImportType(importType);
    };

    return (
        <SidePanel
            isOpen={isOpen}
            alignment="right"
            width={312}
            overlay={false}
        >
            <SidePanelTitleContainer>
                {selectedImportType && (
                    <Codicon name="arrow-left"
                        sx={{ width: "20px"}}
                        onClick={() => setSelectedImportType(undefined)}
                    />
                )}
                <span>{`${overwriteSchema ? "Change" : "Import"} ${ioType} Schema`}</span>
                <Button
                    sx={{ marginLeft: "auto" }}
                    onClick={onClose}
                    appearance="icon"
                >
                    <Codicon name="close" />
                </Button>
            </SidePanelTitleContainer>
            <SidePanelBody>
                {!selectedImportType && <ImportDataButtons onImportTypeChange={handleImportTypeChange} />}
                {selectedImportType && (
                    <ImportDataPanel
                        importType={selectedImportType}
                        extension={fileExtension}
                        rowRange={{ start: 15, offset: 10 }}
                        onSave={handleFileUpload}
                    />
                )}
            </SidePanelBody>
        </SidePanel>
    );
}
