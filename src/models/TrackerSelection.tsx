import TabType from "./TabType";

export default class TrackerSelection {
    public seasonStartYear : number;
    public leagueId : number;
    public teamName : string;
    public teamId : number;
    public gameweek : number = 1;
    public differentialsOnly : boolean = false;
    public cup : boolean = false;
    public tab : TabType;
}