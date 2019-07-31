import { MappedFixtures } from "../data/MappedFixtures";
import { Fixtures } from "../data/fpl/Fixtures";

export default class FixturesHelper {
    public static getFixtures(eventId: number, mappedFixtures?: MappedFixtures): Fixtures | undefined {
        return mappedFixtures ? mappedFixtures[eventId] : undefined;
    }
}