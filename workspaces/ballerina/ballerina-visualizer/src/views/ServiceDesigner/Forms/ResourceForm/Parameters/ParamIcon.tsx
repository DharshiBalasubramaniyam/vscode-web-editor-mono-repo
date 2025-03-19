import { Codicon, Icon } from "@dharshi/ui-toolkit";
import React from "react";

export interface Props {
    option: string;
}

export function ParamIcon(props: Props): JSX.Element {

    return (
        <>
            {props.option === "request" ? <Codicon sx={{marginTop: -3}} name="git-pull-request" /> : <Icon name={props.option} />}
        </>
    )
}
