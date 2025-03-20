// tslint:disable: jsx-no-multiline-js
import * as React from 'react';

import { DiagramEngine } from '@projectstorm/react-diagrams';
import classnames from "classnames";

import { DataMapperPortWidget } from '../../Port';
import { expandArrayFn } from "../../utils/dm-utils";

import {
    QueryExpressionNode,
} from './QueryExpressionNode';
import { Button, Codicon, ProgressRing, Tooltip } from '@dharshi/ui-toolkit';
import { useIntermediateNodeStyles } from '../../../styles';

export interface QueryExprAsSFVNodeWidgetProps {
    node: QueryExpressionNode;
    engine: DiagramEngine;
}

export function QueryExpressionNodeWidget(props: QueryExprAsSFVNodeWidgetProps) {
    const { node, engine } = props;
    const classes = useIntermediateNodeStyles();

    const [deleteInProgress, setDeleteInProgress] = React.useState(false);

    const deleteQueryLink = async () => {
        setDeleteInProgress(true);
        await node.deleteLink();
    }

    const loadingScreen = (
        <ProgressRing sx={{ height: '16px', width: '16px' }} />
    );

    return (!node.hidden && (
        <>
            {(!!node.sourcePort && !!node.inPort && !!node.outPort) && (
                <div className={classes.root} >
                    <div className={classes.header}>
                        <DataMapperPortWidget engine={engine} port={node.inPort} />
                        <Tooltip content={"Query Expression"} position="bottom">
                            <Codicon name="list-unordered" iconSx={{ color: "var(--vscode-input-placeholderForeground)" }} />
                        </Tooltip>
                        <Button
                            appearance="icon"
                            tooltip="Map array elements"
                            onClick={() => expandArrayFn(node)}
                            data-testid={`expand-query-${node?.targetFieldFQN}`}
                        >
                            <Codicon name="export" iconSx={{ color: "var(--vscode-input-placeholderForeground)" }} />
                        </Button>
                        {deleteInProgress ? (
                            <div className={classnames(classes.element, classes.loadingContainer)}>
                                {loadingScreen}
                            </div>
                        ) : (
                            <Button
                                appearance="icon"
                                tooltip="Delete"
                                onClick={deleteQueryLink} data-testid={`delete-query-${node?.targetFieldFQN}`}
                            >
                                <Codicon name="trash" iconSx={{ color: "var(--vscode-errorForeground)" }} />
                            </Button>
                        )}
                        <DataMapperPortWidget engine={engine} port={node.outPort} />
                    </div>
                </div>
            )}
        </>
    ));
}
