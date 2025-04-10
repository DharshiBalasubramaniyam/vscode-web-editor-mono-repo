
import React, { useEffect, useState } from 'react';
import { EVENT_TYPE, ServiceModel, NodePosition, LineRange } from '@dharshi/ballerina-core';
import { Typography, ProgressRing, View, ViewContent } from '@dharshi/ui-toolkit';
import styled from '@emotion/styled';
import { useRpcContext } from '@dharshi/ballerina-rpc-client';
import ServiceConfigForm from './Forms/ServiceConfigForm';
import { LoadingContainer } from '../styles';
import { TitleBar } from '../../components/TitleBar';
import { TopNavigationBar } from '../../components/TopNavigationBar';

const FormContainer = styled.div`
    padding-top: 15px;
    padding-bottom: 15px;
`;


const ContainerX = styled.div`
    padding: 0 20px 20px;
    max-width: 600px;
    > div:last-child {
        padding: 20px 0;
        > div:last-child {
            justify-content: flex-start;
        }
    }
`;

const Container = styled.div`
    display: "flex";
    flex-direction: "column";
    gap: 10;
    margin: 0 20px 20px 0;
`;

const BottomMarginTextWrapper = styled.div`
    margin-top: 20px;
    margin-left: 20px;
    font-size: 15px;
    margin-bottom: 10px;
`;

const HorizontalCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ButtonWrapper = styled.div`
    max-width: 600px;
    display: flex;
    gap: 10px;
    justify-content: right;
`;


export interface ServiceEditViewProps {
    filePath: string;
    position: NodePosition;
}

export function ServiceEditView(props: ServiceEditViewProps) {
    const { filePath, position } = props;
    const { rpcClient } = useRpcContext();
    const [serviceModel, setServiceModel] = useState<ServiceModel>(undefined);

    const [saving, setSaving] = useState<boolean>(false);

    useEffect(() => {
        const lineRange: LineRange = { startLine: { line: position.startLine, offset: position.startColumn }, endLine: { line: position.endLine, offset: position.endColumn } };
        rpcClient.getServiceDesignerRpcClient().getServiceModelFromCode({ filePath, codedata: { lineRange } }).then(res => {
            setServiceModel(res.service);
        })
    }, []);

    const onSubmit = async (value: ServiceModel) => {
        setSaving(true);
        const res = await rpcClient.getServiceDesignerRpcClient().updateServiceSourceCode({ filePath, service: value });
        await rpcClient.getVisualizerRpcClient().openView({
            type: EVENT_TYPE.OPEN_VIEW,
            location: {
                documentUri: res.filePath,
                position: res.position
            },
        });
        setSaving(false);
    }

    return (
        <View>
            <TopNavigationBar />
            <TitleBar title="Service" subtitle="Edit Service" />
            <ViewContent padding>
                {!serviceModel &&
                    <LoadingContainer>
                        <ProgressRing />
                        <Typography variant="h3" sx={{ marginTop: '16px' }}>Loading...</Typography>
                    </LoadingContainer>
                }
                {serviceModel &&
                    <Container>
                        {!saving &&
                            <>
                                <ServiceConfigForm serviceModel={serviceModel} onSubmit={onSubmit} openListenerForm={undefined} formSubmitText={"Save"} />
                            </>
                        }
                        {saving &&
                            <LoadingContainer>
                                <ProgressRing />
                                <Typography variant="h3" sx={{ marginTop: '16px' }}>Saving... Please wait</Typography>
                            </LoadingContainer>
                        }
                    </Container>
                }
            </ViewContent>
        </View >


    );
};
