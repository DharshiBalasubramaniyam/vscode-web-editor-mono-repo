
import React, { useEffect, useState } from "react";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { SqFlow } from "@dharshi/ballerina-core";
import { Diagram } from "@dharshi/sequence-diagram";
import styled from "@emotion/styled";
import { ThemeColors } from "@dharshi/ui-toolkit";
import { STNode } from "@dharshi/syntax-tree";
const Container = styled.div`
    width: 100%;
    height: calc(100vh - 50px);
    position: relative;
`;

const MessageContainer = styled.div({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

interface BISequenceDiagramProps {
    syntaxTree: STNode; // INFO: this is used to make the diagram rerender when code changes
    onUpdate: () => void;
    onReady: () => void;
}

export function BISequenceDiagram(props: BISequenceDiagramProps) {
    const { syntaxTree, onUpdate, onReady } = props;

    const { rpcClient } = useRpcContext();
    const [flowModel, setModel] = useState<SqFlow>(undefined);

    useEffect(() => {
        getSequenceModel();
    }, [syntaxTree]);

    const getSequenceModel = () => {
        onUpdate();
        rpcClient
            .getSequenceDiagramRpcClient()
            .getSequenceModel()
            .then((model) => {
                if (model && "participants" in model.sequenceDiagram) {
                    setModel(model.sequenceDiagram);
                }
                // TODO: handle SequenceModelDiagnostic
            })
            .finally(() => {
                // onReady();
            });
    };

    console.log(">>> visualizer: flow model", flowModel);

    return (
        <>
            <Container>
                {flowModel && (
                    <Diagram
                        model={flowModel}
                        onClickParticipant={() => {}}
                        onAddParticipant={() => {}}
                        onReady={onReady}
                    />
                )}
                {!flowModel && <MessageContainer>Loading sequence diagram ...</MessageContainer>}
            </Container>
        </>
    );
}
