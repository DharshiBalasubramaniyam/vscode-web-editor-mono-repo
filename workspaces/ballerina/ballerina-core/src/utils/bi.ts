
import { STKindChecker } from "@dharshi/syntax-tree";
import { ComponentInfo } from "../interfaces/ballerina";
import { DIRECTORY_MAP, ProjectStructureArtifactResponse, ProjectStructureResponse } from "../interfaces/bi";
import { BallerinaProjectComponents, ExtendedLangClientInterface, SyntaxTree } from "../interfaces/extended-lang-client";
import { CDModel } from "../interfaces/component-diagram";
import { URI } from "vscode-uri";
import { Uri } from "vscode";
import { LineRange } from "../interfaces/common";
import { ServiceModel } from "../interfaces/service";

export async function buildProjectStructure(projectDir: string, langClient: ExtendedLangClientInterface): Promise<ProjectStructureResponse> {
    const result: ProjectStructureResponse = {
        directoryMap: {
            [DIRECTORY_MAP.SERVICES]: [],
            [DIRECTORY_MAP.AUTOMATION]: [],
            [DIRECTORY_MAP.LISTENERS]: [],
            [DIRECTORY_MAP.FUNCTIONS]: [],
            [DIRECTORY_MAP.TRIGGERS]: [],
            [DIRECTORY_MAP.CONNECTIONS]: [],
            [DIRECTORY_MAP.TYPES]: [],
            [DIRECTORY_MAP.CONFIGURATIONS]: [],
            [DIRECTORY_MAP.RECORDS]: [],
            [DIRECTORY_MAP.DATA_MAPPERS]: [],
            [DIRECTORY_MAP.ENUMS]: [],
            [DIRECTORY_MAP.CLASSES]: []
        }
    };
    const components = await langClient.getBallerinaProjectComponents({
        documentIdentifiers: [{ uri: URI.parse(projectDir).toString() }]
    });
    const componentModel = await langClient.getDesignModel({
        projectPath: projectDir
    });
    await traverseComponents(components, result, langClient, componentModel?.designModel);
    console.log("build project structure: ", result);
    return result;
}

async function traverseComponents(components: BallerinaProjectComponents, response: ProjectStructureResponse, langClient: ExtendedLangClientInterface, designModel: CDModel) {

    const designServices: ComponentInfo[] = [];

    if (designModel) {
        designModel?.services.forEach(service => {
            const resources: ComponentInfo[] = [];
            service.resourceFunctions.forEach(func => {
                const resourceInfo: ComponentInfo = {
                    name: `${func.accessor} - ${func.path}`,
                    filePath: func.location.filePath.split('/').pop(),
                    startLine: func.location.startLine.line,
                    startColumn: func.location.startLine.offset,
                    endLine: func.location.endLine.line,
                    endColumn: func.location.endLine.offset,
                }
                resources.push(resourceInfo);
            })

            service.remoteFunctions.forEach(func => {
                const resourceInfo: ComponentInfo = {
                    name: func.name,
                    filePath: func.location.filePath.split('/').pop(),
                    startLine: func.location.startLine.line,
                    startColumn: func.location.startLine.offset,
                    endLine: func.location.endLine.line,
                    endColumn: func.location.endLine.offset,
                }
                resources.push(resourceInfo);
            })

            const serviceInfo: ComponentInfo = {
                name: service.absolutePath ? service.absolutePath : service.type,
                filePath: service.location.filePath.split('/').pop(),
                startLine: service.location.startLine.line,
                startColumn: service.location.startLine.offset,
                endLine: service.location.endLine.line,
                endColumn: service.location.endLine.offset,
                resources
            }
            designServices.push(serviceInfo);
        });
    }

    for (const pkg of components.packages) {
        for (const module of pkg.modules) {
            console.log(">>>automation>>>>>>")
            response.directoryMap[DIRECTORY_MAP.AUTOMATION].push(...await getComponents(langClient, module.automations, pkg.filePath, module?.name, "task", DIRECTORY_MAP.AUTOMATION));
            console.log("response: ", response);
            console.log(">>>services>>>>>>")
            // response.directoryMap[DIRECTORY_MAP.SERVICES].push(...await getComponents(langClient, designServices.length > 0 ? designServices : module.services, pkg.filePath, module?.name, "http-service", DIRECTORY_MAP.SERVICES));
            response.directoryMap[DIRECTORY_MAP.SERVICES].push(...await getComponents(langClient, module.services, pkg.filePath, module?.name, "http-service", DIRECTORY_MAP.SERVICES));
            console.log("response: ", response);
            console.log(">>>listenders>>>>>>")
            response.directoryMap[DIRECTORY_MAP.LISTENERS].push(...await getComponents(langClient, module.listeners, pkg.filePath, module?.name, "http-service", DIRECTORY_MAP.LISTENERS));
            console.log("response: ", response);
            console.log(">>>functions>>>>>>")
            response.directoryMap[DIRECTORY_MAP.FUNCTIONS].push(...await getComponents(langClient, module.functions, pkg.filePath, module?.name, "function"));
            console.log("response: ", response);
            console.log(">>>connections>>>>>>")
            response.directoryMap[DIRECTORY_MAP.CONNECTIONS].push(...await getComponents(langClient, module.moduleVariables, pkg.filePath, module?.name, "connection", DIRECTORY_MAP.CONNECTIONS));
            console.log("response: ", response);
            console.log(">>>types>>>>>>")
            response.directoryMap[DIRECTORY_MAP.TYPES].push(...await getComponents(langClient, module.types, pkg.filePath, module?.name, "type"));
            console.log("response: ", response);
            console.log(">>>records>>>>>>")
            response.directoryMap[DIRECTORY_MAP.RECORDS].push(...await getComponents(langClient, module.records, pkg.filePath, module?.name, "type"));
            console.log("response: ", response);
            console.log(">>>enums>>>>>>")
            response.directoryMap[DIRECTORY_MAP.ENUMS].push(...await getComponents(langClient, module.enums, pkg.filePath, module?.name, "type"));
            console.log("response: ", response);
            console.log(">>>classes>>>>>>")
            response.directoryMap[DIRECTORY_MAP.CLASSES].push(...await getComponents(langClient, module.classes, pkg.filePath, module?.name, "type"));
            console.log("response: ", response);
            console.log(">>>config vars>>>>>>")
            response.directoryMap[DIRECTORY_MAP.CONFIGURATIONS].push(...await getComponents(langClient, module.configurableVariables, pkg.filePath, module?.name, "config"));
        }
    }

    // Move data mappers to a separate category
    const functions = response.directoryMap[DIRECTORY_MAP.FUNCTIONS];
    response.directoryMap[DIRECTORY_MAP.FUNCTIONS] = [];
    for (const func of functions) {
        const st = func.st;
        if (STKindChecker.isFunctionDefinition(st) && STKindChecker.isExpressionFunctionBody(st.functionBody)) {
            func.icon = "dataMapper";
            response.directoryMap[DIRECTORY_MAP.DATA_MAPPERS].push(func);
        } else {
            response.directoryMap[DIRECTORY_MAP.FUNCTIONS].push(func);
        }
    }

    console.log("final response: ", response)
}

async function getComponents(langClient: ExtendedLangClientInterface, components: ComponentInfo[], projectPath: string, moduleName: string, icon: string, dtype?: DIRECTORY_MAP): Promise<ProjectStructureArtifactResponse[]> {
    console.log("getting components for: ", {"components": components, "module": moduleName})
    const entries: ProjectStructureArtifactResponse[] = [];
    let compType = "HTTP";
    let serviceModel: ServiceModel = undefined;
    for (const comp of components) {
        const componentFile = Uri.joinPath(Uri.parse(projectPath), moduleName ? `modules/${moduleName}/${comp.filePath}` : comp.filePath).toString();
        let stNode: SyntaxTree;
        try {
            stNode = await langClient.getSTByRange({
                documentIdentifier: { uri: componentFile },
                lineRange: {
                    start: {
                        line: comp.startLine,
                        character: comp.startColumn
                    },
                    end: {
                        line: comp.endLine,
                        character: comp.endColumn
                    }
                }
            }) as SyntaxTree;

            // Get trigger model if available
            const lineRange: LineRange = { startLine: { line: comp.startLine, offset: comp.startColumn }, endLine: { line: comp.endLine, offset: comp.endColumn } };
            const serviceResponse = await langClient.getServiceModelFromCode({ filePath: componentFile, codedata: { lineRange } });
            if (serviceResponse?.service) {
                serviceModel = serviceResponse.service;
                const triggerType = serviceModel.displayName;
                const labelName = serviceModel.properties['name'].value;
                compType = triggerType;
                comp.name = `${triggerType} - ${labelName}`
                icon = `bi-${serviceModel.moduleName}`;
            }
        } catch (error) {
            console.log(error);
        }

        let iconValue;
        if (serviceModel?.listenerProtocol === "graphql") {
            iconValue = "bi-graphql";
        } else {
            iconValue = comp.name.includes('-') && !serviceModel ? `${comp.name.split('-')[0]}-api` : icon;
        }

        if (!comp.name && serviceModel) {
            comp.name = `${serviceModel?.listenerProtocol}:Service`
        }

        const fileEntry: ProjectStructureArtifactResponse = {
            name: dtype === DIRECTORY_MAP.SERVICES ? comp.name || comp.filePath.replace(".bal", "") : comp.name,
            path: componentFile,
            type: compType,
            icon: iconValue,
            context: comp.name,
            st: stNode.syntaxTree,
            serviceModel: serviceModel,
            resources: comp?.resources ? await getComponents(langClient, comp?.resources, projectPath, "", "") : [],
            position: {
                endColumn: comp.endColumn,
                endLine: comp.endLine,
                startColumn: comp.startColumn,
                startLine: comp.startLine
            }
        };
        if (dtype === DIRECTORY_MAP.AUTOMATION) {
            fileEntry.name = "automation"
        }
        if (dtype === DIRECTORY_MAP.CONNECTIONS) {
            if (stNode.syntaxTree?.typeData?.isEndpoint) {
                entries.push(fileEntry);
            }
        } else {
            entries.push(fileEntry);
        }

        console.log("entry: ", entries);

    }
    return entries;
}
