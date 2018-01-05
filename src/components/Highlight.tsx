import * as React from "react";
import * as ReactDOM from "react-dom";

import BadgeProvider from "../BadgeProvider";

export interface HighlightProps {
    team : any
    events : any[]
}

export default class Highlight extends React.Component<HighlightProps, HighlightProps> {
    protected photoRoot : string = 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p';
    private HIGH_PRIORITY_EVENTS = ['GOAL', 'ASSIST', 'BONUS', "PENALTY_SAVES", "PENALTY_MISSED", "OWN_GOALS"];
    
    constructor(props : any) {
        super(props);
        this.state = props;
    }

    protected getLatestHighPriorityEvent() {
        var reversedEvents = this.state.events.slice(0).reverse();
        for (var i in reversedEvents) {
            if (reversedEvents[i].teamId == this.state.team.id || reversedEvents[i].teamId < 0) {
                if (this.isHighPriorityEvent(reversedEvents[i])) {
                    return reversedEvents[i];
                }
            }
        }
    }

    protected isHighPriorityEvent(event : any) : boolean {
        return this.HIGH_PRIORITY_EVENTS.indexOf(event.type) >= 0;
    }

    protected findTeamCode(event : any) : number {
        var teamIndex = 0;
        if (event.teamId > 0) {
            teamIndex = event.teamId;
        }
        for (var i in this.props.team.picks) {
            var pick = this.props.team.picks[i];
            if (pick.footballer.rawData.footballer.id == event.footballerId) {
                return pick.footballer.rawData.footballer.team_code;
            }
        }
        alert(`Team code is 0 for ${event.footballerName}`);
        return 0;
    }

    protected renderHighlight() : any {
        var event = this.getLatestHighPriorityEvent();
        if (event) {
            var highlightPhoto = this.renderPhoto(event);
            var highlightText = this.renderHighlightText(event);
            var highlightBackground = this.renderHighlightBackground();
            var style = {
                backgroundImage: `url(${BadgeProvider.getBadgeUrl(this.findTeamCode(event))})`                
            }
   
            return (
                <div
                    className="team-highlight"
                    style={style}>
                    {highlightPhoto}
                    {highlightBackground}
                    {highlightText}
                </div>
            );
        }
        return (<span></span>);
    }

    protected renderHighlightText(event : any) {
        var highlightText = `${event.footballerName}: ${event.type} (${event.pointDifference})`;
        return (
            <div className="highlight-text">
                {highlightText}
            </div>
        );
    }

    protected renderHighlightBackground() {
        return <div className="highlight-background"></div>
    }

    protected renderPhoto(event : any) {
        var photoSuffix = this.getPhotoId(event);
        var photoUrl = this.photoRoot + photoSuffix;
        photoUrl = photoUrl.replace(".jpg", ".png");
        return <img
            src={photoUrl}
            className="team-highlight"
        />
    }

    private getPhotoId(event : any) {
        var team = this.state.team;
        for (var i in team.picks) {
            if (team.picks[i].footballer.rawData.footballer.id == event.footballerId) {
                return team.picks[i].footballer.rawData.footballer.photo;
            }
        }
        return null;
    }

    render() {
        return  <span>
                    {this.renderHighlight()}
                </span>
    }
}