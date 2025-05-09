import React, { useState } from 'react';
import { Button, Codicon, Dropdown, SearchBox } from '@dharshi/ui-toolkit';
import styled from '@emotion/styled';
import { ConstructorPanel } from '../ConstructorPanel';
import { WorkspacesFileResponse } from '@dharshi/ballerina-core';
import { SELECT_ALL_FILES } from '../../Overview';
// import { useRpcContext } from '@dharshi/ballerina-rpc-client';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    box-shadow: inset 0 -1px 0 0 var(--vscode-panel-border);
`;

const InputContainer = styled.div`
    display: flex;
    margin-bottom: 15px;
`;

const ComponentButton = styled.div`
    margin-right: 20px;
`;

export interface TitleBarProps {
    onQueryChange: (value: string) => void;
    onSelectedFileChange: (value: string) => void;
    selectedFile: string;
    query: string;
    workspacesFileResponse: WorkspacesFileResponse;
}

export function TitleBar(props: TitleBarProps) {
    const { onQueryChange, onSelectedFileChange, selectedFile, query, workspacesFileResponse } = props;
    const [isPanelOpen, setPanelOpen] = useState(false);

    // const {rpcClient} = useRpcContext()

    const openPanel = () => {
        setPanelOpen(!isPanelOpen);
    };

    const handleSearch = (value: string) => {
        onQueryChange(value);
    };

    const handleFileChange = (value: string) => {
        onSelectedFileChange(value);
    };

    const workspaceFiles = [{ value: SELECT_ALL_FILES, content: SELECT_ALL_FILES }];
    workspacesFileResponse?.files.map((file) => {
        workspaceFiles.push({ value: file.path, content: file.relativePath });
    });

    console.log({"workspaceFiles": workspaceFiles, "selectedFile": selectedFile});

    return (
        <Container>
            <InputContainer>
                <div
                    style={{
                        minWidth: 100,
                        marginRight: 20
                    }}
                >
                    <Dropdown
                        children={null}
                        ref={null}
                        id="file-select"
                        items={workspaceFiles}
                        label="File"
                        onValueChange={handleFileChange}
                        value={selectedFile}
                        sx={{ width: 200, marginTop: 2 }}
                    />
                </div>
                <SearchBox
                    sx={{ width: "45%", gap: 4 }}
                    placeholder="Search Component"
                    label="Search Component"
                    value={query}
                    onChange={handleSearch}
                />
            </InputContainer>

            <ComponentButton>
                <Button onClick={openPanel} appearance="primary" tooltip='Add Construct'>
                    <Codicon name="add" sx={{ marginRight: 5 }} /> Component
                </Button>
            </ComponentButton>
            {isPanelOpen && <ConstructorPanel isPanelOpen={isPanelOpen} setPanelOpen={setPanelOpen} filePath={selectedFile} />}
        </Container>
    );
}
