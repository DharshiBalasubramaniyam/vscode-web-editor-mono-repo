// tslint:disable: jsx-wrap-multiline jsx-no-multiline-js
import React, { ReactNode } from "react";

import { useStyles } from "./style";
import { cx } from "@emotion/css";
import { Typography } from "@dharshi/ui-toolkit";
import { VSCodeRadio, VSCodeRadioGroup } from "@vscode/webview-ui-toolkit/react";
import styled from "@emotion/styled";

interface CheckBoxGroupProps {
    label?: string;
    defaultValues?: string[];
    values: string[];
    onChange?: (values: string[]) => void;
    disabled?: boolean;
    testId?: string;
    checkBoxLabel?: ReactNode;
    checkBoxTestId?: string;
}

export function CheckBoxGroup(props: CheckBoxGroupProps) {
    const { values, onChange, label, defaultValues, testId } = props;
    const classes = useStyles();
    const [selected, setSelected] = React.useState(defaultValues);

    React.useEffect(() => {
        setSelected(defaultValues);
    }, [defaultValues]);

    const handleChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const value = target.name;
        let newSelected = selected;
        if (!selected.includes(value)) {
            newSelected = [...selected, value];
        } else if (selected.includes(value)) {
            newSelected = [...selected.filter((e) => e !== value)];
        }
        if (onChange) {
            onChange(newSelected);
        }
        setSelected(newSelected);
    };

    return (
        <CheckBoxContainer>
            {label !== undefined ? (
                <div className={cx(classes.labelWrapper, "labelWrapper")}>
                    <Typography variant="body3" className={classes.inputLabelForRequired}>
                        {label}
                    </Typography>
                    <Typography variant="body3" className={classes.starLabelForRequired}>
                        *
                    </Typography>
                </div>
            ) : null}

            <VSCodeRadioGroup orientation="vertical" style={{ marginRight: "auto" }}>
                {values.map((val) => (
                    <VSCodeRadio
                        checked={selected.includes(val)}
                        onClick={handleChange}
                        data-testid={testId}
                        key={val}
                        value={val}
                        name={val}
                    >
                        {val}
                    </VSCodeRadio>
                ))}
            </VSCodeRadioGroup>
        </CheckBoxContainer>
    );
}

const CheckBoxContainer = styled.div`
    display: flex;
    width: 100%;
`;
