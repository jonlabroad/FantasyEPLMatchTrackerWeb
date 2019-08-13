export default class Url {
    public static set(gameweek: number, team: number, league: number) {
        const url = new URLSearchParams();
        url.delete("gameweek");
        url.delete("team");
        url.delete("league");
        url.set("gameweek", gameweek.toString());
        url.set("team", team.toString());
        console.log(league);
        url.set("league", league.toString());
        window.history.pushState("", "", "?" + url.toString());
    }

    public static getGameweek(): string | null {
        return new URLSearchParams(document.location.search).get("gameweek");
    }

    public static getLeague(): number | null {
        const url = new URLSearchParams(document.location.search);
        const leagueVal = url.get("league");
        return leagueVal ? parseInt(leagueVal) : null;
    }

    public static getTeams(): number[] {
        const url = new URLSearchParams(document.location.search);
        const teams: number[] = [];
        const team1 = url.get("team1");
        const team2 = url.get("team2");
        if (team1) teams.push(parseInt(team1 || "0"));
        if (team2) teams.push(parseInt(team2 || "0"));

        return teams;
    }

    public static getTeam(): number | undefined {
        const url = new URLSearchParams(document.location.search);
        const team = url.get("team");
        if (team) return parseInt(team);
        return undefined;
    }

}