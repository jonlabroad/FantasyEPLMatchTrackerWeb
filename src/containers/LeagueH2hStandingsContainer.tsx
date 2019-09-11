import React, { Dispatch } from "react";
import { MappedLeaguesH2hStandings } from "../data/fpl/LeaguesH2hStandings";
import { TrackerState } from "../types";
import { RootAction, setTeam, updateGameweekData } from "../actions";
import { connect } from "react-redux";
import LeagueH2hStandingsList from "../components/LeagueH2hStandingsList";
import { Action } from "redux";

export interface LeagueH2hStandingsContainerProps {
    leagueId: number
    standings?: MappedLeaguesH2hStandings
    teams: number[]

    setTeam: any
    updateGameweekData: any
}

export class LeagueH2hStandingsContainer extends React.Component<LeagueH2hStandingsContainerProps> {
    onTeamClick(teamId: number) {
        this.props.setTeam(teamId);
        this.props.updateGameweekData(null, teamId, null);
    }
    
    render() {
        const { standings, leagueId } = this.props;
        return (
            <LeagueH2hStandingsList
                teams={this.props.teams}
                standings={standings ? standings[this.props.leagueId] : undefined}
                onTeamClick={this.onTeamClick.bind(this)}
            />
        )
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        leagueId: state.nav.leagueId,
        standings: state.data.mappedLeagueH2hStandings,
        teams: state.nav.teams
    }
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    setTeam: (team: number) => dispatch(setTeam(team)),
    updateGameweekData: (gameweek: number, team: number, leagueId: number) => dispatch(updateGameweekData(gameweek, team, leagueId))
});

export default connect(mapStateToProps, mapDispatchToProps)(LeagueH2hStandingsContainer);