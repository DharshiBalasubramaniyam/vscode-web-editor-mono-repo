// tslint:disable: no-var-requires
import * as React from 'react';

import { css, Global } from '@emotion/react';
import styled, {StyledComponent} from '@emotion/styled';

export const Container: StyledComponent<{
	hidden: boolean;
  }, {}, {}> = styled.div`
	// should take up full height minus the height of the header
	height: calc(100% - 50px);
	background-image: radial-gradient(circle at 0.5px 0.5px, var(--vscode-textBlockQuote-border) 1px, transparent 0);
  	background-size: 8px 8px;
	background-color: var(--vscode-input-background);
	display: ${(props: { hidden: any; }) => (props.hidden ? 'none' : 'flex')};
	font-weight: 400;
	> * {
		height: 100%;
		min-height: 100%;
		width: 100%;
	}
`;

export const Expand = css`
	html,
	body,
	#root {
		height: 100%;
	}
`;


export class DataMapperCanvasContainerWidget extends React.Component<{ hideCanvas: boolean }> {
	render() {
		return (
			<>
				<Global styles={Expand} />
				<Container hidden={this.props.hideCanvas}>
					{this.props.children}
				</Container>
			</>
		);
	}
}
