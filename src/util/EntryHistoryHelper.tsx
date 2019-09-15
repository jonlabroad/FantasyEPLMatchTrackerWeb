import EntryHistory, { MappedEntryHistory } from "../data/fpl/EntryHistory";

export default class EntryHistoryHelper {
    public static getHistory(entryId: number, allHistory: MappedEntryHistory): EntryHistory {
        const history = allHistory[entryId];
        return history;
    }
}