import * as React from "react";
import * as ReactDOM from "react-dom";

export interface EventTableElementProps {
    event : any;
}

export default class EventTableElement extends React.Component<EventTableElementProps, EventTableElementProps> {
    constructor(props : any) {
        super(props);
        this.state = props;
    }

    render() {
        var eventClassName = "";
        var event = this.state.event;
        return <tr className={`${eventClassName}`}>
                <td>{event.number} {event.typeString.replace("_", " ")} {event.footballerName} {event.pointDifference}</td>
            </tr>
    }
}