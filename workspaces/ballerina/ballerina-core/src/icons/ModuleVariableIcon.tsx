import React from 'react';

export interface ModuleVariableIconProps {
    className?: string
}

export default function ModuleVariableIcon(props: ModuleVariableIconProps) {
    return (
        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" className={props?.className ? props.className : "sub-menu-dark-fill"}>
            <g id="module-var-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="module-var-icon-body" className="svg-sub-menu-plus-option-icon" transform="translate(-907.000000, -208.000000)" fill-rule="nonzero">
                    <path d="M913.601252,208.340534 C914.4668,207.886489 915.5332,207.886489 916.398748,208.340534 L916.398748,208.340534 L921.601252,211.069643 C922.4668,211.523688 923,212.3628 923,213.270892 L923,213.270892 L923,218.729108 C923,219.6372 922.4668,220.476312 921.601252,220.930357 L921.601252,220.930357 L916.398748,223.659466 C915.5332,224.113511 914.4668,224.113511 913.601252,223.659466 L913.601252,223.659466 L908.398748,220.930357 C907.5332,220.476312 907,219.6372 907,218.729108 L907,218.729108 L907,213.270892 C907,212.3628 907.5332,211.523688 908.398748,211.069643 L908.398748,211.069643 Z M915.71257,209.420393 C915.27163,209.189086 914.72837,209.189086 914.28743,209.420393 L914.28743,209.420393 L909.084927,212.149501 C908.643987,212.380807 908.372357,212.808279 908.372357,213.270892 L908.372357,213.270892 L908.372357,218.729108 C908.372357,219.191721 908.643987,219.619193 909.084927,219.850499 L909.084927,219.850499 L914.28743,222.579607 C914.72837,222.810914 915.27163,222.810914 915.71257,222.579607 L915.71257,222.579607 L920.915073,219.850499 C921.356013,219.619193 921.627643,219.191721 921.627643,218.729108 L921.627643,218.729108 L921.627643,213.270892 C921.627643,212.808279 921.356013,212.380807 920.915073,212.149501 L920.915073,212.149501 Z M919.47912,213.932677 C919.560125,214.108185 919.503217,214.312075 919.353352,214.422325 L919.283563,214.463486 L915.4,216.255 L915.4,219.54357 C915.4,219.764484 915.220914,219.94357 915,219.94357 C914.8067,219.94357 914.645425,219.806457 914.608127,219.624184 L914.6,219.54357 L914.6,216.252 L910.882861,214.477689 C910.683501,214.382513 910.599043,214.143744 910.69422,213.944384 C910.777499,213.769944 910.970716,213.683476 911.151275,213.728345 L911.227525,213.755742 L915.002,215.558 L918.948312,213.73712 C919.148892,213.644543 919.386543,213.732097 919.47912,213.932677 Z" id="module-variable" />
                </g>
            </g>
        </svg>
    )
}
