import React from "react";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Fixture from "../data/fpl/Fixture";
import { Fixtures } from "../data/fpl/Fixtures";
import ClubIcon from "./ClubIcon";
import Live, { Lives } from "../data/fpl/Live";
import moment from 'moment';

import "../styles/fixture-list.css";
import FixtureBpsList from "./FixtureBpsList";
import Picks from "../data/fpl/Picks";
import PicksHelper from "../util/PicksHelper";

export interface EventFixtureListProps {
    bootstrapStatic?: BootstrapStatic
    fixtures?: Fixtures
    live?: Live
    picks: {[key: string]: Picks}
    team1: number,
    team2: number,
    gameweek: number
}

export default class EventFixtureList extends React.Component<EventFixtureListProps> {
    shouldComponentUpdate(newProps: EventFixtureListProps): boolean {
        return !!(newProps.fixtures && newProps.bootstrapStatic);
    }

    renderTimeBox(fixture: Fixture) {
        const kickoffDate = moment(fixture.kickoff_time);
        return (
        <Box className="fixture-time-box" display="flex" flexDirection="column" alignContent="center" alignItems="center" justifyContent="center">
            <Typography variant="overline">{kickoffDate.format("ddd M/DD")}</Typography>
            <Typography variant="overline">{kickoffDate.format("hh:mm a")}</Typography>
        </Box>
        );
    }

    renderFixtureTeam(teamId: number, bs: BootstrapStatic, direction: string, homeAway: string) {
        const team = bs.teams.find(t => t.id === teamId);
        if (team) {
            return (
            <Box className={`club-name-logo club-name-logo-${homeAway}`} display="flex" flexDirection={direction} flexWrap={'wrap'} justifyContent="space-around">
                <Typography className={`club-name ${homeAway}`} variant="button">{team.short_name}</Typography>
                <ClubIcon teamCode={team.code} size="25px"/>
            </Box>
            );
        }
    }
    
    renderFixtures(fixtures: Fixtures, bs: BootstrapStatic): JSX.Element[] {
        const elements: JSX.Element[] = [];
        for (let fixture of fixtures) {
            elements.push(
            <Box key={fixture.id} display="flex" flexDirection="column" className="fixture-list-element-container">
                <Box display="flex" alignContent="center" alignItems="center" justifyContent="space-around" className="fixture-list-element">
                    {this.renderFixtureTeam(fixture.team_a, bs, "row", "away")}
                    {this.renderScoreOrTime(fixture, bs)}
                    {this.renderFixtureTeam(fixture.team_h, bs, "row-reverse", "home")}
                </Box>
                <FixtureBpsList
                    key={fixture.id}
                    teamPicks={PicksHelper.getMatchPicks(this.props.team1, this.props.team2, this.props.gameweek, this.props.picks)}
                    fixture={fixture} live={this.props.live} bootstrapStatic={this.props.bootstrapStatic}/>
            </Box>
            );
        }
        
        return elements;
    }
    
    renderScoreOrTime(fixture: Fixture, bs: BootstrapStatic) {
        if (!fixture.started) {
            return this.renderTimeBox(fixture);
        }
        else {
            return (
            <Box className="fixture-list-element-in-progress" display="flex" flexDirection="column">
                {this.renderScore(fixture)}
                {this.renderMinutes(fixture)}
            </Box>
            );
        }
    }

    renderScore(fixture: Fixture) {
        return (
            <Box display="flex" flexDirection="row" className="fixture-list-element-score" justifyContent="space-evenly">
                <Typography variant="body1" className="fixture-score-element">{fixture.team_a_score}</Typography>
                <Typography className="fixture-score-element">-</Typography>
                <Typography className="fixture-score-element">{fixture.team_h_score}</Typography>
            </Box>
        )
    }

    renderMinutes(fixture: Fixture) {
        return <div className={`fixture-minutes ${!fixture.finished ? "fixture-in-progress" : "fixture-finished"}`}>
            {!fixture.finished ? `live` : 'FT'}</div>;
    }

    render() {
        const { fixtures, bootstrapStatic } = this.props;
        if (!fixtures || !bootstrapStatic) {
            return null;
        }

        return (
            <Box display="flex" flexDirection="column" className="fixture-list-container">
                <Typography className="fixture-list-header" variant="subtitle1">Fixtures</Typography>
                {this.renderFixtures(fixtures, bootstrapStatic)}
            </Box>
        )
    }
}