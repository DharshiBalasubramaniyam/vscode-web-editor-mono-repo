// tslint:disable: jsx-no-multiline-js
import React, { useEffect, useMemo, useState } from "react";
import { NavButtonGroup } from "./NavButtonGroup";
import styled from "@emotion/styled";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { HistoryEntry, MACHINE_VIEW } from "@dharshi/ballerina-core";
import { Breadcrumbs, Codicon, Typography } from "@dharshi/ui-toolkit";

interface NavigationBarProps {
    showHome?: boolean
}

const NavigationContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const FnNavContainer = styled.div`
    margin-left: 7px;
`;

export function NavigationBar(props: NavigationBarProps) {

    const { rpcClient } = useRpcContext();
    const [history, setHistory] = useState<HistoryEntry[]>();

    useEffect(() => {
        rpcClient.getVisualizerRpcClient().getHistory().then(history => setHistory(history));
    }, []);

    const fromDataMapper = history && history.length > 0 && history[history.length - 1].location.view === MACHINE_VIEW.DataMapper;

    const [activeLink, links] = useMemo(() => {
        if (fromDataMapper && history[history.length - 1].dataMapperDepth < history.length) {

            const currentEntry = history[history.length - 1];
            const startIndex = history.length - 1 - currentEntry.dataMapperDepth;
            let label = currentEntry?.location.identifier;
            const selectedLink = (
                <Typography variant="body2">{label}</Typography>
            );
            const restLinks: JSX.Element[] = [];

            if (currentEntry.dataMapperDepth > 0) {
                history.slice(startIndex, history.length - 1).forEach((node, index) => {
                    const handleClick = () => {
                        rpcClient.getVisualizerRpcClient().goSelected(startIndex + index);
                    }
                    label = node?.location.identifier;
                    restLinks.push(
                        <a
                            data-index={index}
                            key={index}
                            onClick={handleClick}
                            data-testid={`dm-header-breadcrumb-${index}`}
                        >
                            <Typography variant="body2">{label}</Typography>
                        </a>
                    );
                })
            }

            return [selectedLink, restLinks];
        }
        return [undefined, undefined];
    }, [history, fromDataMapper]);

    return (
        <NavigationContainer id="nav-bar-main">
            <NavButtonGroup historyStack={history} showHome={props.showHome} />
            {fromDataMapper && (
                <FnNavContainer>
                    <Breadcrumbs
                        maxItems={3}
                        separator={<Codicon name="chevron-right" />}
                    >
                        {links}
                        {activeLink}
                    </Breadcrumbs>
                </FnNavContainer>
            )}
        </NavigationContainer>
    );
}
