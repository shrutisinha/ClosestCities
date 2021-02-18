import React from "react";
import { ILocation } from "../../../../../beffe/utils/types";
import { getCity, listNeighbours, searchCity } from "../../../services";
import { ICity, ILocName } from "../../../types";

//IMPROVEMENT: handle error cases
export const useMapSearch = () => {
    const [search, setSearch] = React.useState('');
    const [city, setCity] = React.useState<ICity>();
    const [citySuggestions, setCitySuggestions] = React.useState<ICity[]>();
    const [allCities, setAllCitiess] = React.useState<ICity[]>();
    const [neighbours, setNeighbours] = React.useState<ILocName[]>([]);
    const [selectedLocation, setSelectedLocation] = React.useState<ILocName>();
    const [listNeighboursFlag, setListNeighboursFlag] = React.useState(false);

    React.useEffect(() => {
        if (!citySuggestions) {
            searchCity('')
                .then(res => {
                    setCitySuggestions(res.data);
                    setAllCitiess(res.data);
                })
        }
    }, [citySuggestions]);

    React.useEffect(() => {
        if (allCities && search) {

            const filteredData: ICity[] = allCities
                .filter((city => city.name.substr(0, search.length).toLowerCase() == search.toLowerCase()))
                .sort((a, b) => {
                    if (a.rank >= b.rank) {
                        return 1;
                    } else {
                        return -1;
                    }
                });

            setCitySuggestions(filteredData);
        }
    }, [search]);

    React.useEffect(() => {

        if (city && listNeighboursFlag) {

            setListNeighboursFlag(false);
            listNeighbours(city.id)
                .then(res => {
                    if (res) {
                        const locs: ILocName[] = res.data
                            .map(neighbour => {
                                if (neighbour && neighbour.location) {
                                    return {
                                        lat: neighbour.location.lat,
                                        lon: neighbour.location.lon,
                                        name: neighbour.name
                                    }
                                } else {
                                    return null
                                }
                            })
                            .filter(loc => loc) as ILocName[];
                        setNeighbours(locs);
                    }
                });
        }
    }, [city, listNeighboursFlag]);

    const getClosestCities = (city: ICity) => {
        //api call
        setListNeighboursFlag(true)
    }

    const handleCitySelect = (e) => {
        setCity(e);
        console.log(e)

        getCity(e.id)
            .then(res => {
                if (res && res.data && res.data.location) {
                    const loc = res.data.location;
                    setSelectedLocation({
                        ...loc,
                        name: res.data.name
                    })
                }
            });
    }

    return {
        search,
        handleSearch: setSearch,
        getClosestCities,
        citySuggestions,
        city,
        handleCitySelect,
        selectedLocation,
        neighbours
    };
}