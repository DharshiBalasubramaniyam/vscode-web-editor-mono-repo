import React from 'react';
import { Codicon } from '../Codicon/Codicon';
import { TextField } from '../TextField/TextField';

export interface SearchBoxProps {
    value: string;
    label?: string;
    id?: string;
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
    autoFocus?: boolean;
    size?: number;
    type?: "email" | "password" | "tel" | "text" | "url";
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
    sx?: any;
    onChange?: (e: string) => void;
}

const searchIcon = (<Codicon name="search" sx= {{cursor: "auto"}}/>);

export function SearchBox(props: SearchBoxProps) {
    const { label, size, disabled, readonly, value, id,
        icon, iconPosition, autoFocus, onChange, placeholder, sx
    } = props;
    const handleChange = (value: string) => {
        onChange && onChange(value);
    }
    return (
        <TextField
            autoFocus={autoFocus}
            icon={{ iconComponent: icon ?? searchIcon, position: iconPosition || "start" }}
            size={size}
            disabled={disabled}
            readonly={readonly}
            placeholder={placeholder}
            label={label}
            onTextChange={handleChange}
            value={value || ""}
            id={id}
            sx={sx}
        />
    );
}
