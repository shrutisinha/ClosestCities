import fs from 'fs';
import fetch from 'node-fetch';
import { PROPERTIES } from '../../config/properties';
import { getMockData } from '../../utils';
import { IParam } from '../../utils/types';

export async function getCities1() {
    return new Promise((resolve, reject) => {
        fetch(
            PROPERTIES.DATA_URL,
            {
                method: 'GET',
            }
        )
            .then(res => res.json())
            .then(res => {
                resolve(res);
            })
            .catch(e => {
                reject(e.toString());
            });
    })
}

export function getCities() {
    return getMockData(PROPERTIES.DATA_PATH);
}

export function getCity(req: IParam) {
    const name: string = req.name || '';
    return new Promise((resolve, reject) => {
        getMockData(PROPERTIES.DATA_PATH)
            .then((res: any) => {
                const cityName = Object.keys(res)
                    .find(key => key.toLowerCase() == name.toLowerCase());
                if (cityName)
                    resolve(res[cityName]);
                else reject('City not found')
            })
            .catch((e: any) => {
                reject(e);
            })
    });
}

export async function filterCities(req: IParam) {
    const filter: string = req.name || '';
    return new Promise((resolve, reject) => {
        getMockData(PROPERTIES.DATA_PATH)
            .then((res: any) => {
                const filteredData: any[] = Object.keys(res)
                    .filter(key => res[key] && res[key].name.substr(0, filter.length).toLowerCase() == filter.toLowerCase())
                    .sort((a, b) => {
                        if(res[a].rank >= res[b].rank) {
                          return 1;
                        } else {
                          return -1;
                        }
                      })
                    .map((key) => ({
                        id: key,
                        name: res[key].name
                    }));
                resolve(filteredData);
            })
            .catch((e: any) => {
                reject(e);
            })
    });
}

export async function findClosestCities(req: IParam) {
    return new Promise((resolve, reject) => {
        if (!req.name) {
            reject('City name invalid');
        }

        const reqName: string = req.name || '';
        getMockData(PROPERTIES.DATA_PATH)
            .then((res: any) => {
                const selectedCityName: any = Object.keys(res)
                    .find(key => key.toLowerCase() == reqName.toLowerCase());
                const selectedCity = res[selectedCityName];
                resolve([selectedCity]);
            })
            .catch((e: any) => {
                reject(e);
            })
    });
}

