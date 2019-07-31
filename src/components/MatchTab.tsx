import React from "react";
import PicksListContainer from "../containers/PicksListContainer";
import { Grid } from "@material-ui/core";

export interface MatchTabProps {
    currentTab: number;
    index: number;
}

export default class MatchTab extends React.Component<MatchTabProps> {
    render() {
        if (this.props.currentTab !== this.props.index) {
            return null;
        }
        return (
            <Grid container spacing={3} className="match-tab" justify="center">
                <Grid item xs={4}>
                    <PicksListContainer
                        entryId={2365803}
                        gameweek={1}
                    />
                </Grid>
                <Grid item xs={4}>
                    <PicksListContainer
                        entryId={2365803}
                        gameweek={1}
                    />
                </Grid>
            </Grid>
        );
    }
}