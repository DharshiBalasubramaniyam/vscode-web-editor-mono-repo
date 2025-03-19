// tslint:disable: jsx-no-multiline-js
import React from "react";

import { ParamIcon } from "./ParamIcon";
import { CheckBox, Codicon } from "@dharshi/ui-toolkit";
import { ActionIconWrapper, ContentSection, DeleteIconWrapper, EditIconWrapper, HeaderLabel, IconTextWrapper, IconWrapper, OptionLabel, disabledHeaderLabel, headerLabelStyles } from "../../../styles";
import { ParameterModel } from "@dharshi/ballerina-core";

interface ParamItemProps {
    param: ParameterModel;
    readonly?: boolean;
    onDelete: (param: ParameterModel) => void;
    onEditClick: (param: ParameterModel) => void;
}

export function ParamItem(props: ParamItemProps) {
    const { param, readonly, onDelete, onEditClick } = props;

    const label = param?.type.value ? `${param.type.value} ${param.name.value}${param.defaultValue?.value ? ` = ${param.defaultValue.value}` : ""}`
        : `${param.name.value}`;

    const handleDelete = () => {
        onDelete(param);
    };
    const handleEdit = () => {
        if (!readonly) {
            onEditClick(param);
        }
    };

    const haveErrors = () => {
        // Handle errors
    }

    return (
        <HeaderLabel haveErrors={haveErrors()} data-testid={`${label}-item`}>
            <IconTextWrapper onClick={handleEdit}>
                <IconWrapper>
                    <ParamIcon option={param?.httpParamType?.toLowerCase()} />
                </IconWrapper>
                <OptionLabel>
                    {param?.httpParamType ? param?.httpParamType.toUpperCase() : param?.metadata?.label.toUpperCase()}
                </OptionLabel>
            </IconTextWrapper>
            <ContentSection>
                <div
                    data-test-id={`${label}-param`}
                    className={readonly ? disabledHeaderLabel : headerLabelStyles}
                    onClick={handleEdit}
                >
                    {label}
                </div>
                {!readonly && (
                    <ActionIconWrapper>
                        <EditIconWrapper>
                            <Codicon name="edit" onClick={handleEdit} />
                        </EditIconWrapper>
                        <DeleteIconWrapper>
                            <Codicon name="trash" onClick={handleDelete} />
                        </DeleteIconWrapper>
                    </ActionIconWrapper>
                )}
            </ContentSection>
        </HeaderLabel>
    );
} ``
