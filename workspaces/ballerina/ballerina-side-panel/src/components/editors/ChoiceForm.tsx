
import React, { useEffect, useState } from "react";

import { Dropdown, LocationSelector, RadioButtonGroup } from "@dharshi/ui-toolkit";

import { FormField } from "../Form/types";
import { capitalize, getValueForDropdown } from "./utils";
import { useFormContext } from "../../context";
import styled from "@emotion/styled";
import { PropertyModel } from "@dharshi/ballerina-core";
import { EditorFactory } from "./EditorFactory";

interface ChoiceFormProps {
    field: FormField;
}

const Form = styled.div`
    display: grid;
    gap: 20px;
    width: 100%;
`;

const ChoiceSection = styled.div`
    display: grid;
    gap: 20px;
    width: 100%;
`;

const FormSection = styled.div`
    display: grid;
    gap: 20px;
    width: 100%;
`;

export function ChoiceForm(props: ChoiceFormProps) {
    const { field } = props;
    const { form } = useFormContext();
    const { setValue } = form;
    
    const [selectedOption, setSelectedOption] = useState<number>(1);
    
    const [dynamicFields, setDynamicFields] = useState<FormField[]>([]);
    
    console.log("choice field: ", field)

    // Add useEffect to set initial values
    useEffect(() => {
        const realValue = selectedOption - 1;
        const property = field.choices[realValue];
        setDynamicFields(convertConfig(property));
        setValue(field.key, realValue);
    }, [selectedOption]);

    const convertConfig = (model: PropertyModel): FormField[] => {
        const formFields: FormField[] = [];
        for (const key in model.properties) {
            const expression = model.properties[key];
            const formField: FormField = {
                key: key,
                label: expression?.metadata.label || key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase()),
                type: expression.valueType === "EXPRESSION" ? "Default" : expression.valueType,
                documentation: expression?.metadata.description || "",
                valueType: expression.valueTypeConstraint,
                editable: expression.editable,
                optional: expression.optional,
                value: expression.value,
                valueTypeConstraint: expression.valueTypeConstraint,
                advanced: expression.advanced,
                diagnostics: [],
                items: expression.valueType === "SINGLE_SELECT" ? [""].concat(expression.items) : expression.items,
                choices: expression.choices,
                placeholder: expression.placeholder
            }
            formFields.push(formField);
        }
        console.log("Dynamic Form Fields:", formFields)
        return formFields;
    }

    return (
        <Form>
            <ChoiceSection>
                <RadioButtonGroup
                    id="choice-options"
                    label={field.documentation}
                    defaultValue={1}
                    defaultChecked={true}
                    value={selectedOption}
                    options={field.choices.map((choice, index) => ({ id: index.toString(), value: index + 1, content: choice.metadata.label }))}
                    onChange={(e) => {
                        console.log("Choice Form Index:", Number(e.target.value))
                        const checkedValue = Number(e.target.value);
                        const realValue = checkedValue - 1;
                        setSelectedOption(checkedValue);
                        setValue(field.key, realValue);
                    }}
                />
            </ChoiceSection>

            <FormSection>
                {dynamicFields.map((dfield) => {
                    return (
                        <EditorFactory
                            key={dfield.key}
                            field={dfield}
                        />
                    );
                })}
            </FormSection>

        </Form>

    );
}
