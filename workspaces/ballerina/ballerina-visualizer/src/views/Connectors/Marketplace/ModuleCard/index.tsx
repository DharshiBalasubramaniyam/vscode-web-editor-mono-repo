
import { ModuleIcon } from "@dharshi/ballerina-low-code-diagram";

import useStyles from "./style";
import { BallerinaConstruct } from "@dharshi/ballerina-core";
import { Tooltip } from "@dharshi/ui-toolkit";

export interface ModuleCardProps {
    onSelectModule: (balModule: BallerinaConstruct) => void;
    module: BallerinaConstruct;
    columns?: number;
}
export const MAX_COLUMN_WIDTH = '155px';

function ModuleCard(this: any, props: ModuleCardProps) {
    const classes = useStyles();
    const { module, columns, onSelectModule } = props;
    const moduleName = (module.displayAnnotation?.label || `${module.package?.name} / ${module.name}`).replace(/["']/g, "");
    console.log("adding module: ", moduleName)
    return (
        <div className={classes.balModule} onClick={onSelectModule.bind(this, module)}>
            <div>
                <ModuleIcon module={module} scale={0.9} />
            </div>
            <Tooltip content={`${module.package?.organization} / ${module.moduleName} : ${module.package?.version}`}>
                <div className={classes.balModuleName}>{moduleName}</div>
            </Tooltip>
            <div className={classes.orgName}>by {module.package.organization}</div>
        </div>
    );
}

export default ModuleCard;
