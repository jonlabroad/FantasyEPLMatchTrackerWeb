export default class TeamStandingHelper
{
    public static findTeamStandingByName(teamName : string, standings : any) {
        if (standings) {
          for (var i in standings.standings.results) {
            var result = standings.standings.results[i];
            if (result.entry_name === teamName) {
              return result;
            }
          }
        }
        return null;
      }

      public static findTeamStandingById(teamId : number, standings : any) {
        if (standings) {
          for (var i in standings.standings.results) {
            var result = standings.standings.results[i];
            if (result.entry == teamId) {
              return result;
            }
          }
        }
      }
}