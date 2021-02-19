import fs from 'fs';
import fetch from 'node-fetch';
import { type } from 'os';
import { findClosestCity, getMockCountryWiseData, getMockData } from '../../utils';
import { ICities, ICity, IPaginated } from '../../utils/types';

export function getCities() {
    return getMockData();
}

export function getCity(req: any): Promise<ICity> {
    const id: string = req.id || '';
    return new Promise((resolve, reject) => {
        getMockData()
            .then((res: ICity[]) => {
                const index = res
                    .findIndex(city => city.id == id);
                //Check if works without equating to zero
                if (index >= 0 || index === 0)
                    resolve(res[index]);
                else reject('City not found')
            })
            .catch((e: any) => {
                reject(e);
            })
    });
}

//returns list of cities ordered by rank
export async function filterCities(reqParam: any, body: IPaginated): Promise<ICity[]> {
    const filter: string = reqParam.name || '';
    //IMPROVEMENT: PAGINATION
    const limit = body.limit || 20;
    const offset = body.offset || 0;
    return new Promise((resolve, reject) => {
        getMockData()
            .then((res: ICity[]) => {
                const filteredData: any[] = res
                    .filter(city => city && city.name.substr(0, filter.length).toLowerCase() == filter.toLowerCase())
                    .sort((a, b) => {
                        if (a.rank >= b.rank) {
                            return 1;
                        } else {
                            return -1;
                        }
                    })
                    .map((city) => ({
                        id: city.id,
                        name: city.name
                    }));
                resolve(filteredData);
            })
            .catch((e: any) => {
                reject(e);
            })
    });
}

export async function findClosestCities(req: any): Promise<ICity[]> {
    return new Promise((resolve, reject) => {
        if (!req.id) {
            reject('City id invalid');
        }

        const reqId: string = req.id || '';
        getMockData()
            .then((res: ICity[]) => {

                const selectedCity: any = res
                    .find(key => key.id == reqId);

                if (!selectedCity) {
                    reject("City not found");
                    return
                }
                const selectedCountry = selectedCity.contId;
                if (selectedCity.location) {
                    getMockCountryWiseData()
                        .then(data => {
                            const countryData: ICities = data.hasOwnProperty(selectedCountry) && data[selectedCountry] || {};
                            const closestCities = findClosestCity(selectedCity.id, selectedCity.location, countryData);
                            resolve(closestCities);
                        })
                        .catch((e: any) => {
                            reject(e);
                        })
                } else {
                    reject("City location not defined");
                }
                // resolve([selectedCity]);
            })
            .catch((e: any) => {
                reject(e);
            })
    });
}

