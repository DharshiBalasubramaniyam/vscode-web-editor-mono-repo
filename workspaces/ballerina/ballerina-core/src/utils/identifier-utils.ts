/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentInfo } from "../interfaces/ballerina";
import { BallerinaProjectComponents } from "../interfaces/extended-lang-client";

export function getAllVariablesForAiFrmProjectComponents(projectComponents: BallerinaProjectComponents): { [key: string]: any } {
    const variableCollection: { [key: string]: any } = {};
    projectComponents.packages?.forEach((packageSummary) => {
        packageSummary.modules.forEach((moduleSummary) => {
            moduleSummary.moduleVariables.forEach(({ name }: ComponentInfo) => {
                if (!variableCollection[name]) {
                    variableCollection[name] = {
                        type: name,
                        position: 0,
                        isUsed: 0,
                    };
                }
            });
            moduleSummary.enums.forEach(({ name }: ComponentInfo) => {
                if (!variableCollection[name]) {
                    variableCollection[name] = {
                        type: name,
                        position: 0,
                        isUsed: 0,
                    };
                }
            });
            moduleSummary.records.forEach(({ name }: ComponentInfo) => {
                if (!variableCollection[name]) {
                    variableCollection[name] = {
                        type: name,
                        position: 0,
                        isUsed: 0,
                    };
                }
            });
        })
    });
    return variableCollection;
}

export function getAllVariablesByProjectComponents(projectComponents: BallerinaProjectComponents): string[] {
    const variableCollection: string[] = [];
    const variableInfo = getAllVariablesForAiFrmProjectComponents(projectComponents);
    Object.keys(variableInfo).map((variable) => {
        variableCollection.push(variable);
    });
    return variableCollection;
}
