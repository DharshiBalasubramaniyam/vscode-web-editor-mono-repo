
import { NMD_Metadata as Metadata } from "../../interfaces/metadata-types";
// import { Node } from "../../interfaces/bi";

export function encodeMetadata(obj: Metadata): string {
    return btoa(encodeURIComponent(JSON.stringify(obj)));
}

export function decodeMetadata(str: string): Metadata {
    return JSON.parse(decodeURIComponent(atob(str)));
}

// export function getNodeMetadata(node: Node): Metadata | undefined {
//     if (!node.metadata) return undefined;
//     // if metadata is already encoded, decode it first
//     if (typeof node.metadata === "string") return decodeMetadata(node.metadata);
//     return node.metadata;
// }

// export function getEncodedNodeMetadata(node: Node): string | undefined {
//     if (!node.metadata) return undefined;
//     // if metadata is already encoded, return it
//     if (typeof node.metadata === "string") return node.metadata;
//     return encodeMetadata(node.metadata);
// }
