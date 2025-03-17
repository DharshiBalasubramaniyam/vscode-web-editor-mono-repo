import React from 'react';

import { ISSUES_URL } from '../../../components/Diagram/utils/constants';

export enum ErrorNodeKind {
    Input,
    Output,
    Intermediate,
    Other
}

export interface DataMapperErrorProps {
    errorNodeKind?: ErrorNodeKind;
}

export function RenderingError(props: DataMapperErrorProps) {
    const { errorNodeKind } = props;

    let errorMessage = "A problem occurred while rendering the ";
    switch (errorNodeKind) {
        case ErrorNodeKind.Input:
            errorMessage += "input(s).";
            break;
        case ErrorNodeKind.Output:
            errorMessage += "output.";
            break;
        default:
            errorMessage += "diagram.";
    }

    return (
        <>
            <p>
                {errorMessage}
            </p>
            <p>
                Please raise an issue with the sample code in our <a href={ISSUES_URL}>issue tracker</a>
            </p>
        </>
    )
}
