import * as React from "react";
import * as ReactDOM from "react-dom";

import EventTableElement from "./EventTableElement"

export interface EventTableProps {
    eventList : any[];
    teams : any;
}

export default class EventTable extends React.Component<EventTableProps, {}> {
    protected bottomScrollElement : Element;

    constructor(props : EventTableProps) {
        super(props);
        this.state = {};
    }

    public scrollToBottom() {
        if (this.bottomScrollElement) {
            // TODO do this right. This currently scrolls the entire page
            //this.bottomScrollElement.scrollIntoView({ behavior: "smooth" });
        }
    }

    renderElement(key : string, event : any, teamName : string) {
        return <EventTableElement
                key={key}
                event={event}
                teamName={teamName}
            />
    }

    renderElements() {
        var elements = new Array<any>();
        for (var i in this.props.eventList) {
            var event = this.props.eventList[i];
            console.log(this.props.teams);
            var teamName = "ERROR";
            if (event.teamId < 0) {
                var self = this;
                teamName = Object.keys(this.props.teams).reduce(function(names : string, teamId : string) : string {
                    var split = names ? "" : "/";
                    names += self.props.teams[teamId].entry.entry.name + split;
                    return names;
                }, "");
            }
            else {
                teamName = this.props.teams[event.teamId].entry.entry.name;
            }
            elements.push(this.renderElement(i, event, teamName));
        }
        return elements;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div>
                <div className="events-table-header">Match Commentary</div>
                <div className="scrollable events-table event-scrollable">
                <table className={`table table-sm`}>
                    <tbody>
                    {this.renderElements()}
                    </tbody>
                </table>
                <div ref={(el) => {this.bottomScrollElement = el}}></div>
                </div>
            </div>
        );
    }
}