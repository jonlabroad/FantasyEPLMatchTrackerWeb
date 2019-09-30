import React, { Dispatch } from "react";
import Entry from "../data/fpl/Entry";
import { Action } from "redux";
import { TrackerState } from "../types";
import { connect } from "react-redux";
import TeamsTab from "../components/TeamsTab";
import Picks from "../data/fpl/Picks";
import PicksHelper from "../util/PicksHelper";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { MappedEntryHistory } from "../data/fpl/EntryHistory";
import EntryHistoryHelper from "../util/EntryHistoryHelper";
import { MappedGameweekTimelines } from "../data/GameweekTimeline";
import TimelinesHelper from "../util/TimelinesHelper";
import BetaTab from "../components/BetaTab";
import { MappedFixtures } from "../data/MappedFixtures";
import FixturesHelper from "../util/FixturesHelper";
import { ProcessedPlayers, MappedProcessedPlayers } from "../data/ProcessedPlayers";

export interface BetaTabContainerProps {
    currentTab: number
    index: number
    
    teams: number[]
    gameweek: number

    bootstrap?: BootstrapStatic
    fixtures: MappedFixtures
    entries: {[key: number]: Entry}
    mappedPicks: {[key: string]: Picks}
    history: MappedEntryHistory
    timelines: MappedGameweekTimelines
    mappedProcessedPlayers?: MappedProcessedPlayers
}

export class BetaTabContainer extends React.Component<BetaTabContainerProps> {
    render() {
        const { teams, timelines, index, currentTab, entries, mappedPicks, bootstrap, gameweek, history, fixtures, mappedProcessedPlayers } = this.props;

        if (this.props.currentTab !== this.props.index) {
            return null;
        }

        if (!entries || !mappedPicks) {
            return null;
        }

        const matchEntries = [entries[teams[0]]];
        if (teams[1] && entries[teams[1]]) {
            matchEntries.push(entries[teams[1]]);
        } 

        const histories = [];
        for (let team of teams) {
            const hist = EntryHistoryHelper.getHistory(team, history);
            histories.push(hist);
        }

        const picksGameweek = PicksHelper.getPicksGameweek(gameweek, bootstrap);
        const gwFixtures = FixturesHelper.getFixtures(gameweek, fixtures);
        const timeline = TimelinesHelper.getTimeline(gameweek, timelines);
        const processedPlayers = mappedProcessedPlayers ? mappedProcessedPlayers[gameweek] : undefined;

        return (
            <BetaTab
                entries={matchEntries}
                picks={PicksHelper.getMatchPicks(teams[0], teams[1], picksGameweek, mappedPicks)}
                bootstrap={bootstrap}
                timeline={timeline}
                fixtures={gwFixtures}
                processedPlayers={processedPlayers}
            />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        currentTab: state.nav.selectedTab,
        teams: state.nav.teams,
        entries: state.data.entries,
        mappedPicks: state.data.picks,
        gameweek: state.nav.gameweek,
        bootstrap: state.data.bootstrapStatic,
        history: state.data.history,
        timelines: state.data.mappedGameweekTimelines,
        fixtures: state.data.fixtures,
        mappedProcessedPlayers: state.data.processedPlayers
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(BetaTabContainer);