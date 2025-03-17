
import { ApiCallNodeModel } from "../components/nodes/ApiCallNode";
import { BaseNodeModel } from "../components/nodes/BaseNode";
import { ButtonNodeModel } from "../components/nodes/ButtonNode";
import { CommentNodeModel } from "../components/nodes/CommentNode";
import { DraftNodeModel } from "../components/nodes/DraftNode/DraftNodeModel";
import { EmptyNodeModel } from "../components/nodes/EmptyNode";
import { IfNodeModel } from "../components/nodes/IfNode/IfNodeModel";
import { StartNodeModel } from "../components/nodes/StartNode/StartNodeModel";
import { WhileNodeModel } from "../components/nodes/WhileNode";
import { EndNodeModel } from "../components/nodes/EndNode";

export type NodeModel =
    | BaseNodeModel
    | EmptyNodeModel
    | DraftNodeModel
    | IfNodeModel
    | WhileNodeModel
    | StartNodeModel
    | ApiCallNodeModel
    | CommentNodeModel
    | ButtonNodeModel
    | EndNodeModel;

// node model without button node model
export type LinkableNodeModel = Exclude<NodeModel, ButtonNodeModel>;

export type {
    Flow,
    Client,
    ClientKind,
    ClientScope,
    FlowNode,
    NodeKind,
    Branch,
    LineRange,
    LinePosition,
    Property,
    NodeProperties,
    NodePropertyKey,
    ViewState,
    NodePosition,
} from "@dharshi/ballerina-core";

export type FlowNodeStyle = "default" | "ballerina-statements";
