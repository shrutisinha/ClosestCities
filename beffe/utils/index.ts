import Cities from "../repo/Cities";
import { ICities, ICity, ICountryWise, ILocation } from "./types";

export const getMockData = (): Promise<ICity[]> => {
    return new Promise((resolve, reject) => {
        try {
            const data = Cities.getData();
            resolve(data);
        } catch (e) {
            reject('Failed to fetch data: ' + e.toString());
        }
    });
}

export const getMockCountryWiseData = (): Promise<ICountryWise> => {
    return new Promise((resolve, reject) => {
        try {
            const data = Cities.getCountryWiseData();
            resolve(data);
        } catch (e) {
            reject('Failed to fetch data: ' + e.toString());
        }
    });
}

interface IDistance {
    distance: number;
    cityId: string;
}

export const findClosestCity = (cityId: string, cityLoc: ILocation | undefined, cities: ICities): ICity[] => {

    let distArr: IDistance[] = [];
    Object.values(cities).forEach(cityObj => distArr.push({
        cityId: cityObj.id,
        distance: geoDistance(cityLoc?.lat, cityLoc?.lon, cityObj.location?.lat, cityObj.location?.lon)
    }));
    distArr.sort(function (e1, e2) { return e1.distance - e2.distance; });

    const closest: ICity[] = distArr.splice(0, 5)
        .map(city => city.cityId)
        .map(id => cities.hasOwnProperty(id) ? cities[id] : null)
        .filter(city => city) as ICity[];

    return closest;
}

const geoDistance = (lat1: number = 0, lon1: number = 0, lat2: number = 0, lon2: number = 0): number => {
    // Haversine Formula 
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;

    let dist = Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.pow(Math.sin(dlon / 2), 2);

    dist = 2 * Math.asin(Math.sqrt(dist));

    // Radius of Earth in  
    // Kilometers, R = 6371 
    // Use R = 3956 for miles 
    const R = 6371;

    // Calculate the result 
    dist = dist * R;

    return dist;
}