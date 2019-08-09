import Live from "../data/fpl/Live";
import { TrackerData } from "../types";
import LiveElement from "../data/fpl/LiveElement";

export default class LiveHelper {
    public static getLive(gameweek: number, data?: {[key: number]: Live}): Live | undefined {
        return data ? data[gameweek] : undefined;
    }

    public static getElement(elementId: number, live?: Live): LiveElement | undefined {
        if (live) {
            return live.elements.find(el => el.id === elementId);
        }
        return undefined;
    }
}