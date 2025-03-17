
import React from "react";
import { View, ViewContent } from "@dharshi/ui-toolkit";
import { SCOPE } from "@dharshi/ballerina-core";

import { TitleBar } from "../../../components/TitleBar";
import { TopNavigationBar } from "../../../components/TopNavigationBar";
import { AddPanel, Container } from "./styles";
// import { AutomationPanel } from "./AutomationPanel";
// import { EventIntegrationPanel } from "./EventIntegrationPanel";
// import { FileIntegrationPanel } from "./FileIntegrationPanel";
// import { IntegrationAPIPanel } from "./IntegrationApiPanel";
// import { OtherArtifactsPanel } from "./OtherArtifactsPanel";
// import { AIAgentPanel } from "./AIAgentPanel";

interface ComponentListViewProps {
    scope: SCOPE;
};

export function ComponentListView(props: ComponentListViewProps) {
    const { scope } = props;

    return (
        <View>
            <TopNavigationBar />
            <TitleBar title="Artifacts" subtitle="Add a new artifact to your integration" />
            <ViewContent padding>
                <Container>
                    <AddPanel>
                        {/* <AutomationPanel scope={scope} /> */}
                        {/* <AIAgentPanel scope={scope} /> */}
                        {/* <IntegrationAPIPanel scope={scope} />
                        <EventIntegrationPanel scope={scope} />
                        <FileIntegrationPanel scope={scope} />
                        <OtherArtifactsPanel /> */}
                    </AddPanel>
                </Container>
            </ViewContent>
        </View>
    );
}
