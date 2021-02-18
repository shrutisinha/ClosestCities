import _ from 'lodash';
import citiesData from '../../mockData/cities.json';
import { ICity, ICountryWise } from '../../utils/types';
class Cities {
    private static instance: Cities;
    private data: ICity[];
    private countryWiseData: ICountryWise;

    constructor(data: ICity[], countryWiseData: ICountryWise) {
        this.data = data;
        this.countryWiseData = countryWiseData;
    }

    public static getInstance(): Cities {
        if (!Cities.instance) {
            const data: ICity[] = Object.values(citiesData);
            const countryData: ICountryWise = {};
            for (let i = 0; i < data.length; i++) {
                const contId = data[i].contId;
                if(countryData.hasOwnProperty(contId)){
                    countryData[contId].push(data[i])
                } else {
                    countryData[contId] = [data[i]];
                }
            }
            Cities.instance = new Cities(data, countryData);
        }

        return Cities.instance;
    }

    public getData() {
        return _.cloneDeep(this.data);
    }

    public getCountryWiseData() {
        return _.cloneDeep(this.countryWiseData);
    }

}
export default Cities.getInstance();