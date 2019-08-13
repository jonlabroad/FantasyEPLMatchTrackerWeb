import React from "react";
import PicksListContainer from "../containers/PicksListContainer";
import { Grid, Hidden } from "@material-ui/core";
import EventFixtureListContainer from "../containers/EventFixtureListContainer";
import MatchEventsContainer from "../containers/MatchEventsContainer";
import LeagueH2hStandingsContainer from "../containers/LeagueH2hStandingsContainer";

export interface MatchTabProps {
    currentTab: number;
    gameweek: number;
    teams: number[]
    index: number;
}

export default class MatchTab extends React.Component<MatchTabProps> {
    render() {
        if (this.props.currentTab !== this.props.index) {
            return null;
        }
        return (
            <Grid container justify="center" spacing={2} className="match-tab">
                <Hidden xsDown><Grid item md={1}></Grid></Hidden>
                <Grid item xs={12} sm={5}>
                    <PicksListContainer
                        entryId={this.props.teams[0]}
                        gameweek={this.props.gameweek}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <PicksListContainer
                        entryId={this.props.teams[1]}
                        gameweek={this.props.gameweek}
                    />
                </Grid>
                <Hidden xsDown><Grid item md={1}></Grid></Hidden>

                <Grid item xs={12} sm={2}>
                    <EventFixtureListContainer gameweek={this.props.gameweek}/>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <LeagueH2hStandingsContainer />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <MatchEventsContainer/>
                </Grid>
            </Grid>
        );
    }
}