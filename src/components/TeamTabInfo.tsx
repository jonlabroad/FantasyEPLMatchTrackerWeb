import Entry from "../data/fpl/Entry";
import Picks from "../data/fpl/Picks";
import React from "react";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import TeamInfoTable from "./TeamInfoTable";
import EntryHistory from "../data/fpl/EntryHistory";

export interface TeamTabInfoProps {
    history?: EntryHistory
    bootstrap: BootstrapStatic
    entry: Entry
    picks: Picks
}

export default class TeamTabInfo extends React.Component<TeamTabInfoProps> {
    render() {
        const { entry, picks, bootstrap, history } = this.props;

        return (
            <TeamInfoTable history={history} bootstrap={bootstrap} entry={entry} />
        );
    }
}