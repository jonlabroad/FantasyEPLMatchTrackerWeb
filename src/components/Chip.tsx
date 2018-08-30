import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ChipProps {
    chipText : string,
    enabled : boolean,
    available : boolean
}

export default class Chip extends React.Component<ChipProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
        }
    }

    render() {
        var badgeClasses = [];
        badgeClasses.push(this.props.enabled ? "badge-warning chip-selected" : (this.props.available ? "badge-light" : "badge-light chip-unavailable"));
        return (
            <div className={"chipstrip-chip badge " + badgeClasses}>{this.props.chipText}</div>
        );
    }
}