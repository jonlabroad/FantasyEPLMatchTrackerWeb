import Entry from "../data/fpl/Entry";
import Picks from "../data/fpl/Picks";
import React from "react";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import TeamInfoTable from "./TeamInfoTable";

export interface TeamTabInfoProps {
    bootstrap: BootstrapStatic
    entry: Entry
    picks: Picks
}

export default class TeamTabInfo extends React.Component<TeamTabInfoProps> {
    render() {
        const { entry, picks, bootstrap } = this.props;

        return (
            <TeamInfoTable bootstrap={bootstrap} entry={entry} />
        );
    }
}