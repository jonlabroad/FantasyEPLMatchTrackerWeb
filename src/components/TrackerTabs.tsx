import React, { ChangeEvent } from "react";
import { AppBar, Tabs, Tab, Grid } from "@material-ui/core";
import MatchTab from "./MatchTab";
import TeamsTab from "./TeamsTab";
import MatchTabContainer from "../containers/MatchTabContainer";
import TeamsTabContainer from "../containers/TeamsTabContainer";

export interface TrackerTabsProps {
    currentTab: number;
    gameweek: number;
    teams: number[];

    tabChanged: (event: ChangeEvent<{}>, value: any) => void;
}

export default class TrackerTabs extends React.Component<TrackerTabsProps> {
    render() {
        return (
            <Grid container className="tracker-tabs-container" justify="center">
                <Grid item xs={12} sm={10}>
                <AppBar className="tracker-tabs-appbar" position="static" color="default">
                    <Tabs
                        value={this.props.currentTab}
                        onChange={this.props.tabChanged}
                    >
                    <Tab label="Match"/>
                    <Tab label="Teams"/>
                    </Tabs>
                </AppBar>
                </Grid>
                <MatchTabContainer index={0}>
                    
                </MatchTabContainer>
                <TeamsTabContainer currentTab={this.props.currentTab} index={1}></TeamsTabContainer>
            </Grid>
        );
    }
}