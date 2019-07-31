import React from "react";

export interface TeamsTabProps {
    currentTab: number;
    index: number;
}

export default class TeamsTab extends React.Component<TeamsTabProps> {
    render() {
        if (this.props.currentTab !== this.props.index) {
            return null;
        }
        return (
            <div>TBD</div>
        );
    }
}