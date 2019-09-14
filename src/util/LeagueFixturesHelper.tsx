import { LeagueFixtures } from "../data/LeagueFixtures";

export default class LeagueFixturesHelper {
    public static getTeams(teamId: number, gameweek: number, leagueFixtures?: LeagueFixtures): number[] {
        if (!leagueFixtures) {
            return [teamId];
        }
        // Get teams opponent from the league fixtures
        var otherTeam: number | undefined = teamId;
        var team1: number = teamId;
        var team2: number = teamId;
        const fixture = leagueFixtures[gameweek].find(fixture => fixture.entry_1_entry === teamId || fixture.entry_2_entry === teamId);
        if (fixture) {
            otherTeam = fixture.entry_1_entry === teamId ? fixture.entry_2_entry : fixture.entry_1_entry;
            team1 = fixture.entry_1_entry === teamId ? teamId : otherTeam || teamId;
            team2 = fixture.entry_2_entry === teamId ? teamId : otherTeam || teamId;
        }
        else {
            return [teamId];
        }
        return [team1, team2];
    }
}