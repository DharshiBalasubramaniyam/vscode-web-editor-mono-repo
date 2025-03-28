import React from "react";
import { Button, Icon, Typography } from "@dharshi/ui-toolkit";

export interface FileSelectorProps {
    label: string;
    extension: "json" | "yaml" | "xml"; // TODO: support for yaml js-yaml library
    onReadFile: (text: string) => void;
}

export function FileSelector(props: FileSelectorProps) {
    const { extension, label, onReadFile } = props;

    const hiddenFileInput = React.useRef(null);

    const handleClick = (event?: any) => {
        hiddenFileInput.current.click();
    };

    const showFile = async (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        const ext = e.target.files[0].name.split(".").pop().toLowerCase();
        reader.readAsText(e.target.files[0]);
        reader.onload = async (loadEvent: any) => {
            if (ext === extension) {
                const text = loadEvent.target.result as string;
                onReadFile(text);
            }
        };
    };

    return (
        <React.Fragment>
            <input hidden={true} accept={`.${extension}`} type="file" onChange={showFile} ref={hiddenFileInput} />
            <Button onClick={handleClick} appearance="icon">
                <Icon
                    name="file-upload"
                    sx={{ height: "18px", width: "18px", marginRight: "4px" }}
                    iconSx={{ fontSize: "18px", color: "var(--vscode-charts-purple)" }}
                />
                <Typography
                    variant="body3"
                    sx={{ color: "var(--vscode-charts-purple)" }}
                >{`Upload ${extension.toUpperCase()} File`}</Typography>
            </Button>
        </React.Fragment>
    );
}
