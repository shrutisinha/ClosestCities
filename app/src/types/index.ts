export interface ILocation {
    lat: number;
    lon: number;
}

export interface ICity {
    id: string;
    name: string;
    location?: ILocation;
    countryName?: string;
    iata?: string;
    rank: number;
    [key: string]: any;
}

export interface ILocName extends ILocation {
    name: string;
}
