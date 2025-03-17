// tslint:disable: jsx-no-multiline-js
import * as React from "react";
import { useStyles } from "./style";
import { Switch } from "@headlessui/react";
import { FormGroup } from "../../../../style";
import { Button, Typography } from "@dharshi/ui-toolkit";
import styled from "@emotion/styled";

export interface FormActionButtonsProps {
    cancelBtnText?: string;
    saveBtnText?: string;
    isMutationInProgress?: boolean;
    validForm?: boolean;
    onSave?: () => void;
    onCancel?: () => void;
    statementEditor?: boolean;
    toggleChecked?: boolean;
    experimentalEnabled?: boolean;
}

export function FormActionButtons(props: FormActionButtonsProps) {
    const classes = useStyles();
    const {
        cancelBtnText,
        saveBtnText,
        isMutationInProgress,
        validForm,
        onSave,
        onCancel,
        statementEditor,
        toggleChecked,
        experimentalEnabled,
    } = props;
    return (
        <div className={classes.formSave}>
            <div className={classes.stmtEditorToggle}>
                {experimentalEnabled && statementEditor && (
                    <FormGroup>
                        <Switch checked={toggleChecked} />
                    </FormGroup>
                )}
            </div>
            <div className={classes.buttonWrapper}>
                <Button appearance="secondary" onClick={() => onCancel()}>
                    <ButtonText variant="h4">{cancelBtnText}</ButtonText>
                </Button>
                <Button
                    appearance="primary"
                    disabled={isMutationInProgress || !validForm}
                    onClick={onSave}
                    data-testid="save-btn"
                >
                    <ButtonText variant="h4">{saveBtnText}</ButtonText>
                </Button>
            </div>
        </div>
    );
}

const ButtonText = styled(Typography)`
    margin: 0;
    padding: 0;
`;
