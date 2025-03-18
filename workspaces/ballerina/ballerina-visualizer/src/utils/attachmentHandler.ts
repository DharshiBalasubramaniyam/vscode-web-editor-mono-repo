import { AttachmentResult } from "@dharshi/ballerina-core";

export interface AttachmentHandler {
    handleFileAttach(
        e: React.ChangeEvent<HTMLInputElement>
    ): Promise<AttachmentResult[]>;
}
