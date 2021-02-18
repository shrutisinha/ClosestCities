export interface IPaginated {
    offset?: number;
    limit?: number;
}

export interface ILocation {
    lat: number;
    lon: number;
}

export interface ICity {
    id: string;
    name: string;
    location?: ILocation;
    countryName?: string;
    contId: string;
    iata?: string;
    rank: number;
    [key: string]: any;
}

export interface ICities {
    [key: string]: ICity;
}

export interface ICountryWise {
    [key: string]: ICity[]
}