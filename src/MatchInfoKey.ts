import CacheKey from "./CacheKey"

export default class MatchInfoKey extends CacheKey {
    public gameweek : Number;
    public team : Number;
    public isCup : Boolean;
    public leagueId : Number;
    public seasonStartYear : Number;
    public isScouting : boolean = false;

    constructor(seasonStartYear : number, leagueId : Number, gameweek : Number, team : Number, isCup : Boolean, isScouting : boolean) {
        super();
        this.leagueId = leagueId;
        this.gameweek = gameweek;
        this.team = team;
        this.isCup = isCup;
        this.seasonStartYear = seasonStartYear;
    }

    public hash(): string {
        return this.gameweek.toString() + "_" + this.team.toString();
    }
    public path(): string {
        var filename = this.isScouting ? "ScoutReport" : "MatchInfo";
        if (!this.isCup) {
            return `Season${this.seasonStartYear}/${this.leagueId}/${this.team}/${this.gameweek}/${filename}`
        }
        return `Season${this.seasonStartYear}/cup/${this.team}/${this.gameweek}/${filename}`
    }  
}