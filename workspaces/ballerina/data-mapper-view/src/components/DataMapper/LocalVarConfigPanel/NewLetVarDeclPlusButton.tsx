import React  from "react";

import { Button, Codicon, Tooltip } from "@dharshi/ui-toolkit";

import { useStyles } from "./style";

export interface NewLetVarDeclPlusButtonProps {
    index: number;
    onAddNewVar: (index: number) => void;
}

export function NewLetVarDeclPlusButton(props: NewLetVarDeclPlusButtonProps) {
    const { index, onAddNewVar } = props;
    const overlayClasses = useStyles();

    const handleOnClick = () => {
        onAddNewVar(index);
    };

    return (
        <div className={overlayClasses.plusButton}>
            <Tooltip
                content={"Add new local variable here"}
            >
                <Button
                    appearance="icon"
                    onClick={handleOnClick}
                    data-testid={`add-local-variable-btn-${index}`}
                >
                    <Codicon name="add"/>
                </Button>
            </Tooltip>
        </div>
    );
}
