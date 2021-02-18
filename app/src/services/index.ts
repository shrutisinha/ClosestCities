import { AxiosResponse } from 'axios';
import { setup } from 'axios-cache-adapter'
import { ICity } from '../../../beffe/utils/types';
import { PROPERTIES } from '../../config/properties'

// Create `axios` instance with pre-configured `axios-cache-adapter` attached to it
const api = setup({
    // `axios` options
    baseURL: PROPERTIES.BEFFE_URL,

    // `axios-cache-adapter` options
    cache: {
        maxAge: 15 * 60 * 1000,
    }
})
export const getCity = (name: string, noCache = true): Promise<AxiosResponse<ICity>> => {
    return api.get('/city/' + name, {
        clearCacheEntry: noCache
    })
};

export const searchCity = (name: string, noCache = true): Promise<AxiosResponse<ICity[]>> => {
    return api.get('/search/' + name, {
        clearCacheEntry: noCache
    })
};

export const listNeighbours = (name: string, noCache = true): Promise<AxiosResponse<ICity[]>> => {
    return api.get('/neighbours/' + name, {
        clearCacheEntry: noCache
    })
};