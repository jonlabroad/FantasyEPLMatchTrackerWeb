import React from "react";
import { Dispatch, Action } from "redux";
import { TrackerState } from "../types";
import { RootAction, setTeam, setLeague, updateGameweekData } from "../actions";
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
    updateGameweekData: any
}

export class FplAppBarContainer extends React.Component<FplAppBarContainerProps> {
    onTeamSelect(event: any) {
        const team = event.target.value;
        this.props.setTeam(team);
        this.props.updateGameweekData(undefined, team, undefined);
    }

    onLeagueSelect(event: any) {
        const league = event.target.value;
        this.props.setLeague(league);
        this.props.updateGameweekData(undefined, undefined, league);
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
    updateGameweekData: (gameweek: number, team: number, league: number) => dispatch(updateGameweekData(gameweek, team, league))
});

export default connect(mapStateToProps, mapDispatchToProps)(FplAppBarContainer);