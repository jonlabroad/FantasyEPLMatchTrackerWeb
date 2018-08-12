import TabType from "./models/TabType";

export default class Url {
    public static setUrl(startYear : number, leagueId: number, teamId : number, gameweek : number, differentialsOnly : boolean, isCup : boolean, tab : TabType) {
        window.history.pushState("", "", `?season=${startYear}&league=${leagueId}&team=${teamId}&gameweek=${gameweek}&differentials=${differentialsOnly}&cup=${isCup}&tab=${tab}`);
    }

    public static getParameterByName(name : string, defaultValue? : any, url? : string) {
        if (!url) {
            url = window.location.href;
        }

        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
        
        if (!results)
            return defaultValue;
        
        if (!results[2])
            return defaultValue;
        
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}