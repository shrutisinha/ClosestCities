// import fs from 'fs';
// import { PROPERTIES } from '../config/properties';

import Cities from "../repo/Cities";
import { ICity, ICountryWise, ILocation } from "./types";

export const getMockData = (): Promise<ICity[]> => {
    return new Promise((resolve, reject) => {
        try {
            // const data = JSON.parse(
            //     fs.readFileSync(
            //         PROPERTIES.DATA_PATH,
            //         'utf-8'
            //     )
            // );
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

export const findClosestCity = (cityId: string, cityLoc: ILocation | undefined, cities: ICity[]): ICity[] => {

    return cities.splice(0, 5)
}