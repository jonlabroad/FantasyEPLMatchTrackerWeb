import React, { Dispatch } from "react";
import TrackerDrawer from "../components/TrackerDrawer";
import { TrackerState } from "../types";
import { Action } from "redux";
import { drawerOpenClose, setTeam, updateGameweekData, setLeague } from "../actions";
import { connect } from "react-redux";
import { MappedLeaguesH2hStandings } from "../data/fpl/LeaguesH2hStandings";
import Entry from "../data/fpl/Entry";

export interface DrawerContainerProps {
    leagueId: number
    entries: {[key: number]: Entry}
    open: boolean
    mappedStandings?: MappedLeaguesH2hStandings
    selectedTeam: number

    drawerOpenClose: any
    setTeam: any
    setLeague: any
    updateGameweekData: any
}

export class DrawerContainer extends React.Component<DrawerContainerProps> {
    onDrawerOpen() {
        this.props.drawerOpenClose(true);
    }

    onDrawerClose() {
        this.props.drawerOpenClose(false);
    }

    onTeamSelect(ev: any) {
        const teamId = parseInt(ev.target.value);
        this.props.setTeam(teamId);
        this.props.updateGameweekData(undefined, teamId);
    }

    onLeagueSelect(ev: any) {
        const leagueId = parseInt(ev.target.value);
        this.props.setLeague(leagueId);
        this.props.updateGameweekData(leagueId, undefined);
    }

    render() {
        const standing = this.props.mappedStandings ? this.props.mappedStandings[this.props.leagueId] : null;
        if (!standing) {
            return null;
        }
        
        return <TrackerDrawer
            open={this.props.open}
            team={this.props.selectedTeam}
            standings={standing}
            entries={this.props.entries}
            leagueId={this.props.leagueId}
            onClose={this.onDrawerClose.bind(this)}
            onTeamSelect={this.onTeamSelect.bind(this)}
            onLeagueSelect={this.onLeagueSelect.bind(this)}
        />
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        leagueId: state.nav.leagueId,
        open: state.nav.drawerOpen,
        mappedStandings: state.data.mappedLeagueH2hStandings,
        selectedTeam: state.nav.team,
        entries: state.data.entries
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    drawerOpenClose: (open: boolean) => dispatch(drawerOpenClose(open)),
    setTeam: (teamId: number) => dispatch(setTeam(teamId)),
    setLeague: (league: number) => dispatch(setLeague(league)),
    updateGameweekData: (leagueId: number, teamId: number) => dispatch(updateGameweekData(undefined, teamId, leagueId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);