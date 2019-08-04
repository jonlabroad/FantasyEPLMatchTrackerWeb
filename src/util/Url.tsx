export default class Url {
    public static set(gameweek: number, team: number[]) {
        const url = new URLSearchParams();
        url.delete("gameweek");
        url.delete("team1");
        url.delete("team2");
        url.set("gameweek", gameweek.toString());
        url.set("team1", team[0].toString());
        if (team.length > 1) {
            url.set("team2", team[1].toString());
        }
        window.history.pushState("", "", "?" + url.toString());
    }

    public static getGameweek(): string | null {
        return new URLSearchParams(document.location.search).get("gameweek");
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

}