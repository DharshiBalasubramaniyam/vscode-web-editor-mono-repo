
import React, { SVGProps, useContext, useEffect, useState } from 'react';
import { DiagramEngine, PortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { Point } from '@projectstorm/geometry';
import { EntityLinkModel } from './EntityLinkModel';
import { ThemeColors } from '@dharshi/ui-toolkit';
import { DiagramContext } from '../../common';

interface WidgetProps {
	engine: DiagramEngine,
	link: EntityLinkModel
}

export function EntityLinkWidget(props: WidgetProps) {
	const { engine, link } = props;
	const { selectedNodeId } = useContext(DiagramContext);

	const [isSelected, setIsSelected] = useState<boolean>(false);

	// Check if the link is connected to the selectedNode
	const isConnectedToSelectedNode = React.useMemo(() => {
		if (!selectedNodeId) return false;
		const sourceNode = link.getSourcePort()?.getParent();
		const targetNode = link.getTargetPort()?.getParent();
		return sourceNode?.getID() === selectedNodeId || targetNode?.getID() === selectedNodeId;
	}, [link, selectedNodeId]);

	const linkColour = isSelected ? ThemeColors.SECONDARY : isConnectedToSelectedNode ? ThemeColors.PRIMARY : ThemeColors.ON_SURFACE;

	useEffect(() => {
		if (link.cardinality) {
			link.initLinks(engine);
		}

		link.registerListener({
			'SELECT': selectPath,
			'UNSELECT': unselectPath
		})
	}, [link])

	const selectPath = () => {
		setIsSelected(true);
		link.selectLinkedNodes();
	}

	const unselectPath = () => {
		setIsSelected(false);
		link.resetLinkedNodes();
	}

	const multiLinkedTarget: boolean = Object.entries(link.getTargetPort().getLinks()).length > 1;

	const getCardinalityProps = (port: PortModel): SVGProps<SVGTextElement> => {
		let position: Point = port.getPosition();
		let props: SVGProps<SVGTextElement> = {
			fontFamily: isSelected ? 'GilmerBold' : 'GilmerRegular',
			fontSize: 11,
			fontWeight: isSelected ? 'bold' : 'normal',
			textAnchor: 'start',
			y: position.y - 5
		};

		if (port.getOptions().alignment === PortModelAlignment.LEFT) {
			return { ...props, x: position.x - 20 };
		} else {
			return { ...props, x: position.x + 18 };
		}
	}

	return (
		<g>
			{link.cardinality ?
				<>
					<text {...getCardinalityProps(link.getSourcePort())} style={{ fill: ThemeColors.ON_SURFACE }}>
						{transformCardinality(link.cardinality.self)}
					</text>

					<text {...getCardinalityProps(link.getTargetPort())} style={{ fill: ThemeColors.ON_SURFACE }}>
						{isSelected || !multiLinkedTarget ? transformCardinality(link.cardinality.associate) : '...'}
					</text>
				</> :
				// <polygon
				// 	points={link.getArrowHeadPoints()}
				// 	fill={isSelected ? ThemeColors.SECONDARY : ThemeColors.PRIMARY}
				// />
				<></>
			}
			<path
				id={link.getID()}
				data-testid={link?.testId}
				d={link.getCurvePath()}
				cursor={'pointer'}
				fill={'none'}
				onMouseLeave={unselectPath}
				onMouseOver={selectPath}
				pointerEvents={'all'}
				stroke={linkColour}
				strokeWidth={1.5}
			/>
		</g>
	)
}

function transformCardinality(cardinality: string): string {
	cardinality = cardinality.replace('-', '..');
	cardinality = cardinality.replace('m', '*');
	return cardinality;
}
