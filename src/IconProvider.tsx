export default class IconProvider {
    protected static icons : any = {
        minutes: "031-player-1.svg",
        minutes_60: "033-circle.svg",
        goals_scored: "036-ball.svg",
        bonus: "018-favorite-2.svg",
        clean_sheets: "016-short-broom.svg",
        assists: "034-sport.svg",
        yellow_cards: "038-red-card.svg",
        red_cards: "037-hand.svg",
        penalties_missed: "013-goal.svg",
        goals_conceded: "027-game.svg",
        saves: "025-sports.svg",
        penalties_saved: "026-people-1.svg",
        own_goals: "002-knock-down.svg"
    }

    public static getIcon(explainType : string) : string {
        return this.icons[explainType];
    }
}