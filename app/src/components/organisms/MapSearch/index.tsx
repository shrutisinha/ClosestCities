import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
    Box,
} from '@material-ui/core';
import SearchBar from '../../molecules/SearchBar';
import MapBox from '../../molecules/MapBox';
import { useMapSearch } from './hook';

const useStyles = makeStyles((theme) =>
    createStyles({

    }),
);

interface IMapSearch {
}

const MapSearch: React.FC<IMapSearch> = () => {
    const classes = useStyles();

    const {
        search,
        handleSearch,
        city,
        handleCitySelect,
        getClosestCities,
        citySuggestions,
        neighbours,
        selectedLocation
    } = useMapSearch();

    return (
        <Box
            display="flex"
            flexDirection="column"
            p={7.5}
        >
            <SearchBar
                disabled={Boolean(!citySuggestions)}
                handleSelect={handleCitySelect}
                handleClick={getClosestCities}
                suggestions={citySuggestions || []}
                search={search}
                handleSearch={(v)=>handleSearch(v)}
            />
            <MapBox
                neighbours={neighbours}
                selected={selectedLocation}
            />
        </Box>
    );
};

export default MapSearch;
