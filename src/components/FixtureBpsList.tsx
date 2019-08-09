import React from "react";
import Live from "../data/fpl/Live";
import Fixture from "../data/fpl/Fixture";
import Picks from "../data/fpl/Picks";
import Element from "../data/fpl/Element";
import LiveHelper from "../util/LiveHelper";
import { Box, Typography, List, ListItem, IconButton } from "@material-ui/core";
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";

export interface FixtureBpsListProps {
    teamPicks: Picks[]
    fixture?: Fixture
    live?: Live
    bootstrapStatic?: BootstrapStatic
}

export interface FixtureBpsListState {
    displayAll: boolean;
}


export default class FixtureBpsList extends React.Component<FixtureBpsListProps, FixtureBpsListState> {
    constructor(props: FixtureBpsListProps) {
        super(props);
        this.state = {
            displayAll: false
        }
    }

    getFootballer(elementId: number, bs: BootstrapStatic) {
        return bs.elements.find(e => e.id == elementId);
    }

    getClubPlayers(clubId: number, bootstrap: BootstrapStatic): Element[] {
        return bootstrap.elements.filter(el => el.team === clubId);
    }

    getLiveData(elementId: number, live: Live) {
        return LiveHelper.getElement(elementId);
    }
    
    onExpandClick(event: any) {
        this.setState({
            ... this.state,
            displayAll: !this.state.displayAll
        });
    }

    renderStars(rank: number, onTeam: boolean, isLeft: boolean) {
        const styles = {
            largeIcon: {
                width: '100%',
                height: '100%'
            }
        }
        const stars = [];
        let numStars = 0;
        if (rank === 1) numStars = 3;
        if (rank === 2) numStars = 2;
        if (rank === 3) numStars = 1;
        for (let i = 0; i < numStars; i++) {
            stars.push(<div className="bonus-star-container">
                {onTeam ? <Star className="bonus-star-filled" style={styles.largeIcon}/> :
                          <StarBorder className="bonus-star" style={styles.largeIcon}/>}
            </div>);
        }

        return <Box className="bonus-stars" display="flex" flexDirection="row" justifyContent={isLeft ? "flex-start" : "flex-end"}>
            {stars}
        </Box>
    }

    renderPicks(live: Live, fixture: Fixture, teamPicks: Picks[], bootstrap: BootstrapStatic): JSX.Element[] {
        const clubIds = [fixture.team_a, fixture.team_h];
        const clubElements = this.getClubPlayers(clubIds[0], bootstrap);
        const fixtureElements = clubElements.concat(this.getClubPlayers(clubIds[1], bootstrap));
        const activeFixtureElements = fixtureElements.map(fixEl => ({element: fixEl, live: LiveHelper.getElement(fixEl.id, live)}))
            .filter(elStats => elStats && elStats.live && elStats.live.stats.minutes > 0)
            .sort((a, b) => {
                if (!a.live|| !b.live) return 0; // Will never happen, compiler dumb
                return b.live.stats.bps - a.live.stats.bps;
            });
        const renderElements: JSX.Element[] = [];
        for (let i = 0; i < activeFixtureElements.length; i++) {
            const fixtureStats = activeFixtureElements[i];
            const rank = i + 1;
            if (!fixtureStats.live) continue;
            const elementBps = fixtureStats.live.stats.bps;
            const elementOnTeam1 = !!(teamPicks[0] && teamPicks[0].picks.find(p => p.element === fixtureStats.element.id));
            const elementOnTeam2 = !!(teamPicks[1] && teamPicks[1].picks.find(p => p.element == fixtureStats.element.id));
            if (this.state.displayAll || (elementOnTeam1 || elementOnTeam2)) {
                renderElements.push((
                <Box className="bps-table-element" display="flex" flexDirection="row" justifyContent="center">
                    {this.renderStars(rank, elementOnTeam1, true)}
                    <Typography variant="body2" className="bps-element-name">{fixtureStats.element.web_name}</Typography>
                    <Typography variant="body2" className="bps-element-bps">{elementBps}</Typography>
                    {this.renderStars(rank, elementOnTeam2, false)}
                </Box>
                ));
            }
        }
        return renderElements;
    }
    
    render() {
        const {live, fixture, teamPicks, bootstrapStatic} = this.props;

        if (!live || !fixture || !teamPicks || !bootstrapStatic) {
            return null;
        }

        const renderedElements = this.renderPicks(live, fixture, teamPicks, bootstrapStatic);
        if (renderedElements.length <= 0) {
            return null;
        }

        return (
            <Box className="fixture-bps-list" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                {renderedElements}
                <IconButton size="small" onClick={this.onExpandClick.bind(this)}>{this.state.displayAll ? <ExpandLess/> : <ExpandMore/>}</IconButton>
            </Box>
        );
    }
}