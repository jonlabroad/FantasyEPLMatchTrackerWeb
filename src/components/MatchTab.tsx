import React from "react";
import PicksListContainer from "../containers/PicksListContainer";
import { Grid, Hidden, FormLabel, Switch } from "@material-ui/core";
import EventFixtureListContainer from "../containers/EventFixtureListContainer";
import MatchEventsContainer from "../containers/MatchEventsContainer";
import LeagueH2hStandingsContainer from "../containers/LeagueH2hStandingsContainer";

export interface MatchTabProps {
    currentTab: number;
    gameweek: number;
    teams: number[]
    index: number;
    differentialsOnly: boolean

    onDifferentialsChange: any
}

export default class MatchTab extends React.Component<MatchTabProps> {
    renderDifferentialsSelector() {
        return (
            this.props.teams.length > 1 && 
            <React.Fragment>
                <FormLabel>Differentials Only</FormLabel>
                <Switch
                    checked={this.props.differentialsOnly}
                    onChange={this.props.onDifferentialsChange}
                />
            </React.Fragment>
        )
    }
    
    render() {
        if (this.props.currentTab !== this.props.index) {
            return null;
        }
        return (
            <Grid container justify="center" spacing={2} className="match-tab">
                <Hidden smDown><Grid item xs={1}></Grid></Hidden>
                <Grid item xs={12} sm={10}>{this.renderDifferentialsSelector()}</Grid>
                <Hidden smDown><Grid item xs={1}></Grid></Hidden>

                <Hidden smDown><Grid item md={1}></Grid></Hidden>
                <Grid item xs={12} sm={6} md={5}>
                    <PicksListContainer
                        entryId={this.props.teams[0]}
                        otherEntryId={this.props.teams[1]}
                        gameweek={this.props.gameweek}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                    <PicksListContainer
                        entryId={this.props.teams[1]}
                        otherEntryId={this.props.teams[0]}
                        gameweek={this.props.gameweek}
                    />
                </Grid>
                <Hidden smDown><Grid item md={1}></Grid></Hidden>

                <Grid item xs={12} sm={3} md={2}>
                    <EventFixtureListContainer gameweek={this.props.gameweek}/>
                </Grid>
                <Grid item xs={12} sm={5} md={5}>
                    <LeagueH2hStandingsContainer />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <MatchEventsContainer/>
                </Grid>
            </Grid>
        );
    }
}