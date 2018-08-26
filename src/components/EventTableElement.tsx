import * as React from "react";
import * as ReactDOM from "react-dom";
import IconProvider from "../IconProvider";
import ColorCommentator from "../ColorCommentator";

export interface EventTableElementProps {
    event : any;
    teamName : any;
    isLatest : boolean;
    gameweek : number;
}

export default class EventTableElement extends React.Component<EventTableElementProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = props;
    }

    private formatTime(timeStr : string) : string {
        var date = new Date(timeStr);
        var hours = date.getHours();
        var min = date.getMinutes();
        return `${date.getMonth()}/${date.getDate()} ${(hours < 10 ? "0" : "") + date.getHours()}:${(min < 10 ? "0" : "") + min}`;
    }

    private getEventText(teamName : string, eventType : string, footballer : string, eventNumber : string, eventPts : string, gameweek : number) : string {
        if (eventType.match("GOAL")) {
            return this.getGoalText(teamName, footballer, eventNumber, eventPts, gameweek);
        }
        else if (eventType.match("MINUTES")) {
            return this.getMinutesPlayedText(teamName, footballer, eventNumber, eventPts, gameweek);
        }
        else if (eventType.match("ASSIST")) {
            return this.getAssistText(teamName, footballer, eventNumber, eventPts, gameweek);
        }
        else if (eventType.match("CLEAN_SHEET")) {
            return this.getCleanSheetText(teamName, footballer, eventNumber, eventPts, gameweek);
        }
        else if (eventType.match("BONUS")) {
            return this.getBonusText(teamName, footballer, eventPts, gameweek);
        }
        else if (eventType.match("AUTOSUB_IN")) {
            return this.getAutosubInText(teamName, footballer, eventPts, gameweek);
        }
        else if (eventType.match("AUTOSUB_OUT")) {
            return this.getAutosubOutText(teamName, footballer, eventPts, gameweek);
        }
        else {
            return this.getDefaultText(teamName, footballer, eventType, eventNumber, eventPts);
        }
    }

    private getGoalText(teamName : string, footballer : string, eventNumber : string, eventPts : string, gameweek : number) : string {
        var num = parseInt(eventNumber);
        return ColorCommentator.GetGoalCommentary(`${footballer} (${teamName})`, num, gameweek) + ` (${this.getPtsString(eventPts)})`;
    }

    private getAssistText(teamName : string, footballer : string, eventNumber : string, eventPts : string, gameweek : number) : string {
        var num = parseInt(eventNumber);
        return ColorCommentator.GetAssistCommentary(`${footballer} (${teamName})`, num, gameweek) + ` (${this.getPtsString(eventPts)})`;
    }

    private getMinutesPlayedText(teamName : string, footballer : string, eventNumber : string, eventPts : string, gameweek : number) {
        var num = parseInt(eventNumber);
        return ColorCommentator.GetMinutesCommentary(`${footballer} (${teamName})`, num, gameweek) + ` (${this.getPtsString(eventPts)})`;
    }

    private getCleanSheetText(teamName : string, footballer : string, eventNumber : string, eventPts : string, gameweek : number) {
        var num = parseInt(eventNumber);
        return ColorCommentator.GetCleanSheetCommentary(`${footballer} (${teamName})`, num, gameweek) + ` (${this.getPtsString(eventPts)})`;
    }

    private getBonusText(teamName : string, footballer : string, eventPts : string, gameweek : number) {
        var num = parseInt(eventPts);
        return ColorCommentator.GetBonusCommentary(`${footballer} (${teamName})`, num, gameweek) + ` (${this.getPtsString(eventPts)})`;
    }

    private getAutosubOutText(teamName : string, footballer : string, eventPts : string, gameweek : number) {
        return ColorCommentator.GetAutosubOutCommentary(`${footballer} (${teamName})`, gameweek);
    }

    private getAutosubInText(teamName : string, footballer : string, eventPts : string, gameweek : number) {
        return ColorCommentator.GetAutosubInCommentary(`${footballer} (${teamName})`, gameweek);
    }

    private getDefaultText(teamName : string, footballer : string, eventType : string, eventNumber : string, eventPts : string) {
        var num = parseInt(eventNumber);
        var typeStr = eventType.replace("_", " ").toLowerCase();
        var firstLetter = typeStr.charAt(0).toUpperCase();
        typeStr = firstLetter + typeStr.slice(1);
        return `${typeStr} by ${footballer} (${teamName}) (${this.getPtsString(eventPts)})`;
    }

    private getPtsString(eventPts : string) : string {
        var pts = parseInt(eventPts);
        return pts > 0 ? `+${eventPts}` : eventPts.toString();
    }

    renderIcon(typeString : string, eventNum : string) {
        if (typeString.match("MINUTES") && parseInt(eventNum) >= 60)
        {
            typeString = "minutes_60";
        }
        var icon = IconProvider.getIcon(typeString);
        return (
            <img src={`img/icon/${icon}`}/>
        );
    }

    render() {
        var eventClassName = "";
        var event = this.props.event;
        return <tr id={this.props.isLatest ? "latest-event" : ""} className={`${eventClassName}`}>
                <td className="event-time">{this.formatTime(event.dateTime)}</td>
                <td className="event-icon">{this.renderIcon(event.typeString, event.number)}</td>
                <td className="event-description">{this.getEventText(this.props.teamName, event.typeString, event.footballerName, event.number, event.pointDifference, this.props.gameweek)}</td>
            </tr>
    }
}