
import { BallerinaSTParams, HistoryEntry, MACHINE_VIEW, SyntaxTreeResponse } from "@dharshi/ballerina-core";
import { NodePosition, STKindChecker, STNode, traversNode } from "@dharshi/syntax-tree";
import { StateMachine } from "../state-machine";
import { Uri } from "vscode";
import { UIDGenerationVisitor } from "./history/uid-generation-visitor";
import { FindNodeByUidVisitor } from "./history/find-node-by-uid";
import { FindConstructByNameVisitor } from "./history/find-construct-by-name-visitor";
import { FindConstructByIndexVisitor } from "./history/find-construct-by-index-visitor";
import { getConstructBodyString } from "./history/util";

export async function getView(documentUri: string, position: NodePosition, projectUri?: string): Promise<HistoryEntry> {

    const req = getSTByRangeReq(documentUri, position);

    const node = await StateMachine.langClient()?.getSTByRange(req as BallerinaSTParams) as SyntaxTreeResponse;
    if (node.parseSuccess) {
        if (STKindChecker.isTypeDefinition(node.syntaxTree)) {
            const recordST = node.syntaxTree;
            const name = recordST.typeName?.value;
            const module = recordST.typeData?.symbol?.moduleID;
            if (!name || !module) {
                // tslint:disable-next-line
                console.error('Couldn\'t generate record nodeId to render composition view', recordST);
            } else {
                const nodeId = `${module?.orgName}/${module?.moduleName}:${module?.version}:${name}`;
                return {
                    location: {
                        view: MACHINE_VIEW.TypeDiagram,
                        documentUri: documentUri,
                        position: position,
                        identifier: name,
                        projectUri: projectUri
                    }
                };
            }
        }
        if (STKindChecker.isClassDefinition(node.syntaxTree)) {
            const classST = node.syntaxTree;
            const name = classST.className?.value;
            const module = classST.typeData?.symbol?.moduleID;
            if (!name || !module) {
                // tslint:disable-next-line
                console.error('Couldn\'t generate class nodeId to render composition view', classST);
            } else {
                return {
                    location: {
                        view: MACHINE_VIEW.TypeDiagram,
                        documentUri: documentUri,
                        position: position,
                        identifier: name,
                        projectUri: projectUri
                    }
                };
            }
        }
        if (STKindChecker.isEnumDeclaration(node.syntaxTree)) {
            const enumST = node.syntaxTree;
            const name = enumST?.identifier?.value;
            const module = enumST.typeData?.symbol?.moduleID;
            if (!name || !module) {
                // tslint:disable-next-line
                console.error('Couldn\'t generate enum nodeId to render composition view', enumST);
            } else {
                return {
                    location: {
                        view: MACHINE_VIEW.TypeDiagram,
                        documentUri: documentUri,
                        position: position,
                        identifier: name,
                        projectUri: projectUri
                    }
                };
            }
        }
        if (
            STKindChecker.isModuleVarDecl(node.syntaxTree) &&
            STKindChecker.isQualifiedNameReference(node.syntaxTree.typedBindingPattern.typeDescriptor) &&
            node.syntaxTree.typedBindingPattern.typeDescriptor.identifier.value === "Client" &&
            STKindChecker.isCaptureBindingPattern(node.syntaxTree.typedBindingPattern.bindingPattern)
        ) {
            // connection
            const moduleName = node.syntaxTree.typedBindingPattern.bindingPattern.variableName.value.toLowerCase();
            const connectionName =  node.syntaxTree.typedBindingPattern.bindingPattern.typeData.typeSymbol.name.toLowerCase();
            if (!moduleName) {
                // tslint:disable-next-line
                console.error("Couldn't capture connection from STNode", { STNode: node.syntaxTree });
            } else {
                return {
                    location: {
                        view: MACHINE_VIEW.EditConnectionWizard,
                        identifier: `${moduleName}:${connectionName}`,
                        documentUri: documentUri,
                        position: position,
                        projectUri: projectUri
                    },
                };
            }
        }

        if (STKindChecker.isListenerDeclaration(node.syntaxTree)) {
            const listenerST = node.syntaxTree;
            const variablePosition = listenerST.variableName.position;
            return {
                location: {
                    view: MACHINE_VIEW.BIListenerConfigView,
                    documentUri: documentUri,
                    position: variablePosition
                }
            };
        }

        if (STKindChecker.isServiceDeclaration(node.syntaxTree)) {
            const expr = node.syntaxTree.expressions[0];
            let haveServiceType = false;
            if (node.syntaxTree.typeDescriptor && STKindChecker.isSimpleNameReference(node.syntaxTree.typeDescriptor)) {
                haveServiceType = true;
            }
            if (expr?.typeData?.typeSymbol?.signature?.includes("graphql")) {
                return {
                    location: {
                        view: MACHINE_VIEW.GraphQLDiagram,
                        identifier: node.syntaxTree.absoluteResourcePath.map((path) => path.value).join(''),
                        documentUri: documentUri,
                        position: position,
                        projectUri: projectUri
                    }
                };
            } else {
                return {
                    location: {
                        view: MACHINE_VIEW.ServiceDesigner,
                        identifier: node.syntaxTree.absoluteResourcePath.map((path) => path.value).join(''),
                        documentUri: documentUri,
                        position: position
                    }
                };
            }
        } else if (
            STKindChecker.isFunctionDefinition(node.syntaxTree)
            && STKindChecker.isExpressionFunctionBody(node.syntaxTree.functionBody)
        ) {
            return {
                location: {
                    view: MACHINE_VIEW.DataMapper,
                    identifier: node.syntaxTree.functionName.value,
                    documentUri: documentUri,
                    position: position
                },
                dataMapperDepth: 0
            };
        } else if (
            STKindChecker.isFunctionDefinition(node.syntaxTree)
            || STKindChecker.isResourceAccessorDefinition(node.syntaxTree)
            || STKindChecker.isObjectMethodDefinition(node.syntaxTree)
        ) {
            if (StateMachine.context().isBI) {
                return {
                    location: {
                        view: MACHINE_VIEW.BIDiagram,
                        documentUri: documentUri,
                        position: node.syntaxTree.position,
                        metadata: {
                            // enableSequenceDiagram: ballerinaExtInstance.enableSequenceDiagramView(),
                            enableSequenceDiagram: false
                        }
                    },
                    dataMapperDepth: 0
                };
            }
            console.log("the view is a sequence diagram...");
            return {
                location: {
                    view: MACHINE_VIEW.SequenceDiagram,
                    documentUri: documentUri,
                    position: position
                },
                dataMapperDepth: 0
            };

        }

        // config variables

        if (node.syntaxTree.qualifiers && STKindChecker.isConfigurableKeyword(node.syntaxTree.qualifiers[0]) &&
            STKindChecker.isCaptureBindingPattern(node.syntaxTree.typedBindingPattern?.bindingPattern as STNode)) {
                console.log("is a configurable variable...");
            return {
                location: {
                    view: MACHINE_VIEW.EditConfigVariables,
                    documentUri: documentUri,
                    position: position
                },
            };
        }
    }

    return { location: { view: MACHINE_VIEW.Overview, documentUri: documentUri } };
}

export function getComponentIdentifier(node: STNode): string {
    if (STKindChecker.isServiceDeclaration(node)) {
        return node.absoluteResourcePath.map((path) => path.value).join('');
    } else if (STKindChecker.isFunctionDefinition(node) || STKindChecker.isResourceAccessorDefinition(node)) {
        return node.functionName.value;
    }
    return '';
}

export function generateUid(position: NodePosition, fullST: STNode): string {
    const uidGenVisitor = new UIDGenerationVisitor(position);
    traversNode(fullST, uidGenVisitor);
    return uidGenVisitor.getUId();
}

export function getNodeByUid(uid: string, fullST: STNode): STNode {
    const nodeFindingVisitor = new FindNodeByUidVisitor(uid);
    traversNode(fullST, nodeFindingVisitor);
    return nodeFindingVisitor.getNode();
}

export function getNodeByName(uid: string, fullST: STNode): [STNode, string] {
    const nodeFindingVisitor = new FindConstructByNameVisitor(uid);
    traversNode(fullST, nodeFindingVisitor);
    return [nodeFindingVisitor.getNode(), nodeFindingVisitor.getUid()];
}

export function getNodeByIndex(uid: string, fullST: STNode): [STNode, string] {
    const nodeFindingVisitor = new FindConstructByIndexVisitor(uid, getConstructBodyString(fullST));
    traversNode(fullST, nodeFindingVisitor);
    return [nodeFindingVisitor.getNode(), nodeFindingVisitor.getUid()];
}

function getSTByRangeReq(documentUri: string, position: NodePosition) {
    return {
        documentIdentifier: { uri: Uri.parse(documentUri).toString() },
        lineRange: {
            start: {
                line: position.startLine,
                character: position.startColumn
            },
            end: {
                line: position.endLine,
                character: position.endColumn
            }
        }
    };
}
