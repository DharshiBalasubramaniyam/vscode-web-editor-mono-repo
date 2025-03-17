
import React, { useEffect, useState } from "react";
import { Button, LocationSelector, TextField, Typography } from "@dharshi/ui-toolkit";
import styled from "@emotion/styled";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { BodyText } from "../../styles";

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 80px 120px;
    max-width: 600px;
`;

const ButtonWrapper = styled.div`
    margin-top: 20px;
    /* width: 130px; */
`;

export function ProjectForm() {
    const { rpcClient } = useRpcContext();
    const [selectedModule, setSelectedModule] = useState("Main");
    const [name, setName] = useState("");
    const [path, setPath] = useState("");

    const handleProjectName = (value: string) => {
        setName(value);
    };

    const handleCreateProject = () => {
        rpcClient
            .getBIDiagramRpcClient()
            .createProject({ projectName: name, isService: selectedModule === "Service", projectPath: path });
    };

    const handleProjecDirSelection = async () => {
        const projectDirectory = await rpcClient.getCommonRpcClient().selectFileOrDirPath({});
        setPath(projectDirectory.path);
    };

    useEffect(() => {
        (async () => {
            const currentDir = await rpcClient.getCommonRpcClient().getWorkspaceRoot();
            setPath(currentDir.path);
        })();

    }, []);

    return (
        <FormContainer>
            <Typography variant="h2">Create Your Kola Integration</Typography>
            <BodyText>
                Start by naming your project and selecting a location to save it. This will be the foundation for
                building your integration.
            </BodyText>
            <TextField
                onTextChange={handleProjectName}
                sx={{ marginTop: 20, marginBottom: 20 }}
                value={name}
                label="Integration Name"
                placeholder="Enter a integration name"
            />
            <LocationSelector
                label="Select Integration Directory"
                selectedFile={path}
                onSelect={handleProjecDirSelection}
            />
            <ButtonWrapper>
                <Button
                    disabled={name.length < 2 || path.length < 2}
                    onClick={handleCreateProject}
                    appearance="primary"
                >
                    Create Integration
                </Button>
            </ButtonWrapper>
        </FormContainer>
    );
}
