import React from "react";
import { Dispatch, Action } from "redux";
import { TrackerState } from "../types";
import { RootAction, setTeam, setLeague } from "../actions";
import { connect } from "react-redux";
import { MappedLeaguesH2hStandings } from "../data/fpl/LeaguesH2hStandings";
import FplAppBar from "../components/FplAppBar";
import Entry from "../data/fpl/Entry";

export interface FplAppBarContainerProps {
    leagueId: number
    selectedTeam: number

    entries: {[key: number]: Entry};
    mappedLeagueH2hStandings?: MappedLeaguesH2hStandings
    setTeam: any
    setLeague: any
}

export class FplAppBarContainer extends React.Component<FplAppBarContainerProps> {
    onTeamSelect(event: any) {
        this.props.setTeam(event.target.value);
    }

    onLeagueSelect(event: any) {
        this.props.setLeague(event.target.value);
    }

    render() {
        const { mappedLeagueH2hStandings, leagueId, selectedTeam} = this.props;
        return (
        <FplAppBar
            selectedTeam={selectedTeam}
            mappedStandings={mappedLeagueH2hStandings}
            leagueId={leagueId}
            onTeamSelect={this.onTeamSelect.bind(this)}
            entries={this.props.entries}
            onLeagueSelect={this.onLeagueSelect.bind(this)}
        />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        leagueId: state.nav.leagueId,
        mappedLeagueH2hStandings: state.data.mappedLeagueH2hStandings,
        selectedTeam: state.nav.team,
        entries: state.data.entries
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    setTeam: (teamId: number) => dispatch(setTeam(teamId)),
    setLeague: (leagueId: number) => dispatch(setLeague(leagueId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FplAppBarContainer);