import MatchTracker from "./MatchTracker";
import TeamStandingHelper from "../../TeamStandingHelper";

// Kinda gross in that it is basically an extension of MatchTracker, but it's just to get it out of the way of the component code

export default class MatchTrackerStateManager
{
    private tracker : MatchTracker;

    constructor(matchTracker : MatchTracker)
    {
        this.tracker = matchTracker;
    }

    public processMatchInfo(data : any)
    {
        if (data) {          
            if (this.tracker.componentMounted) {
                this.tracker.setState({
                    matchInfo: data,
                    selection: this.tracker.selection
                });
            }
        }
        else {
            if (this.tracker.componentMounted) {
                this.tracker.setState({
                    matchInfo: this.tracker.state.matchInfo,
                });
            }
        }
    }

    public processEventInfo(data : any) {
        if (data) {
            this.tracker.eventInfoCache.update(this.tracker.selection.gameweek, data);
            
            if (this.tracker.componentMounted) {
                this.tracker.setState({
                    eventInfo: data,
                    selection: this.tracker.selection
                });
            }
        }
        else {
            if (this.tracker.componentMounted) {
                this.tracker.setState({
                    eventInfo: this.tracker.state.eventInfo
                });
            }
        }
      }
    
      public processVideoHighlights(data : any) {
        if (data) {
            this.tracker.videoHighlightCache.update(this.tracker.selection.gameweek, data);
            
            if (this.tracker.componentMounted) {
                this.tracker.setState({
                    videoHighlights: data,
                    selection: this.tracker.selection
                });
            }
        }
        else {
            if (this.tracker.componentMounted) {
                this.tracker.setState({
                    videoHighlights: this.tracker.state.videoHighlights,
                });
            }
        }
      }

      public processStandings(data : any) {
        var standings = data;
        if (this.tracker.componentMounted) {
            var standing = TeamStandingHelper.findTeamStandingById(this.tracker.selection.teamId, standings ? standings : this.tracker.state.standings);
            this.tracker.selection.teamName = standing.entry_name;
            this.tracker.setState({
                matchInfo: this.tracker.state.matchInfo,
                standings: standings,
                selection: this.tracker.selection
            });
        }
      }
}