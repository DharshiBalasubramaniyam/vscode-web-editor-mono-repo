
import React from "react";
import { FormField } from "../Form/types";
import { CheckBoxGroup, FormCheckBox } from "@dharshi/ui-toolkit";
import { useFormContext } from "../../context";
import styled from "@emotion/styled";

const Label = styled.div`
    font-family: var(--font-family);
    color: var(--vscode-editor-foreground);
    text-align: left;
    text-transform: capitalize;
`;
const Description = styled.div`
    font-family: var(--font-family);
    color: var(--vscode-list-deemphasizedForeground);
    text-align: left;
`;
const LabelGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;
const BoxGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    width: 100%;
    align-items: flex-start;
`;

interface TextEditorProps {
    field: FormField;
    handleOnFieldFocus?: (key: string) => void;
}

export function CheckBoxEditor(props: TextEditorProps) {
    const { field } = props;
    const { form } = useFormContext();
    const { register, control } = form;

    return (
        <CheckBoxGroup containerSx={{ width: "100%" }}>
            <BoxGroup>
                <FormCheckBox name={field.key} {...register(field.key)} control={control as any} />
                <LabelGroup>
                    <Label>{field.label}</Label>
                    <Description>{field.documentation}</Description>
                </LabelGroup>
            </BoxGroup>
        </CheckBoxGroup>
    );
}
