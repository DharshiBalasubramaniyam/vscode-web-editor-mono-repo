import { TriggerModelsResponse, BallerinaConstruct, ServiceModel, EVENT_TYPE, MACHINE_VIEW, DIRECTORY_MAP } from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { ProgressRing, Typography } from "@dharshi/ui-toolkit";
import { ReactNode, useEffect, useState } from "react";
import ModuleCard from "../Marketplace/ModuleCard";
import { ModuleIcon } from "@dharshi/ballerina-low-code-diagram";
import { Tooltip } from "@dharshi/ui-toolkit";
import useStyles from "./style";
import { PanelContainer } from "@dharshi/ballerina-side-panel";
import { useVisualizerContext } from "../../../Context";
import styled from "@emotion/styled";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    width: 100%;
`;

function TriggerPanel() {
    const classes = useStyles();
    const { rpcClient } = useRpcContext();
    const [triggers, setTriggers] = useState<TriggerModelsResponse>({ local: [] });
    const [loading, setLoading] = useState<boolean>(true);
    const { setSidePanel } = useVisualizerContext();


    const fetchTriggers = async () => {
        console.log("fetching triggers....")
        rpcClient
            .getServiceDesignerRpcClient()
            .getTriggerModels({ query: "" })
            .then((model) => {
                console.log(">>> triggers", model);
                setTriggers(model);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleClick = async (key: DIRECTORY_MAP, serviceType?: string) => {
        console.log("clicked: ", serviceType)
        setSidePanel("EMPTY");
        await rpcClient.getVisualizerRpcClient().openView({
            type: EVENT_TYPE.OPEN_VIEW,
            location: {
                view: MACHINE_VIEW.BIServiceWizard,
                serviceType: serviceType,
            },
        });
    };

    useEffect(() => {
        fetchTriggers();
    }, [])

    const loadingScreen = (
        <>
            <div>
                <ProgressRing data-testid="marketplace-search-loader" />
            </div>
            <div>
                <Typography variant="body1">Loading Triggers...</Typography>
            </div>
        </>
    );

    const notFoundComponent = (
        <div>
            <Typography variant="body1">No triggers found.</Typography>
        </div>
    );

    const triggersList = (
        <div style={{
            height: '80vh',
            overflowY: 'scroll',
            scrollbarWidth: 'none'
        }}>

            {
                triggers.local
                    .filter((t) => t.type === "event")
                    .map((item, index) => {
                        return (
                            <ModuleCard
                                key={item.id}
                                module={serviceModelToTrigger(item)}
                                onSelectModule={() => handleClick(DIRECTORY_MAP.SERVICES, item.moduleName)}
                                columns={3}
                            />
                        )
                    })
            }
        </div>
    );

    return (
        <PanelContainer title="Triggers" show={true} width={600} onClose={() => setSidePanel("EMPTY")}>
            <div
                id="module-list-container"
                style={{ width: '100%', flexDirection: "row", padding: '15px 20px' }}
            >
                {loading && loadingScreen}
                {triggers.local.length === 0 && notFoundComponent}

                {triggers.local.length > 0 && (
                    <GridContainer>
                        {triggersList}
                    </GridContainer>
                )}
            </div>
        </PanelContainer>
    )
}

function serviceModelToTrigger(trigger: ServiceModel): BallerinaConstruct {
    return {
        name: trigger.name,
        icon: trigger.icon,
        package: {
            organization: trigger.orgName,
            name: trigger.orgName,
            version: trigger.version
        }
    }
}

export default TriggerPanel;
