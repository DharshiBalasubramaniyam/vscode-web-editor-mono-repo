
import React from "react";

import { Dropdown } from "@dharshi/ui-toolkit";

import { FormField } from "../Form/types";
import { capitalize, getValueForDropdown } from "./utils";
import { useFormContext } from "../../context";
import { SubPanel, SubPanelView } from "@dharshi/ballerina-core";

interface DropdownEditorProps {
    field: FormField;
    openSubPanel?: (subPanel: SubPanel) => void;
}

export function DropdownEditor(props: DropdownEditorProps) {
    const { field, openSubPanel } = props;
    const { form } = useFormContext();
    const { register } = form;

    // HACK: create values for Scope field
    if (field.key === "scope") {
        field.items = ["Global", "Local"];
    }

    return (
        <Dropdown
            id={field.key}
            {...register(field.key, { required: !field.optional, value: getValueForDropdown(field) })}
            label={capitalize(field.label)}
            items={field.items?.map((item) => ({ id: item, content: item, value: item }))}
            required={!field.optional}
            disabled={!field.editable}
            sx={{ width: "100%" }}
            containerSx={{ width: "100%" }}
            addNewBtnClick={field.addNewButton ? () => openSubPanel({ view: SubPanelView.ADD_NEW_FORM }) : undefined}
        />
    );
}
