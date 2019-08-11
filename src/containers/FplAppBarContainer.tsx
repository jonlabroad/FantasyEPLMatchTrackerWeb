import React, { ChangeEvent } from "react";
import { Dispatch } from "redux";
import { TrackerState } from "../types";
import { RootAction, tabSelect, receiveLeagueFixtures, receivePicks, receiveLive, setTeam } from "../actions";
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
import { MappedLeaguesH2hStandings } from "../data/fpl/LeaguesH2hStandings";
import FplAppBar from "../components/FplAppBar";

export interface FplAppBarContainerProps {
    leagueId: number
    selectedTeam: number

    mappedLeagueH2hStandings?: MappedLeaguesH2hStandings
    setTeam: any
}

export class FplAppBarContainer extends React.Component<FplAppBarContainerProps> {
    onTeamSelect(event: any) {
        console.log(event.target.value);
        this.props.setTeam(event.target.value);
    }
    
    render() {
        const { mappedLeagueH2hStandings, leagueId, selectedTeam} = this.props;
        return (
        <FplAppBar
            selectedTeam={selectedTeam}
            mappedStandings={mappedLeagueH2hStandings}
            leagueId={leagueId}
            onTeamSelect={this.onTeamSelect.bind(this)}
        />
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        leagueId: state.nav.leagueId,
        mappedLeagueH2hStandings: state.data.mappedLeagueH2hStandings,
        selectedTeam: state.nav.team
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    setTeam: (teamId: number) => dispatch(setTeam(teamId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FplAppBarContainer);