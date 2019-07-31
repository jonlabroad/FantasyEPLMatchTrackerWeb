import ScoreExplain from "./ScoreExplain";

export default interface FootballerScoreDetailElement {
    minutes: ScoreExplain;
    goals_scored: ScoreExplain;
    bonus: ScoreExplain;
    clean_sheets: ScoreExplain;
    assists: ScoreExplain;
    yellow_cards: ScoreExplain;
    red_cards: ScoreExplain;
    penalties_missed: ScoreExplain;
    goals_conceded: ScoreExplain;
    saves: ScoreExplain;
    penalties_saved: ScoreExplain;
    own_goals: ScoreExplain;
}
