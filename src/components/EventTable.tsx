import * as React from "react";
import * as ReactDOM from "react-dom";

import EventTableElement from "./EventTableElement"

export interface EventTableProps {
    eventList : any[];
    teams : any;
    gameweek : number
}

export default class EventTable extends React.Component<EventTableProps, {}> {
    protected bottomScrollElement : Element = null;

    constructor(props : EventTableProps) {
        super(props);
        this.state = {};
    }

    public scrollToBottom(smooth : boolean) {
        if (this.bottomScrollElement) {
            var target = $('#latest-event');
            $('.event-scrollable').stop().animate({
                scrollTop: 5000
            }, (smooth ? 1000 : 0));
        }
    }

    renderElement(key : string, event : any, teamName : string, isLast : boolean, gameweek : number) {
        return <EventTableElement
                key={key}
                event={event}
                teamName={teamName}
                isLatest={isLast}
                gameweek={gameweek}
            />
    }

    renderElements() {
        var elements = new Array<any>();
        for (var i in this.props.eventList) {
            var event = this.props.eventList[i];
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
            elements.push(this.renderElement(i, event, teamName, parseInt(i) == (this.props.eventList.length - 1), this.props.gameweek));
        }
        this.bottomScrollElement = elements[elements.length - 1];
        return elements;
    }

    componentDidUpdate() {
        this.scrollToBottom(true);
    }

    componentDidMount() {
        this.scrollToBottom(false);
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
                </div>
            </div>
        );
    }
}