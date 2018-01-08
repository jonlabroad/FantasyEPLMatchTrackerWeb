import * as React from "react";
import * as ReactDOM from "react-dom";

export interface EventTableElementProps {
    event : any;
}

export default class EventTableElement extends React.Component<EventTableElementProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = props;
    }

    render() {
        var eventClassName = "";
        var event = this.props.event;
        return <tr className={`${eventClassName}`}>
                <td className="event-footballer-name">{event.footballerName}</td>
                <td className="event-number">{event.number}</td>
                <td className="event-type">{event.typeString.replace("_", " ")}</td>
                <td className="event-points">{event.pointDifference}</td>
            </tr>
    }
}