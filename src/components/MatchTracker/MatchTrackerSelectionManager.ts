import TeamStandingHelper from "../../TeamStandingHelper";
import MatchTracker from "./MatchTracker";

// Kinda gross in that it is basically an extension of MatchTracker, but it's just to get it out of the way of the component code

export default class MatchTrackerSelectionManager
{
    private tracker : MatchTracker;

    constructor(tracker : MatchTracker)
    {
        this.tracker = tracker;
    }

    public teamNameChanged(event : any) {
        var oldSelection = this.tracker.selection;
        if (oldSelection.teamName !== event.target.value) {
            this.tracker.selection.teamName = event.target.value;
            this.tracker.selection.teamId = TeamStandingHelper.findTeamStandingByName(event.target.value, this.tracker.state.standings).entry;
            this.tracker.setUrl();
            this.tracker.readMatchInfo();
        }
    }

    public gameweekChanged(event : any) {
        if (this.tracker.selection.gameweek !== event.target.value) {
            this.tracker.selection.gameweek = event.target.value;
            this.tracker.setUrl();
            this.tracker.readMatchInfo();
            this.tracker.readEventInfo();
            this.tracker.readVideoHighlights();
        }
    }

    public differentialsChanged(event : any) {
        if (this.tracker.selection.differentialsOnly !== event.target.checked) {
            this.tracker.selection.differentialsOnly = event.target.checked;
            this.tracker.setUrl();
            this.tracker.setState({
                standings: this.tracker.state.standings,
                selection: this.tracker.selection,
                matchInfo: this.tracker.state.matchInfo,
                eventInfo: this.tracker.state.eventInfo
            });
        }
    }
}