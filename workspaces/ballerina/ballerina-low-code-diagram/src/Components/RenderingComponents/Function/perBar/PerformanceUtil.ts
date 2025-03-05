import { ANALYZE_TYPE, TopBarData } from "@dharshi/ballerina-core";
import { FunctionDefinition } from "@dharshi/syntax-tree";

export function generatePerfData(model: FunctionDefinition) {
    let concurrency: string;
    let latency: string;
    let tps: string;
    let isDataAvailable = false;
    let analyzeType: ANALYZE_TYPE;

    const data: TopBarData = (model as any).performance;

    if (data) {
        isDataAvailable = true;
        concurrency = data.concurrency;
        latency = data.latency;
        tps = data.tps;
        analyzeType = data.analyzeType;
    }

    return { concurrency, latency, tps, analyzeType, isDataAvailable };
}
