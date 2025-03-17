
import React from "react";
import {
    BombIcon,
    BranchIcon,
    BreakIcon,
    CallIcon,
    CodeIcon,
    CommentIcon,
    ContinueIcon,
    EqualIcon,
    FunctionIcon,
    LockIcon,
    LoopIcon,
    PlusIcon,
    ReturnIcon,
    SecurityIcon,
    StopIcon,
    TransformIcon,
    VarIcon,
} from "../../resources";
import { NodeKind } from "../../utils/types";
import { Icon, ThemeColors } from "@dharshi/ui-toolkit";

interface NodeIconProps {
    type: NodeKind;
    size?: number;
}

export function NodeIcon(props: NodeIconProps) {
    const { type, size = 16 } = props;

    switch (type) {
        case "IF":
            return <BranchIcon />;
        case "EXPRESSION":
            return <CodeIcon />;
        case "REMOTE_ACTION_CALL":
        case "RESOURCE_ACTION_CALL":
            return <CallIcon />;
        case "RETURN":
            return <ReturnIcon />;
        case "VARIABLE":
        case "NEW_DATA":
        case "UPDATE_DATA":
            return <VarIcon />;
        case "FOREACH":
        case "WHILE":
            return <Icon name="bi-loop" sx={{ fontSize: size, width: size, height: size }} />;
        case "BREAK":
            return <BreakIcon />;
        case "CONTINUE":
            return <ContinueIcon />;
        case "STOP":
            return <StopIcon />;
        case "ERROR_HANDLER":
            return (
                <Icon
                    name="bi-shield"
                    sx={{ stroke: ThemeColors.ON_SURFACE, fontSize: size, width: size, height: size }}
                />
            );
        case "PANIC":
            return <BombIcon />;
        case "LOCK":
            return <LockIcon />;
        case "TRANSACTION":
            return <TransformIcon />;
        case "NEW_CONNECTION":
            return <PlusIcon />;
        case "COMMENT":
            return <CommentIcon />;
        case "ASSIGN":
            return <EqualIcon />;
        case "FUNCTION":
        case "FUNCTION_CALL":
            return <FunctionIcon />;
        case "NP_FUNCTION_CALL":
            return <Icon name="bi-ai-function" sx={{ fontSize: size, width: size, height: size }} />;
        case "DATA_MAPPER_CALL":
            return <Icon name="dataMapper" sx={{ fontSize: size, width: size, height: size }} />;
        case "FORK":
            return <Icon name="bi-parallel" sx={{ fontSize: size, width: size, height: size }} />;
        case "WAIT":
            return <Icon name="bi-wait" sx={{ fontSize: size, width: size, height: size }} />;
        case "START":
            return <Icon name="bi-start" sx={{ fontSize: size, width: size, height: size }} />;
        case "COMMIT":
            return <Icon name="bi-commit" sx={{ fontSize: size, width: size, height: size }} />;
        case "ROLLBACK":
            return <Icon name="bi-rollback" sx={{ fontSize: size, width: size, height: size }} />;
        case "FAIL":
            return <Icon name="bi-error" sx={{ fontSize: size, width: size, height: size }} />;
        case "RETRY":
            return <Icon name="bi-retry" sx={{ fontSize: size, width: size, height: size }} />;
        case "AGENT_CALL":
            return <Icon name="bi-ai-agent" sx={{ fontSize: size, width: size, height: size }} />;

        default:
            return <CodeIcon />;
    }
}

export default NodeIcon;
