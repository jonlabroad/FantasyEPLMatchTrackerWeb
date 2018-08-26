import CachedS3JsonReader from "./CachedS3JsonReader"
import MatchInfoKey from "./MatchInfoKey"

export default class EPLClient {
    private static URL_ROOT : string = "https://s3.amazonaws.com/fantasyeplmatchtracker";
    private URL_BASE : string = EPLClient.URL_ROOT + "/data";
    private SEASON_URL_BASE : string;
    private LEAGUE_INFO_BASE : string;
    private static STANDINGS_BASE = "leagues-h2h-standings";

    private seasonStartYear : number;
    private static matchInfoReader : CachedS3JsonReader<MatchInfoKey>;

    constructor(leagueId : number, seasonStartYear : number) {
      EPLClient.matchInfoReader = new CachedS3JsonReader<MatchInfoKey>(60000);
      this.SEASON_URL_BASE = this.URL_BASE + `/Season${seasonStartYear}`;
      this.LEAGUE_INFO_BASE = `${this.SEASON_URL_BASE}/${leagueId}/api`;
      this.seasonStartYear = seasonStartYear;
    }

    public static readAppConfigSync() : any{
      var link = this.getAppConfigUrl();
      var result = null;
      $.ajax({
        url: link,
        async: false,
        type: "GET",
        cache: false,
        dataType: "json",
        success: function (data) {
          result = data;
        }
      });
      return result;
    }

    public readLeagueStandings(leagueId : number, successFunc : Function) {
        var link = this.getLeagueStandingsUrl(leagueId);
        return $.ajax({
          url: link,
          type: "GET",
          cache: false,
          dataType: "json",
          success: function (data) {
            successFunc(data);
          }
        });
    }

    public readTeamData(leagueId : number, teamId : number, gameweek : number, isCup : boolean, isScouting : boolean, successFunc : Function) {
      var key = new MatchInfoKey(this.seasonStartYear, leagueId, gameweek, teamId, isCup, isScouting);
      console.log("Going to read " + key.hash());
      return EPLClient.matchInfoReader.read(key, successFunc);
    }

      public readEventInfo(gameweek : number, successFunc : Function) {
        var link = this.getEventInfoUrl(gameweek);
        return $.ajax({
          url: link,
          type: "GET",
          cache : false,
          dataType: "json",
          success: function (data) {
            successFunc(data);
          }
        });		
      }

      public readVideoHighlights(gameweek : number, successFunc : Function) {
        var link = this.getVideoHighlightsUrl(gameweek);
        return $.ajax({
          url: link,
          type: "GET",
          cache : false,
          dataType: "json",
          success: function (data) {
            successFunc(data);
          }
        });		
      }      

    protected getLeagueStandingsUrl(leagueId : number) : any {
        return `${this.LEAGUE_INFO_BASE}/${EPLClient.STANDINGS_BASE}`;
    }

    protected getEventInfoUrl(gameweek : number) : any {
      return `${this.SEASON_URL_BASE}/events/${gameweek}/EventInfo`;
    }

    protected getVideoHighlightsUrl(gameweek : number) : any {
      return `${this.SEASON_URL_BASE}/highlights/${gameweek}/youtube.json`;
    }

    protected static getAppConfigUrl() : any {
      return `${this.URL_ROOT}/appconfig.json`;
    }

    protected getMatchInfoUrl(leagueId : number, teamId : number, gameweek : number, isCup : boolean, isScouting : boolean = false) : string {
        var root = this.SEASON_URL_BASE;
        var filename = isScouting ? "ScoutingReport" : "MatchInfo";
        if (!isCup) {
          return `${root}/${leagueId}/${teamId}/${gameweek}/${filename}`
        }
        return `${root}/cup/${teamId}/${gameweek}/${filename}`
      }    
}