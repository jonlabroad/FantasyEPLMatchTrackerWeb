import React from "react";
import { LeagueFixtures, LeagueFixture } from "../data/LeagueFixtures";
import { Typography, Box, Grid } from "@material-ui/core";

export interface MatchStatusStripProps {
    fixtures?: LeagueFixture[]
}

export default class MatchStatusStrip extends React.Component<MatchStatusStripProps> {
    renderFixture(fixture: LeagueFixture): JSX.Element {
        return (
            <Box display="flex" flexDirection="row" className="match-status-strip-fixture">
                <Box className="match-status-team-name-container" alignContent="center" alignItems="center" justifyContent="center" justifyItems="center">
                    <Typography variant="caption" className="match-status-team match-status-team-a">{fixture.entry_1_name}</Typography>
                </Box>
                <Box display="flex" alignContent="center" alignItems="center" justifyContent="center" justifyItems="center">
                    <Typography variant="caption" className="match-status-vs">vs</Typography>
                </Box>
                <Box className="match-status-team-name-container" alignContent="center" alignItems="center" justifyContent="center" justifyItems="center">
                    <Typography variant="caption" className="match-status-team match-status-team-h">{fixture.entry_2_name}</Typography>
                </Box>
            </Box>
        );
    }
    
    renderFixtures(fixtures: LeagueFixture[]): JSX.Element[] {
        return fixtures.map(f => this.renderFixture(f));
    }
    
    render() {
        if (!this.props.fixtures) {
            return null;
        }

        return (
            <Grid className="match-header-container" container spacing={3}>
                <Grid item xs={10}>
                    <Box display="flex" flexDirection="row" className="match-status-strip-container">
                    {this.renderFixtures(this.props.fixtures)}
                </Box>
                </Grid>
            </Grid>
        );
    }
}