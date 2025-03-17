
import React from "react";
import { FormField } from "../Form/types";
import { TextField } from "@dharshi/ui-toolkit";
import { useFormContext } from "../../context";
import { capitalize } from "./utils";

interface TextEditorProps {
    field: FormField;
    handleOnFieldFocus?: (key: string) => void;
    autoFocus?: boolean;
}

export function TextEditor(props: TextEditorProps) {
    const { field, handleOnFieldFocus, autoFocus } = props;
    const { form } = useFormContext();
    const { register } = form;

    const errorMsg = field.diagnostics?.map((diagnostic) => diagnostic.message).join("\n");

    return (
        <TextField
            id={field.key}
            name={field.key}
            {...register(field.key, { required: !field.optional && !field.placeholder, value: field.value })}
            label={capitalize(field.label)}
            required={!field.optional}
            description={field.documentation}
            placeholder={field.placeholder}
            readOnly={!field.editable}
            sx={{ width: "100%" }}
            errorMsg={errorMsg}
            onFocus={() => handleOnFieldFocus?.(field.key)}
            autoFocus={autoFocus}
        />
    );
}
