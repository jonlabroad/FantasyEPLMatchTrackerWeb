export enum CacheExpiryType {
    DAILY,
    GAMEWEEK,
    NOCACHE
}

export default interface CacheData<T> {
    data?: T;
    timestamp: number;
    cacheType: CacheExpiryType;
    version: number;
}