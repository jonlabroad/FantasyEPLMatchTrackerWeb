import CacheKey from "./CacheKey"

export default class MatchInfoKey extends CacheKey {
    public gameweek : Number;
    public team : Number;
    public isCup : Boolean;
    public leagueId : Number;

    constructor(leagueId : Number, gameweek : Number, team : Number, isCup : Boolean) {
        super();
        this.leagueId = leagueId;
        this.gameweek = gameweek;
        this.team = team;
        this.isCup = isCup;
    }

    public hash(): string {
        return this.gameweek.toString() + "_" + this.team.toString();
    }
    public path(): string {
        if (!this.isCup) {
            return `${this.leagueId}/${this.team}/${this.gameweek}/MatchInfo`
        }
        return `cup/${this.team}/${this.gameweek}/MatchInfo`
    }  
}