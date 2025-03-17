// tslint:disable: jsx-no-multiline-js
import React, { useMemo } from 'react';

import { Breadcrumbs, Codicon } from '@dharshi/ui-toolkit';
import { css } from '@emotion/css';
import { View } from "../Views/DataMapperView";
import { extractLastPartFromLabel } from './utils';

const useStyles = () => {
    const baseStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };

    return {
        baseStyle,
        active: css({
            ...baseStyle,
            cursor: "default",
            lineHeight: "unset",
            color: "inherit",
        }),
        link: css({
            ...baseStyle,
            cursor: "pointer",
            color: "inherit",
            "&:hover": {
                color: "inherit"
            },
        })
    };
};

export interface HeaderBreadcrumbProps {
    views: View[];
    switchView: (index: number) => void;
}

export default function HeaderBreadcrumb(props: HeaderBreadcrumbProps) {
    const { views, switchView } = props;
    const classes = useStyles();

    const [activeLink, links] = useMemo(() => {
        if (views) {
            const focusedView = views[views.length - 1];
            const otherViews = views.slice(0, -1);
            let isFnDef = views.length === 1;
            let label = extractLastPartFromLabel(focusedView.label);

            const selectedLink = (
                <div className={classes.active}>
                    {isFnDef ? label : 'Map'}
                </div>
            );

            const restLinks = otherViews.length > 0 && (
                otherViews.map((view, index) => {
                    label = view.label;
                    isFnDef = index === 0;
                    return (
                        <a
                            data-index={index}
                            key={index}
                            onClick={handleClick}
                            className={classes.link}
                            data-testid={`dm-header-breadcrumb-${index}`}
                        >
                            {isFnDef ? label : 'Map'}
                        </a>
                    );
                })
            );

            return [selectedLink, restLinks];
        }
        return [undefined, undefined];
    }, [views]);

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        const index: number = +event.currentTarget.getAttribute('data-index');
        switchView(index);
    }

    return (
        <Breadcrumbs
            maxItems={3}
            separator={<Codicon name="chevron-right" />}
            sx={{ width: '82%' }}
        >
            {links}
            {activeLink}
        </Breadcrumbs>
    );
}
