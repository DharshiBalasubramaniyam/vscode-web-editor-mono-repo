
import { Typography } from "@dharshi/ui-toolkit";
import PullingModuleLoader from "./Loader";

import { css } from "@emotion/css";

export const useStyles = () => ({
    balModuleListWrap: css({
        marginTop: '16px',
        height: '80vh',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
    }),
    loaderWrapper: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    }),
    loaderTitle: css({
        marginTop: '16px'
    }),
    loaderSubtitle: css({
        marginTop: '8px'
    }),

});


export function PackageLoader() {
    const classes = useStyles();

    return (
        <div className={classes.loaderWrapper}>
            <PullingModuleLoader />
            <Typography variant="h3" className={classes.loaderTitle}>Pulling packages</Typography>
            <Typography variant="h4" className={classes.loaderSubtitle}>This might take some time</Typography>
        </div>
    );
}
