import * as React from "react";
import * as ReactDOM from "react-dom";

import PlayerPhoto from "./PlayerPhoto";

export interface HighlightProps {
    team : any
    events : any[]
}

export default class Highlight extends React.Component<HighlightProps, {}> {
    private HIGH_PRIORITY_EVENTS = ['GOAL', 'ASSIST', 'BONUS', "PENALTY_SAVES", "PENALTY_MISSED", "OWN_GOALS", "CLEAN_SHEET", "RED_CARD", "YELLOW_CARD"];

    constructor(props : any) {
        super(props);
        this.state = props;
    }

    protected getLatestEvent(highPriorityOnly: boolean) {
        if (this.props.events) {
            var reversedEvents = this.props.events.slice(0).reverse();
            for (var i in reversedEvents) {
                if (reversedEvents[i].teamId == this.props.team.id || reversedEvents[i].teamId < 0) {
                    if (!highPriorityOnly || this.isHighPriorityEvent(reversedEvents[i])) {
                        return reversedEvents[i];
                    }
                }
            }
        }
        return null;
    }

    protected isHighPriorityEvent(event : any) : boolean {
        return this.HIGH_PRIORITY_EVENTS.indexOf(event.type) >= 0;
    }

    protected getFootballer(event : any) : number {
        var teamIndex = 0;
        if (event.teamId > 0) {
            teamIndex = event.teamId;
        }
        for (var i in this.props.team.picks) {
            var pick = this.props.team.picks[i];
            if (pick.footballer.rawData.footballer.id == event.footballerId) {
                return pick.footballer;
            }
        }
        return null;
    }

    protected renderHighlight() : any {
        var event = this.getLatestEvent(true);
        if (!event) {
            event = this.getLatestEvent(false);
        }
        if (event) {
            var highlightText = this.getHighlightText(event);  
            return (
                <PlayerPhoto
                    footballer={this.getFootballer(event)}
                    text={highlightText}
                />
            );
        }
        return (<span></span>);
    }

    protected getHighlightText(event : any) {
        return `${event.footballerName} ${event.number} ${event.typeString.replace("_", " ")}`;
    }

    render() {
        return  <span>
                    {this.renderHighlight()}
                </span>
    }
}