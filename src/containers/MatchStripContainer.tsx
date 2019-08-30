import React, { ChangeEvent } from "react";
import { Dispatch, Action } from "redux";
import { TrackerState } from "../types";
import { RootAction, tabSelect, receiveLeagueFixtures, receivePicks, receiveLive } from "../actions";
import { connect } from "react-redux";
import TrackerTabs from "../components/TrackerTabs";
import PicksHelper from "../util/PicksHelper";
import PicksList from "../components/PicksList";
import Live, { Lives } from "../data/fpl/Live";
import LiveHelper from "../util/LiveHelper";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { LeagueFixtures, MappedLeagueFixtures } from "../data/LeagueFixtures";
import Picks from "../data/fpl/Picks";
import StateHelper from "../util/StateHelper";
import MatchStatusStrip from "../components/MatchStatusStrip";
import { returnStatement } from "@babel/types";

export interface MatchStatusContainerProps {
    gameweek: number,
    leagueId: number,

    picks: {[key: string]: Picks}
    bootstrapStatic?: BootstrapStatic
    live: Lives
    mappedLeagueFixtures?: MappedLeagueFixtures

    receiveLeagueFixtures: any
    receivePicks: any
    receiveLive: any
}

export class MatchStatusContainer extends React.Component<MatchStatusContainerProps> {
    render() {
        const { mappedLeagueFixtures, leagueId, gameweek } = this.props;
        if (!mappedLeagueFixtures) {
            return null;
        }

        const leagueFixtures = mappedLeagueFixtures[leagueId];
        if (!leagueFixtures || !leagueFixtures[gameweek]) {
            return null;
        }

        // TODO REENABLE
        return null;

        return (
        <MatchStatusStrip
            fixtures={leagueFixtures[this.props.gameweek]}
        />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        gameweek: state.nav.gameweek,
        leagueId: state.nav.leagueId,

        bootstrapStatic: state.data.bootstrapStatic,
        picks: state.data.picks,
        live: state.data.live,
        mappedLeagueFixtures: state.data.mappedLeagueFixtures
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    receiveLeagueFixtures: (leagueId: number, fixtures: LeagueFixtures) => dispatch(receiveLeagueFixtures(leagueId, fixtures)),
    receivePicks: (entryId: number, gameweek: number, picks: Picks) => dispatch(receivePicks(entryId, gameweek, picks)),
    receiveLive: (gameweek: number, live: Live) => dispatch(receiveLive(gameweek, live)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchStatusContainer);