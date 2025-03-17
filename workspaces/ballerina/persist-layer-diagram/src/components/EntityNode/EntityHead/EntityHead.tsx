
import React, { useEffect, useRef, useState } from 'react';
import { DiagramEngine, PortModel } from '@projectstorm/react-diagrams';
import { EntityPortWidget } from '../../EntityPort/EntityPortWidget';
import { EntityModel } from '../EntityModel';
import { EntityHead, EntityName } from '../styles';
import { Button, Codicon } from '@dharshi/ui-toolkit';

interface ServiceHeadProps {
    engine: DiagramEngine;
    node: EntityModel;
    isSelected: boolean;
    isCollapsed: boolean;
    onClick: () => void;
    setCollapsedStatus: (status: boolean) => void;
}

const ANON_RECORD_DISPLAY: string = 'record';

export function EntityHeadWidget(props: ServiceHeadProps) {
    const { engine, node, isSelected, isCollapsed, setCollapsedStatus, onClick } = props;
    const headPorts = useRef<PortModel[]>([]);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const displayName: string = node.getID().slice(node.getID().lastIndexOf(':') + 1);

    useEffect(() => {
        headPorts.current.push(node.getPortFromID(`left-${node.getID()}`));
        headPorts.current.push(node.getPortFromID(`right-${node.getID()}`));
    }, [node])

    const handleOnHover = (task: string) => {
        setIsHovered(task === 'SELECT' ? true : false);
        if (!isCollapsed) {
            node.handleHover(headPorts.current, task);
        }
    }

    const handleCollapsedStatus = () => {
        setCollapsedStatus(!isCollapsed);
        setIsHovered(false);
    }

    return (
        <EntityHead
            isAnonymous={node.entityObject.isAnonymous}
            isSelected={isSelected}
            onMouseOver={() => handleOnHover('SELECT')}
            onMouseLeave={() => handleOnHover('UNSELECT')}
            isCollapsed={isCollapsed}
            data-testid={`entity-head-${displayName}`}
        >
            <EntityPortWidget
                port={node.getPort(`left-${node.getID()}`)}
                engine={engine}
            />
            <EntityName
                isAnonymous={node.entityObject.isAnonymous}
                onClick={onClick}
            >
                {node.entityObject.isAnonymous ? ANON_RECORD_DISPLAY : displayName}
            </EntityName>
            <EntityPortWidget
                port={node.getPort(`right-${node.getID()}`)}
                engine={engine}
            />

            {isHovered &&
                <Button
                    onClick={handleCollapsedStatus}
                    sx={{
                        right: '8px',
                        position: 'absolute'
                    }}
                    appearance='icon'
                >
                    {isCollapsed ? <Codicon name="chevron-down" /> : <Codicon name="chevron-up" />}
                </Button>
            }
        </EntityHead>
    )
}
