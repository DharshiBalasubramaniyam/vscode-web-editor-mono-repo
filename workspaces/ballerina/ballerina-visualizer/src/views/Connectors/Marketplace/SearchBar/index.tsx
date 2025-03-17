// tslint:disable: jsx-no-multiline-js
import React, { useEffect, useState } from "react";

import debounce from "lodash.debounce";

import { SearchBox } from "@dharshi/ui-toolkit";

export interface SearchBarProps {
    searchQuery: string;
    onSearch: (query: string) => void;
    type: string;
}

const DEBOUNCE_DELAY = 1000;

function SearchBar(props: SearchBarProps) {
    const { onSearch, searchQuery } = props;

    const [query, setQuery] = useState(searchQuery);

    const debouncedQueryChanged = debounce(onSearch, DEBOUNCE_DELAY);

    useEffect(() => {
        debouncedQueryChanged(query);
        return () => debouncedQueryChanged.cancel();
    }, [query]);

    const onQueryChanged = (val: string) => {
        setQuery(val);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSearchPress();
        }
    };

    const onSearchPress = () => {
        debouncedQueryChanged.cancel();
        onSearch(query);
    };

    return (
        <div style={{
            height: '40px',
            padding: '16px',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <SearchBox
                placeholder={"Search for " + props.type}
                onChange={(val: string) => onQueryChanged(val)}
                value={query}
                iconPosition="end"
                aria-label="search-for-connectors"
                data-testid="search-input"
                sx={{ width: '100%' }}
            />
        </div>

    );
}

export default SearchBar;
