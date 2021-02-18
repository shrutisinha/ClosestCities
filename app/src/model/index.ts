export interface ILocation {
    lat: string;
    lon: string;
}

export interface ICity {
    id: string;
    name: string;
    location?: ILocation;
    countryName?: string;
    iata?: string;
    rank?: number;
    [key: string]: any;
}

export interface ICities {
    [key: string]: ICity;
}