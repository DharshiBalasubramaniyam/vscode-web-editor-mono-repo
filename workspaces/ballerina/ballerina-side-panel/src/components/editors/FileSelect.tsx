
import React, { useState } from "react";

import { Dropdown, LocationSelector } from "@dharshi/ui-toolkit";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";

import { FormField } from "../Form/types";
import { capitalize, getValueForDropdown } from "./utils";
import { useFormContext } from "../../context";

interface DropdownEditorProps {
    field: FormField;
}

export function FileSelect(props: DropdownEditorProps) {
    const { field } = props;
    const { form } = useFormContext();
    const { setValue } = form;

    const { rpcClient } = useRpcContext();
    const [filePath, setFilePath] = useState("");

    const handleFileSelect = async () => {
        const projectDirectory = await rpcClient.getCommonRpcClient().selectFileOrDirPath({ isFile: true });
        setFilePath(projectDirectory.path);
        setValue(field.key, projectDirectory.path)
    };

    return (
        <LocationSelector
            label={`Select ${field.label} File`}
            btnText="Select File"
            selectedFile={filePath}
            onSelect={handleFileSelect}
        />
    );
}
