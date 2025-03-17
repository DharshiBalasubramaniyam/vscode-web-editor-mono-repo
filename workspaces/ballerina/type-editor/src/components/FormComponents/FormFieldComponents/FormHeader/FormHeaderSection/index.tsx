// tslint:disable:jsx-no-multiline-js
import React from "react";
import { useStyles } from "./style";
import { Button, Codicon, Typography } from "@dharshi/ui-toolkit";
import { FormattedMessage } from "react-intl";

interface FormHeaderSectionProps {
    formTitle: string;
    defaultMessage: string;
    formTitleSecond?: string;
    defaultMessageSecond?: string;
    formType?: string;
    onCancel?: () => void;
    onBack?: () => void;
}

export function FormHeaderSection(props: FormHeaderSectionProps) {
    const { onCancel, onBack, formTitle, formTitleSecond, defaultMessage, defaultMessageSecond } = props;
    const formClasses = useStyles();

    return (
        <div className={formClasses.formHeaderTitleWrapper}>
            {onBack && (
                <Button appearance="icon" onClick={onBack}>
                    <Codicon name="arrow-small-left" />
                </Button>
            )}
            <Typography variant="h4" sx={{ paddingTop: "19px", paddingBottom: "16px" }}>
                <FormattedMessage id={formTitle} defaultMessage={defaultMessage} />
            </Typography>
            {formTitleSecond && (
                <div className={formClasses.secondTitle}>
                    <Codicon name="chevron-right" />{" "}
                    <Typography variant="h4" sx={{ paddingTop: "19px", paddingBottom: "16px" }}>
                        <FormattedMessage id={formTitleSecond} defaultMessage={defaultMessageSecond} />
                    </Typography>{" "}
                </div>
            )}
            {onCancel && (
                <Button appearance="icon" onClick={onCancel}>
                    <Codicon name="close" />
                </Button>
            )}
        </div>
    );
}
