import React from "react";
import { connect } from "react-redux";
import { TrackerState } from "../types";
import { RootAction, setGameweek, updateGameweekData } from "../actions";
import { Dispatch, AnyAction } from "redux";
import MatchHeader from "../components/MatchHeader";
import PicksHelper from "../util/PicksHelper";
import Live from "../data/fpl/Live";
import LiveHelper from "../util/LiveHelper";
import { ThunkDispatch } from "redux-thunk";

export interface MatchHeaderContainerProps {
    teams: number[]

    gameweek: number;
    entries: {[key: number]: any};
    picks?: any;
    live?: {[key: string]: Live};

    setGameweek: any;
    updateGameweekData: any;
}

export class MatchHeaderContainer extends React.Component<MatchHeaderContainerProps, {}> {
    incrementGameweek(event: any, increment: number){
        const newGameweek = this.props.gameweek + 1;
        this.props.setGameweek(newGameweek);
        this.props.updateGameweekData(newGameweek);
    }

    decrementGameweek(event: any) {
        const newGameweek = this.props.gameweek - 1;
        this.props.setGameweek(newGameweek);
        this.props.updateGameweekData(newGameweek);
    }
    
    render() {
        return (
        <MatchHeader
            gameweek={this.props.gameweek}
            entry1={this.props.entries[this.props.teams[0]]}
            entry2={this.props.entries[this.props.teams[1]]}
            picks1={PicksHelper.getPicks(this.props.teams[0], this.props.gameweek, this.props.picks)}
            picks2={PicksHelper.getPicks(this.props.teams[1], this.props.gameweek, this.props.picks)}
            live={LiveHelper.getLive(this.props.gameweek, this.props.live)}

            incrementGameweekClick={this.incrementGameweek.bind(this)}
            decrementGameweekClick={this.decrementGameweek.bind(this)}
        />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
      gameweek: state.nav.gameweek,
      teams: state.nav.teams,
      entries: state.data.entries,
      picks: state.data.picks,
      live: state.data.live
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    setGameweek: (gameweek: number) => dispatch(setGameweek(gameweek)),
    updateGameweekData: (gameweek: number, team: number) => dispatch(updateGameweekData(gameweek, team))
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchHeaderContainer);