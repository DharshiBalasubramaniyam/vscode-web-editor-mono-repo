import {
    GAP_BETWEEN_FIELDS,
    GAP_BETWEEN_NODE_HEADER_AND_BODY,
    IO_NODE_FIELD_HEIGHT,
    IO_NODE_HEADER_HEIGHT,
    defaultModelOptions
} from "./constants";

export function getIONodeHeight(noOfFields: number) {
	return noOfFields * IO_NODE_FIELD_HEIGHT
		+ (IO_NODE_HEADER_HEIGHT - IO_NODE_FIELD_HEIGHT)
		+ noOfFields * GAP_BETWEEN_FIELDS
		+ GAP_BETWEEN_NODE_HEADER_AND_BODY;
}

export function calculateControlPointOffset(screenWidth: number) {
    const minWidth = 850;
    const maxWidth = 1500;
    const minOffset = 5;
    const maxOffset = 30;

    const clampedWidth = Math.min(Math.max(screenWidth, minWidth), maxWidth);
    const interpolationFactor = (clampedWidth - minWidth) / (maxWidth - minWidth);
    const interpolatedOffset = minOffset + interpolationFactor * (maxOffset - minOffset);
    return interpolatedOffset;
}
