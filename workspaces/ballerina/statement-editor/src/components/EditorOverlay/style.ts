import { css } from "@emotion/css";

export const useStyles = () => ({
	title: css({
		fontWeight: 600,
		fontSize: "17px",
		lineHeight: "24px",
		marginTop: "28px",
		marginBottom: "4px",
		color: 'var(--vscode-editor-foreground)'
	}),
	subtitle: css({
		fontWeight: 400,
		fontSize: "13px",
		lineHeight: "20px",
		color: 'var(--vscode-descriptionForeground)'
	})
});
