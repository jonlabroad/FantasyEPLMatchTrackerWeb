import { MatchEventType } from "../data/MatchEvent";

export default class MatchEventUtil {
    public static matchEventToString(eventType: MatchEventType) {
        switch (eventType) {
            case MatchEventType.ASSIST: return 'Assist';
            case MatchEventType.AUTOSUB_IN: return 'Subbed In';
            case MatchEventType.AUTOSUB_OUT: return 'Subbed Out';
            case MatchEventType.BONUS: return 'Bonus Points';
            case MatchEventType.CLEAN_SHEET: return 'Clean Sheet';
            case MatchEventType.GOAL: return 'Goal';
            case MatchEventType.GOALS_CONCEDED: return 'Goal Conceded';
            case MatchEventType.MINUTES_PLAYED: return 'Minutes Played';
            case MatchEventType.OTHER: return 'Other';
            case MatchEventType.OWN_GOALS: return 'Own Goal';
            case MatchEventType.PENALTY_MISS: return 'Penalty Miss';
            case MatchEventType.PENALTY_SAVES: return 'Penalty Save';
            case MatchEventType.RED_CARD: return 'Red Card';
            case MatchEventType.SAVES: return 'Saves';
            case MatchEventType.YELLOW_CARD: return 'Yellow Card';
        }
    }
}