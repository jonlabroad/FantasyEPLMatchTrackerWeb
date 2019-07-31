import Picks from "../data/fpl/Picks";
import Pick from "../data/fpl/Pick";
import Live from "../data/fpl/Live";

export class Score {
    public startingScore: number = 0;
    public subScore: number = 0;
}

export default class ScoreCalculator {
    public static calculateElementScore(pick?: Pick, live?: Live) {
        var score = 0;
        if (!pick || !live) {
            return score;
        }

        var liveElements = live.elements[pick.element];
        if (liveElements) {
            for (let gwExplain of liveElements.explain) {
                for (let explain of gwExplain) {
                    for (let key of Object.keys(explain)) {
                        score += explain[key].points * pick.multiplier;
                    }
                }
            }
        }
        else {
            console.log(`ScoreCalculator:Element ${pick.element} has no Live data!`);
        }
        return score;
    }
    
    public static calculateTeamScore(picks?: Picks, live?: Live) {
        let score: Score = new Score();
        if (!picks || !live) {
            return score;
        }

        for (let i = 0; i < 11; i++) {
            const pick = picks.picks[i];
            score.startingScore += this.calculateElementScore(pick, live);
        }
        
        for (let i = 11; i < 15; i++) {
            const pick = picks.picks[i];
            score.subScore += this.calculateElementScore(pick, live);
        }
        score.startingScore -= picks != null && picks.entry_history != null ? picks.entry_history.event_transfers_cost : 0;
        return score;
    }
}