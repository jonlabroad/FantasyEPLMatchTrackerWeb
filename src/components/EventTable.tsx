import * as React from "react";
import * as ReactDOM from "react-dom";

import EventTableElement from "./EventTableElement"

export interface EventTableProps {
    eventList : any[];
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

    renderElement(key : string, event : any) {
        return <EventTableElement
                key={key}
                event={event}
            />
    }

    renderElements() {
        var elements = new Array<any>();
        for (var i in this.props.eventList) {
            var event = this.props.eventList[i];
            elements.push(this.renderElement(i, event));
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
        var eventClassName = "";
        return <div className="scrollable event-scrollable">
                <table className={`table events-table ${eventClassName}`}>
                    <tbody>
                    {this.renderElements()}
                    </tbody>
                </table>
                <div ref={(el) => {this.bottomScrollElement = el}}>
                </div>
            </div>
    }
}