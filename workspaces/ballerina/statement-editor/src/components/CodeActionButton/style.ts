import { css } from "@emotion/css";

export const useStyles = () => ({
  container: css({
    userSelect: "none",
    pointerEvents: "auto",
    marginRight: '6px'
  }),
  itemContainer: css({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    color: 'var(--vscode-inputOption-activeForeground)'
  })
});
