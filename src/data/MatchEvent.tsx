export enum MatchEventType
{
    OTHER,
    GOAL,
    ASSIST,
    MINUTES_PLAYED,
    CLEAN_SHEET,
    BONUS,
    YELLOW_CARD,
    RED_CARD,
    PENALTY_MISS,
    GOALS_CONCEDED,
    SAVES,
    PENALTY_SAVES,
    OWN_GOALS,
    AUTOSUB_IN,
    AUTOSUB_OUT
}

export interface MatchEvent
{
    dateTime: string;
    type: MatchEventType;
    typeString: string;
    footballerId: number;
    footballerName: string;
    pointDifference: number;
    number: number;
}
