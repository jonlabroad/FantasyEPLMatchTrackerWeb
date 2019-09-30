import CacheData, { CacheExpiryType } from "../data/CacheData";
import moment from "moment";
import GlobalConfig from "../config/GlobalConfig";

export default class CacheHelper {
    public static getCached<T>(key: string): T | null {
        return this.getLocalStorage(key);
    }

    public static setCache<T>(key: string, type: CacheExpiryType, data: T) {
        const timestamp = moment();
        const cacheData: CacheData<T> = {
            data: data,
            cacheType: type,
            timestamp: timestamp.valueOf(),
            version: GlobalConfig.CacheVersion
        };
        window.localStorage.setItem(key, JSON.stringify(cacheData));
    }

    public static getLocalStorage<T>(key: string): T | null {
        const item: string | null = window.localStorage.getItem(key);
        if (item) {
            var itemParsed: CacheData<T> = JSON.parse(item);
            if (!this.isStale(itemParsed)) {
                return itemParsed.data ? itemParsed.data : null;
            }
        }

        return null;
    }

    public static isStale<T>(data: CacheData<T>) {
        if (data.version !== GlobalConfig.CacheVersion) {
            return true;
        }

        var timestamp = moment(data.timestamp);
        var now = moment();
        
        if (data.cacheType === CacheExpiryType.DAILY) {
            return now.dayOfYear() !== timestamp.dayOfYear();
        }
        else {
            console.error(`CANNOT HANDLE CACHE EXPIRY TYPE ${data.cacheType} YET`);
        }

        return true;
    }
}