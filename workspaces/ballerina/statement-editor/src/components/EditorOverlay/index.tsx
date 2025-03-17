// tslint:disable: jsx-no-multiline-js
import React from "react";

import PullingModuleImg from "../../assets/images/PullingModuleImg";
import SourceMissingImg from "../../assets/images/SourceMissingImg";
import { useStatementEditorStyles } from "../styles";

import { useStyles } from "./style";

export enum OverlayType {
    Disabled,
    ModulePulling,
}

export interface EditorOverlayProps {
    type: OverlayType;
}

export function EditorOverlay(props: EditorOverlayProps) {
    const { type } = props;
    const classes = useStyles();
    const overlayClasses = useStatementEditorStyles();

    return (
        <div className={overlayClasses.mainStatementWrapper} data-testid="editor-overlay">
            {type === OverlayType.Disabled && (
                <div className={overlayClasses.loadingWrapper}>
                    <SourceMissingImg />
                    <p className={classes.title}>Source code has been changed</p>
                    <p className={classes.subtitle}>Please retry editing a statement</p>
                </div>
            )}
            {type === OverlayType.ModulePulling && (
                <div className={overlayClasses.loadingWrapper}>
                    <PullingModuleImg />
                    <p className={classes.title}>Pulling packages</p>
                    <p className={classes.subtitle}>This might take some time</p>
                </div>
            )}
        </div>
    );
}
