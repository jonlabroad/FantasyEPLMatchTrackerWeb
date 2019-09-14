import Picks from "../data/fpl/Picks";

export default class DifferentialsFinder {
    static isDifferential(elementId: number, picks1?: Picks, picks2?: Picks): Boolean {
        if (!picks1 || !picks2) {
            return true;
        }
        var starting1 = picks1.picks.slice(0, 11);
        var starting2 = picks2.picks.slice(0, 11);
        
        var element1 = starting1.find(p => p.element === elementId);
        var element2 = starting2.find(p => p.element === elementId);

        if (!element1 || !element2) {
            return true;
        }

        return !(element1.multiplier === element2.multiplier);
    }
}