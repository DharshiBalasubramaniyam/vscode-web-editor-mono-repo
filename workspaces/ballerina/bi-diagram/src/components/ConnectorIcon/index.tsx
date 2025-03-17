
import React from "react";
import { ApiIcon, DatabaseIcon, HttpIcon } from "../../resources";
import { FlowNode } from "../../utils/types";

interface ConnectorIconProps {
    node: FlowNode;
    url?: string;
    fallbackIcon?: React.ReactNode;
}

export function ConnectorIcon(props: ConnectorIconProps): React.ReactElement {
    const { node, url, fallbackIcon } = props;
    const [imageError, setImageError] = React.useState(false);

    if (url && isValidUrl(url) && !imageError) {
        return (
            <img src={url} alt={node.codedata.module} style={{ width: "24px" }} onError={() => setImageError(true)} />
        );
    }

    const databaseClients = ["mysql", "postgres", "sqlite", "mssql", "oracle", "redis", "cassandra", "mongodb"];
    if (node.metadata.icon && isValidUrl(node.metadata.icon) && !imageError) {
        return (
            <img
                src={node.metadata.icon}
                alt={node.codedata.module}
                style={{ width: "24px" }}
                onError={() => setImageError(true)}
            />
        );
    }

    if (fallbackIcon && imageError) {
        return <>{fallbackIcon}</>;
    }

    if (databaseClients.includes(node.codedata.module)) {
        return <DatabaseIcon />;
    }
    if (node.codedata.module === "http") {
        return <HttpIcon />;
    }

    return <ApiIcon />;
}

export default ConnectorIcon;

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}
