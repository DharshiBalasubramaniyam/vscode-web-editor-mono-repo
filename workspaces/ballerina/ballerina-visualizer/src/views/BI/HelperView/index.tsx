
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { VSCodePanels, VSCodePanelTab, VSCodePanelView } from "@vscode/webview-ui-toolkit/react";
import { Button, Codicon } from '@dharshi/ui-toolkit';
import { ConfigurePanelData, LineRange, SubPanel, SubPanelView } from '@dharshi/ballerina-core';
import { LibrariesView } from './LibrariesView';
import { ExpressionFormField } from '@dharshi/ballerina-side-panel';
import { VariablesView } from './VariablesView';
import { ConfigureView } from './ConfigureView';

interface HelperViewProps {
    filePath: string;
    position: LineRange;
    updateFormField: (data: ExpressionFormField) => void;
    editorKey: string;
    onClosePanel: (subPanel: SubPanel) => void;
    configurePanelData?: ConfigurePanelData;
}

enum TabElements {
    variables = 'Variables',
    libraries = 'Libraries',
    configure = 'Configure'
}

const Container = styled.div`
    height: 100%;
    padding-top: 10px;
`;

const PanelContent = styled(VSCodePanelView)`
    height: 100%;
    padding: 10px 0 10px 3px;
`;

export const PanelBody = styled.div`
    height: 100vh;
`;

export const CloseButton = styled(Button)`
        position: absolute;
        right: 10px;
        border-radius: 5px;
    `;

const StyledVSCodePanels = styled(VSCodePanels)`
    padding: 7px;
    overflow: hidden;
`;



export function HelperView(props: HelperViewProps) {
    const { filePath, position, updateFormField, editorKey, onClosePanel, configurePanelData } = props;

    const [activeTab, setActiveTab] = useState(TabElements.variables);

    const onClose = () => {
        onClosePanel({ view: SubPanelView.UNDEFINED });
    }

    useEffect(() => {
        if (configurePanelData?.isEnable) {
            console.log(">>> configurePanelData", configurePanelData);
            setActiveTab(TabElements.configure);
        }
    }, [configurePanelData]);

    return (
        <Container>
            <CloseButton appearance="icon" onClick={onClose}>
                <Codicon name="close" />
            </CloseButton>
            <StyledVSCodePanels activeid={activeTab}>
                <VSCodePanelTab id={TabElements.variables}>{TabElements.variables}</VSCodePanelTab>
                <VSCodePanelTab id={TabElements.libraries}>{TabElements.libraries}</VSCodePanelTab>
                {configurePanelData?.isEnable &&
                    <VSCodePanelTab id={TabElements.configure}>{TabElements.configure}</VSCodePanelTab>
                }
                <PanelContent id={TabElements.variables} >
                    <VariablesView filePath={filePath} position={position} updateFormField={updateFormField} editorKey={editorKey} />
                </PanelContent>
                <PanelContent id={TabElements.libraries}>
                    <LibrariesView filePath={filePath} position={position} updateFormField={updateFormField} editorKey={editorKey} />
                </PanelContent>
                {configurePanelData?.isEnable &&
                    <PanelContent id={TabElements.configure}>
                        <ConfigureView filePath={filePath} position={position} updateFormField={updateFormField} editorKey={editorKey} configurePanelData={configurePanelData} />
                    </PanelContent>
                }
            </StyledVSCodePanels>
        </Container>
    );
};
