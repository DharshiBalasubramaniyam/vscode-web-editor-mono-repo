/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRpcContext } from "@dharshi/ballerina-rpc-client"

import { ComponentListView } from './ComponentListView';
import { TitleBar } from './components/TitleBar';
import { WorkspacesFileResponse, VisualizerLocation } from '@dharshi/ballerina-core';
import { URI } from 'vscode-uri';
// Create a interface for the data
interface Data {
    packages: Package[];
}
// Create a interface for the package
interface Package {
    name: string;
    filePath: string;
    modules: Module[];
}
// Create a interface for the module
interface Module {
    functions: any[];
    services: any[];
    records: any[];
    objects: any[];
    classes: any[];
    types: any[];
    constants: any[];
    enums: any[];
    listeners: any[];
    moduleVariables: any[];
}

export const SELECT_ALL_FILES = 'All';

export function Overview(props: { visualizerLocation: VisualizerLocation }) {
    const { syntaxTree } = props.visualizerLocation;
    const [components, setComponents] = useState<Data>();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [workspaceInfo, setWorkspaceInfo] = useState<WorkspacesFileResponse>();
    const [selectedFile, setSelectedFile] = useState<string>(SELECT_ALL_FILES);
    const { rpcClient } = useRpcContext();

    const [isPanelOpen, setPanelOpen] = useState(false);

    const openPanel = () => {
        setPanelOpen(!isPanelOpen);
    };

    const handleSearch = (value: string) => {
        setQuery(value);
    };

    const handleFileChange = async (value: string) => {
        setSelectedFile(value);
        console.log("value: ", value);
        const componentResponse = (value === SELECT_ALL_FILES) ?
            await rpcClient.getLangClientRpcClient().getBallerinaProjectComponents(undefined) :
            await rpcClient.getLangClientRpcClient().getBallerinaProjectComponents({
                documentIdentifiers: [{ uri: URI.parse(value).toString() }]
            });
        setComponents(componentResponse as Data);
        console.log("componentResponse: ", componentResponse);
        console.log("selectedFile: ", selectedFile);
        console.log("workspaceInfo.workspaceRoot: ", workspaceInfo.workspaceRoot)
    };

    const fetchData = async () => {
        try {
            const workspaceResponse = await rpcClient.getCommonRpcClient().getWorkspaceFiles({});
            setWorkspaceInfo(workspaceResponse);
            const componentResponse = await rpcClient.getLangClientRpcClient().getBallerinaProjectComponents(undefined);
            setComponents(componentResponse as Data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [syntaxTree]);

    if (loading) {
        // Render a loading indicator
        return <div>Loading...</div>;
    }

    // Filter the components based on the search query
    const filteredComponents = components?.packages.map((pkg) => {
        const modules = pkg.modules.map((module) => {
            const services = module.services.filter((service) => {
                if (selectedFile === SELECT_ALL_FILES || service.filePath === selectedFile.replace(workspaceInfo?.workspaceRoot, '').substring(1)) {
                    return service.name.toLowerCase().includes(query.toLowerCase());
                }
            });
            const types = module.types.filter((type) => {
                if (selectedFile === SELECT_ALL_FILES || type.filePath === selectedFile.replace(workspaceInfo?.workspaceRoot, '').substring(1)) {
                    return type.name.toLowerCase().includes(query.toLowerCase());
                }
            });
            const functions = module.functions.filter((func) => {
                if (selectedFile === SELECT_ALL_FILES || func.filePath === selectedFile.replace(workspaceInfo?.workspaceRoot, '').substring(1)) {
                    return func.name.toLowerCase().includes(query.toLowerCase());
                }
            });
            const records = module.records.filter((record) => {
                if (selectedFile === SELECT_ALL_FILES || record.filePath === selectedFile.replace(workspaceInfo?.workspaceRoot, '').substring(1)) {
                    return record.name.toLowerCase().includes(query.toLowerCase());
                }
            });
            const objects = module.objects.filter((object) => {
                if (selectedFile === SELECT_ALL_FILES || object.filePath === selectedFile.replace(workspaceInfo?.workspaceRoot, '').substring(1)) {
                    return object.name.toLowerCase().includes(query.toLowerCase());
                }
            });
            const classes = module.classes.filter((cls) => {
                if (selectedFile === SELECT_ALL_FILES || cls.filePath === selectedFile.replace(workspaceInfo?.workspaceRoot, '').substring(1)) {
                    return cls.name.toLowerCase().includes(query.toLowerCase());
                }
            });
            const constants = module.constants.filter((constant) => {
                if (selectedFile === SELECT_ALL_FILES || constant.filePath === selectedFile.replace(workspaceInfo?.workspaceRoot, '').substring(1)) {
                    return constant.name.toLowerCase().includes(query.toLowerCase());
                }
            });
            const enums = module.enums.filter((enumType) => {
                if (selectedFile === SELECT_ALL_FILES || enumType.filePath === selectedFile.replace(workspaceInfo?.workspaceRoot, '').substring(1)) {
                    return enumType.name.toLowerCase().includes(query.toLowerCase());
                }
            });
            const listeners = module.listeners.filter((listener) => {
                if (selectedFile === SELECT_ALL_FILES || listener.filePath === selectedFile.replace(workspaceInfo?.workspaceRoot, '').substring(1)) {
                    return listener.name.toLowerCase().includes(query.toLowerCase());
                }
            });
            const moduleVariables = module.moduleVariables.filter((variable) => {
                if (selectedFile === SELECT_ALL_FILES || variable.filePath === selectedFile.replace(workspaceInfo?.workspaceRoot, '').substring(1)) {
                    return variable.name.toLowerCase().includes(query.toLowerCase());
                }
            });
            return {
                ...module,
                services,
                types,
                functions,
                records,
                objects,
                classes,
                constants,
                enums,
                listeners,
                moduleVariables,
            };
        });
        return {
            ...pkg,
            modules,
        };
    });

    console.log("filtered components: ", filteredComponents)

    return (
        <>
            <TitleBar query={query} selectedFile={selectedFile} workspacesFileResponse={workspaceInfo} onSelectedFileChange={handleFileChange} onQueryChange={handleSearch} />
            {components ? (
                <ComponentListView currentComponents={{ packages: filteredComponents }} />
            ) : (
                <div>No data available</div>
            )}
        </>
    );
}
