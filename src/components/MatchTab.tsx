import React from "react";
import PicksListContainer from "../containers/PicksListContainer";
import { Grid } from "@material-ui/core";
import EventFixtureListContainer from "../containers/EventFixtureListContainer";
import MatchEventsContainer from "../containers/MatchEventsContainer";

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
            <Grid container spacing={3} className="match-tab" justify="center">
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                    <PicksListContainer
                        entryId={this.props.teams[0]}
                        gameweek={this.props.gameweek}
                    />
                </Grid>
                <Grid item xs={5}>
                    <PicksListContainer
                        entryId={this.props.teams[1]}
                        gameweek={this.props.gameweek}
                    />
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <EventFixtureListContainer gameweek={this.props.gameweek}/>
                </Grid>
                <Grid item xs={3}>
                    <MatchEventsContainer/>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        );
    }
}