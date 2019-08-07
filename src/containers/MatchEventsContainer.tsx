import React, { Dispatch } from "react";
import { RootAction } from "../actions";
import { TrackerState } from "../types";
import MatchEvents from "../components/MatchEvents";
import { connect } from "react-redux";
import { MappedProcessedPlayers } from "../data/ProcessedPlayers";
import Picks from "../data/fpl/Picks";
import PicksHelper from "../util/PicksHelper";
import Bootstrap from "../data/fpl/Bootstrap";

export interface MatchEventContainerProps {
    gameweek: number
    teams: number[]
    picks: {[key: string]: Picks}
    processedPlayers?: MappedProcessedPlayers
    bootstrap?: Bootstrap
}

export class MatchEventsContainer extends React.Component<MatchEventContainerProps> {
    render() {
        return (
            <MatchEvents
                gameweek={this.props.gameweek}
                teams={this.props.teams}
                picks={this.props.picks}
                processedPlayers={this.props.processedPlayers ? this.props.processedPlayers[this.props.gameweek] : undefined}
                bootstrap={this.props.bootstrap}
            />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        gameweek: state.nav.gameweek,
        teams: state.nav.teams,
        processedPlayers: state.data.processedPlayers,
        picks: state.data.picks,
        bootstrap: state.data.bootstrap
    };
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    //setTeams: (teams: number[]) => dispatch(setTeams(teams)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchEventsContainer);