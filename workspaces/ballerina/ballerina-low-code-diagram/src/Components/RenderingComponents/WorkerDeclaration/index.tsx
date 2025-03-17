import React from 'react';

import { NamedWorkerDeclaration } from '@dharshi/syntax-tree';

import { BlockViewState } from '../../../ViewState';
import { End } from '../End';
import { WorkerBody } from '../WorkerBody';
import { WorkerLine } from '../WorkerLine';

import './style.scss';
import { WorkerHead } from './WorkerHead';

interface WorkerProps {
    model: NamedWorkerDeclaration;
}

export function Worker(props: WorkerProps) {
    const { model } = props;
    const workerBodyVS: BlockViewState = model.workerBody.viewState as BlockViewState;

    return (
        <g id={`worker-${model.workerName.value}`} className={'worker-body'}>
            <WorkerLine viewState={model.viewState} />
            <WorkerHead model={model} />
            <WorkerBody model={model.workerBody} viewState={workerBodyVS} />
            {!workerBodyVS.isEndComponentAvailable && <End viewState={model.viewState.end} />}
        </g>
    )
}
