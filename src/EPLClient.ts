export default class EPLClient {
    private static URL_BASE = "https://s3.amazonaws.com/fantasyeplmatchtracker/data/31187/api";
    private static STANDINGS_BASE = "leagues-h2h-standings";

    constructor() {
    }

    public readLeagueStandings(leagueId : number, successFunc : Function) {
        var link = this.getLeagueStandingsUrl(leagueId);
        return $.ajax({
          url: link,
          type: "GET",
          dataType: "json",
          success: function (data) {
            successFunc(data);
          }
        });
    }

    public readTeamData(leagueId : number, teamId : number, gameweek : number, isCup : boolean, successFunc : Function) {
        var link = this.getMatchInfoUrl(leagueId, teamId, gameweek, isCup);
        return $.ajax({
          url: link,
          type: "GET",
          dataType: "json",
          success: function (data) {
            successFunc(data);
          }
        });		
      }

    protected getLeagueStandingsUrl(leagueId : number) : any {
        return `${EPLClient.URL_BASE}/${EPLClient.STANDINGS_BASE}`;
    }

    protected getMatchInfoUrl(leagueId : number, teamId : number, gameweek : number, isCup : boolean) : string {
        var root = 'https://s3.amazonaws.com/fantasyeplmatchtracker/data';
        if (!isCup) {
          return `${root}/${leagueId}/${teamId}/${gameweek}/MatchInfo`
        }
        return `${root}/cup/${teamId}/${gameweek}/MatchInfo`
      }    
}