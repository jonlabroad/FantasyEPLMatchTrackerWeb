export class MatchInfoKey {
    public gameweek : number;
    public teamId : number;

    constructor(teamId : number, gameweek : number) {
        this.teamId = teamId;
        this.gameweek = gameweek;
    }

    public hash() : string {
        return `${this.gameweek} ${this.teamId}`;
    }
}

export default class MatchInfoCache {
    protected cache : { [key: string]: any; } = {};

    public get(teamId : number, gameweek : number) : any {
        var key = new MatchInfoKey(teamId, gameweek);    
        return this.cache[key.hash()];
    }

    public update(teamId : number, gameweek : number, matchInfo : any) {
        var key = new MatchInfoKey(teamId, gameweek);
        this.cache[key.hash()] = matchInfo;
    }
}