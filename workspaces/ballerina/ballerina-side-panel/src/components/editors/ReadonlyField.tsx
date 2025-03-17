
import React from "react";
import { FormField } from "../Form/types";
import { TextField, Codicon, Button } from "@dharshi/ui-toolkit";
import { useFormContext } from "../../context";
import { capitalize } from "./utils";

interface ReadonlyFieldProps {
    field: FormField;
}

export function ReadonlyField(props: ReadonlyFieldProps) {
    const { field } = props;
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
            inputProps={{
                endAdornment: (
                    <Button
                        appearance="icon"
                        tooltip="Read-only"
                        disabled
                        sx={{ cursor: 'default', padding: 0 }}
                        buttonSx={{ padding: 0, opacity: 1 }}
                    >
                        <Codicon
                            name="lock-small"
                            sx={{ cursor: 'default' }}
                        />
                    </Button>
                )
            }}
            sx={{
                width: "100%"
            }}
            errorMsg={errorMsg}
        />
    );
}
