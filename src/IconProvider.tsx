export default class IconProvider {
    protected static icons : any = {
        minutes: "031-player-1.svg",
        minutes_played: "031-player-1.svg",
        minutes_60: "033-circle.svg",
        goal: "036-ball.svg",
        goals_scored: "036-ball.svg",
        bonus: "018-favorite-2.svg",
        clean_sheet: "016-short-broom.svg",
        clean_sheets: "016-short-broom.svg",
        assist: "034-sport.svg",
        assists: "034-sport.svg",
        yellow_card: "038-red-card.svg",
        yellow_cards: "038-red-card.svg",
        red_card: "037-hand.svg",
        red_cards: "037-hand.svg",
        penalty_missed: "013-goal.svg",
        penalties_missed: "013-goal.svg",
        goals_conceded: "027-game.svg",
        goal_conceded: "027-game.svg",
        saves: "025-sports.svg",
        penalties_saved: "026-people-1.svg",
        own_goals: "002-knock-down.svg",
        own_goal: "002-knock-down.svg"
    }

    public static getIcon(explainType : string) : string {
        var explain = explainType.toLowerCase();
        var icon = this.icons[explain];
        if (!icon) {
            console.log(explain.slice(0, explain.length - 1));
            icon = this.icons[explain.slice(0, explain.length - 1)];
        }
        return icon;
    }
}