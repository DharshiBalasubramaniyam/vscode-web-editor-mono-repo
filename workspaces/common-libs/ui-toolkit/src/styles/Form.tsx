import styled from "@emotion/styled";

export interface FormContainerProps {
    sx?: any;
    width?: number;
}

export const FormContainer = styled.div<FormContainerProps>`
    display: flex;
    flex-direction: column;
    margin: auto; /* Center vertically and horizontally */
    min-width: 600px;
    ${(props: FormContainerProps) => props.sx};
`;
