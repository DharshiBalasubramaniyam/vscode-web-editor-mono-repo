
import { CDAutomation, CDService } from "@dharshi/ballerina-core";
import { ConnectionNodeModel } from "../components/nodes/ConnectionNode";
import { EntryNodeModel } from "../components/nodes/EntryNode";
import { ListenerNodeModel } from "../components/nodes/ListenerNode";

export type NodeModel = ListenerNodeModel | EntryNodeModel | ConnectionNodeModel;

export type EntryPointType = "service" | "automation";

export type EntryPoint = CDService | CDAutomation;
