
import { useEffect, useState } from 'react';
import { EVENT_TYPE, ListenerModel, ListenersResponse, ServiceModel } from '@dharshi/ballerina-core';
import { Stepper, View, ViewContent } from '@dharshi/ui-toolkit';
import styled from '@emotion/styled';
import { useRpcContext } from '@dharshi/ballerina-rpc-client';
import ListenerConfigForm from './Forms/ListenerConfigForm';
import ServiceConfigForm from './Forms/ServiceConfigForm';
import { LoadingContainer } from '../styles';
import { TitleBar } from '../../components/TitleBar';
import { TopNavigationBar } from '../../components/TopNavigationBar';
import { LoadingRing } from '../../components/Loader';

const FORM_WIDTH = 600;

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
    margin: 20px;
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

const StepperContainer = styled.div`
    margin-top: 16px;
    margin-left: 16px;
    margin-bottom: 20px;
`;

export interface ServiceWizardProps {
    type: string;
}

export function ServiceWizard(props: ServiceWizardProps) {
    const { type } = props;
    const { rpcClient } = useRpcContext();

    const [step, setStep] = useState<number>(0);

    const [listenerModel, setListenerModel] = useState<ListenerModel>(undefined);
    const [serviceModel, setServiceModel] = useState<ServiceModel>(undefined);
    const [listeners, setListeners] = useState<ListenersResponse>(undefined);

    const [existing, setExisting] = useState<boolean>(false);
    const [creatingListener, setCreatingListener] = useState<boolean>(false);

    const [saving, setSaving] = useState<boolean>(false);
    const [existingListener, setExistingListener] = useState<string>(undefined);

    useEffect(() => {
        rpcClient.getServiceDesignerRpcClient().getListeners({ filePath: "", moduleName: type }).then(res => {
            console.log("Existing Listeners: ", res);
            setExisting(res.hasListeners);
            if (res.hasListeners) {
                rpcClient.getServiceDesignerRpcClient().getServiceModel({ filePath: "", moduleName: type, listenerName: "" }).then(res => {
                    console.log("Service Model: ", res);
                    res.service.properties["listener"].editable = true;
                    setServiceModel(res.service);
                    setStep(1);
                });
            }
            setListeners(res);
        });
        rpcClient.getServiceDesignerRpcClient().getListenerModel({ moduleName: type }).then(res => {
            console.log("Listener Model: ", res);
            setListenerModel(res.listener);
        });
    }, []);

    const handleListenerSubmit = async (value?: ListenerModel) => {
        setSaving(true);
        let listenerName: string;
        if (value) {
            await rpcClient.getServiceDesignerRpcClient().addListenerSourceCode({ filePath: "", listener: value });
            if (value.properties['name'].value) {
                listenerName = value.properties['name'].value;
            }
        }
        if (!value && existing) {
            listenerName = existingListener;
        }
        rpcClient.getServiceDesignerRpcClient().getServiceModel({ filePath: "", moduleName: type, listenerName }).then(res => {
            console.log("Service Model: ", res);
            res.service.properties["listener"].items = [...res.service.properties["listener"].items, listenerName];
            if (existing) {
                res.service.properties["listener"].editable = true;
            }
            setServiceModel(res.service);
            setSaving(false);
            setStep(1);
        });
    };

    const handleServiceSubmit = async (value: ServiceModel) => {
        console.log("handling service submit: ", value)
        setSaving(true);
        const res = await rpcClient.getServiceDesignerRpcClient().addServiceSourceCode({ filePath: "", service: value });
        rpcClient.getVisualizerRpcClient().openView({
            type: EVENT_TYPE.OPEN_VIEW,
            location: {
                documentUri: res.filePath,
                position: res.position
            },
        });
    }

    const onBack = () => {
        setStep(1);
    }

    const openListenerForm = () => {
        setCreatingListener(true);
        setStep(0);
    }

    const onListenerSelect = (value: string) => {
        setExistingListener(value);
    }

    const defaultSteps = ["Listener Configuration", "Service Configuration"];

    return (
        <View>
            <TopNavigationBar />
            <TitleBar title="Service" subtitle="Create a new service for your integration" />
            <ViewContent>
                {!listenerModel && !listeners &&
                    <LoadingContainer>
                        <LoadingRing message="Loading listener..." />
                    </LoadingContainer>
                }
                {listenerModel &&
                    <Container>
                        {!listeners?.hasListeners &&
                            <StepperContainer>
                                <Stepper alignment='flex-start' steps={defaultSteps} currentStep={step} />
                            </StepperContainer>
                        }
                        {step === 0 && !saving &&
                            <>
                                <ListenerConfigForm listenerModel={listenerModel} onSubmit={handleListenerSubmit} onBack={creatingListener && onBack} formSubmitText={listeners?.hasListeners ? "Create" : undefined} />
                            </>
                        }
                        {step === 0 && saving &&
                            <LoadingContainer>
                                <LoadingRing message="Saving listener..." />
                            </LoadingContainer>
                        }
                        {step === 1 && !saving &&
                            <>
                                <ServiceConfigForm serviceModel={serviceModel} onSubmit={handleServiceSubmit} openListenerForm={existing && openListenerForm} formSubmitText={"Create"} />
                            </>
                        }
                        {step === 1 && saving &&
                            <LoadingContainer>
                                <LoadingRing message="Saving service..." />
                            </LoadingContainer>
                        }
                    </Container>
                }
            </ViewContent>
        </View >


    );
};
