export default class Url {
    public static set(gameweek: number, team: number, league: number, differentials: boolean, tab: number) {
        const url = new URLSearchParams();
        url.delete("gameweek");
        url.delete("team");
        url.delete("league");
        url.delete("diff");
        url.delete("tab");
        url.set("gameweek", gameweek.toString());
        url.set("team", team.toString());
        url.set("league", league.toString());
        url.set("diff", differentials.toString());
        url.set("tab", tab.toString());

        window.history.pushState("", "", "?" + url.toString());
    }

    public static getSelectedTab(): number | null {
        const url = new URLSearchParams(document.location.search);
        const val = url.get("tab");
        return val ? parseInt(val) : null;
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

    public static getDifferentials(): boolean | undefined {
        const url = new URLSearchParams(document.location.search);
        const diff = url.get("diff");
        if (diff) return (diff.toLowerCase() === 'true');
        return undefined;
    }

}