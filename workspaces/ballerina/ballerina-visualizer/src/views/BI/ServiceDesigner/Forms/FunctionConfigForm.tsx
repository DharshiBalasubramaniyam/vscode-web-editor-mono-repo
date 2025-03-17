
import React, { useState } from "react";
import { ActionButtons, Dropdown, SidePanelBody } from "@dharshi/ui-toolkit";
import { FunctionModel, ServiceModel } from "@dharshi/ballerina-core";

import { EditorContentColumn } from "../styles";

interface FunctionConfigFormProps {
    serviceModel: ServiceModel;
    onSubmit?: (model: FunctionModel) => void;
    onBack?: () => void;
}

export function FunctionConfigForm(props: FunctionConfigFormProps) {

    const { serviceModel, onSubmit, onBack } = props;

    const options = serviceModel.functions.filter(func => !func.enabled).map((func, index) => ({ id: index.toString(), value: func.name.value }));
    const [functionName, setFunctionName] = useState<string>(options.length > 0 ? options[0].value : undefined);

    const handleOnSelect = (value: string) => {
        setFunctionName(value);
    };

    const handleConfigSave = () => {
        const selectedFunction = serviceModel.functions.find(func => func.name.value === functionName);
        selectedFunction.enabled = true;
        onSubmit(selectedFunction);
    };

    return (
        <SidePanelBody>
            <EditorContentColumn>
                <Dropdown
                    id="function-selector"
                    sx={{ zIndex: 2, width: "100%", marginBottom: 20 }}
                    isRequired
                    items={options}
                    label="Available Functions"
                    onValueChange={handleOnSelect}
                    value={functionName}
                />
                <ActionButtons
                    primaryButton={{ text: "Save", onClick: handleConfigSave }}
                    secondaryButton={{ text: "Cancel", onClick: onBack }}
                    sx={{ justifyContent: "flex-end" }}
                />
            </EditorContentColumn>
        </SidePanelBody>
    );
}

export default FunctionConfigForm;
