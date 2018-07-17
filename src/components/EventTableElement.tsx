import * as React from "react";
import * as ReactDOM from "react-dom";
import IconProvider from "../IconProvider";

export interface EventTableElementProps {
    event : any;
    teamName : any;
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

    private getEventText(teamName : string, eventType : string, footballer : string, eventNumber : string, eventPts : string) : string {
        if (eventType.match("GOAL")) {
            return this.getGoalText(teamName, footballer, eventNumber, eventPts);
        }
        else if (eventType.match("MINUTES")) {
            return this.getMinutesPlayedText(teamName, footballer, eventNumber, eventPts);
        }
        else if (eventType.match("ASSIST")) {
            return this.getAssistText(teamName, footballer, eventNumber, eventPts);
        }
        else if (eventType.match("CLEAN_SHEET")) {
            return this.getCleanSheetText(teamName, footballer, eventNumber, eventPts);
        }
        else if (eventType.match("BONUS")) {
            return this.getBonusText(teamName, footballer, eventPts);
        }
        else {
            return this.getDefaultText(teamName, footballer, eventType, eventNumber, eventPts);
        }
    }

    private getGoalText(teamName : string, footballer : string, eventNumber : string, eventPts : string) : string {
        var num = parseInt(eventNumber);
        var goalStr = num > 1 ? `${num} Goals` : "Goal";
        
        return `${goalStr}! Scored by ${footballer} (${teamName}) (${this.getPtsString(eventPts)})`;
    }

    private getAssistText(teamName : string, footballer : string, eventNumber : string, eventPts : string) : string {
        var num = parseInt(eventNumber);
        var assistStr = num > 1 ? `${num} Assists` : "Assist";
        
        return `${assistStr} by ${footballer} (${teamName}) (${this.getPtsString(eventPts)})`;
    }

    private getMinutesPlayedText(teamName : string, footballer : string, eventNumber : string, eventPts : string) {
        var num = parseInt(eventNumber);
        var mins = num > 0 ? "minutes" : "minute";

        return `${footballer} (${teamName}) played ${num} ${mins} (${this.getPtsString(eventPts)})`;
    }

    private getCleanSheetText(teamName : string, footballer : string, eventNumber : string, eventPts : string) {
        var num = parseInt(eventNumber);
        var text = num <= 0 ? "no longer has a clean sheet" : "currently has a clean sheet";
        return `${footballer} (${teamName}) ${text} (${this.getPtsString(eventPts)})`;
    }

    private getBonusText(teamName : string, footballer : string, eventPts : string) {
        return `${footballer} (${teamName}) with a superb performance today! (${this.getPtsString(eventPts)})`;
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

    renderIcon(typeString : string) {
        var icon = IconProvider.getIcon(typeString);
        return (
            <img src={`img/icon/${icon}`}/>
        );
    }

    render() {
        var eventClassName = "";
        var event = this.props.event;
        return <tr className={`${eventClassName}`}>
                <td className="event-time">{this.formatTime(event.dateTime)}</td>
                <td className="event-icon">{this.renderIcon(event.typeString)}</td>
                <td className="event-description">{this.getEventText(this.props.teamName, event.typeString, event.footballerName, event.number, event.pointDifference)}</td>
            </tr>
    }
}