import Picks from "../data/fpl/Picks";
import Pick from "../data/fpl/Pick";
import Live from "../data/fpl/Live";
import LiveElement from "../data/fpl/LiveElement";

export class Score {
    public startingScore: number = 0;
    public subScore: number = 0;
}

export default class ScoreCalculator {
    public static calculateElementScore(pick: Pick | undefined, liveElements: LiveElement[], sub?: boolean) {
        var score = 0;
        sub = !!sub;
        if (!pick || !liveElements) {
            return score;
        }

        var liveElements = liveElements.filter(el => el.id === pick.element);
        for (let liveElement of liveElements) {
            for (let gwExplain of liveElement.explain) {
                for (let explain of gwExplain.stats) {
                    score += explain.points * (sub ? 1 : pick.multiplier);
                }
            }
        }
        return score;
    }
    
    public static calculateTeamScore(picks?: Picks, live?: Live) {
        let score: Score = new Score();
        if (!picks || !picks.picks || !live) {
            return score;
        }

        return this.calculateTeamScoreFromElements(picks, live.elements);
    }

    public static calculateTeamScoreFromElements(picks: Picks | undefined, liveElements: LiveElement[]) {
        if (!picks) {
            return new Score();
        }

        const score = new Score();
        for (let i = 0; i < 15; i++) {
            const pick = picks.picks[i];
            if (i < 11 || picks.active_chip === "bboost") {
                score.startingScore += this.calculateElementScore(pick, liveElements, false);
            }
            else {
                score.subScore += this.calculateElementScore(pick, liveElements, true);
            }
        }
        
        score.startingScore -= picks != null && picks.entry_history != null ? picks.entry_history.event_transfers_cost : 0;
        return score;
    }
}