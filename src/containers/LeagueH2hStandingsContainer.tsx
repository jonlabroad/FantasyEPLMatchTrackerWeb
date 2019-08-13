import React, { Dispatch } from "react";
import { MappedLeaguesH2hStandings } from "../data/fpl/LeaguesH2hStandings";
import { TrackerState } from "../types";
import { RootAction } from "../actions";
import { connect } from "react-redux";
import LeagueH2hStandingsList from "../components/LeagueH2hStandingsList";

export interface LeagueH2hStandingsContainerProps {
    
    leagueId: number
    standings?: MappedLeaguesH2hStandings
}

export class LeagueH2hStandingsContainer extends React.Component<LeagueH2hStandingsContainerProps> {
    render() {
        const { standings, leagueId } = this.props;
        return (
            <LeagueH2hStandingsList
                standings={standings ? standings[this.props.leagueId] : undefined}
            />
        )
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        leagueId: state.nav.leagueId,
        standings: state.data.mappedLeagueH2hStandings,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(LeagueH2hStandingsContainer);