import _ from 'lodash';
import citiesData from '../../mockData/cities.json';
import { ICities, ICity, ICountryWise } from '../../utils/types';
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
            Object.entries(citiesData).forEach(each => {
                const contId = each[1].contId;
                if (countryData.hasOwnProperty(contId)) {
                    countryData[contId][each[0]] = each[1];
                } else {
                    const eachObj: ICities = {};
                    eachObj[each[0]]=each[1];
                    countryData[contId] = eachObj;
                }
            });
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