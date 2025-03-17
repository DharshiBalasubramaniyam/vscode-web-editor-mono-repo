
import styled from "@emotion/styled";
import React from "react";

export interface RequiredFormInputProps {
    sx?: any;
}
const RequiredElement = styled.span<RequiredFormInputProps>`
    font-size: 13px;
    ${(props: RequiredFormInputProps) => props.sx};
`;

export function RequiredFormInput(props: {id?: string, className?: string, sx?: any}) {
    const { id, className, sx } = props;
    return <RequiredElement id={id} sx={sx} className={className}>*</RequiredElement>;
}
