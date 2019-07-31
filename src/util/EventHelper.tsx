export default class EventHelper {
    public static getEvent(gameweek: number, eventData: {[key: number]: Event}): Event | undefined {
        return eventData ? eventData[gameweek - 1] : undefined;
    }
}