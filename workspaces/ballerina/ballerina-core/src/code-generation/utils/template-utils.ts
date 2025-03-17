/* eslint-disable @typescript-eslint/no-explicit-any */

import { compile } from "handlebars";
import templates from "../templates";

export interface TemplateStructure {
    name: TemplateKey;
    config: { [key: string]: any };
}

export type TemplateKey = 'ASYNC_SEND_ACTION' | 'ASYNC_RECEIVE_ACTION' | 'CODE_BLOCK_NODE' | 'ANNOTATION' | 'SWITCH_NODE' |
    'IF_BLOCK' | 'ELSE_BLOCK' | 'ELSEIF_BLOCK' | 'CALLER_ACTION' | 'CALLER_BLOCK' | 'RESPOND' | 'RETURN_BLOCK' | 'TRANSFORM_NODE' |
    'TRANSFORM_FUNCTION' | 'START_NODE' | 'UNION_EXPRESSION' | 'FUNCTION_RETURN' | "TRANSFORM_FUNCTION_CALL" | "TRANSFORM_FUNCTION_WITH_BODY";


export function getComponentSource(template : TemplateStructure) : string {
    const hbTemplate = compile(templates[template.name]);
    return hbTemplate(template.config);
}
