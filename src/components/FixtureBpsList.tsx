import React from "react";
import Live from "../data/fpl/Live";
import Fixture from "../data/fpl/Fixture";
import Picks from "../data/fpl/Picks";
import Bootstrap from "../data/fpl/Bootstrap";
import Element from "../data/fpl/Element";
import LiveHelper from "../util/LiveHelper";
import { Box, Typography } from "@material-ui/core";

export interface FixtureBpsListProps {
    teamPicks: Picks[]
    fixture?: Fixture
    live?: Live
    bootstrap?: Bootstrap
}

export default class FixtureBpsList extends React.Component<FixtureBpsListProps> {
    getFootballer(elementId: number, bs: Bootstrap) {
        return bs.elements.find(e => e.id == elementId);
    }

    getClubPlayers(clubId: number, bootstrap: Bootstrap): Element[] {
        return bootstrap.elements.filter(el => el.team === clubId);
    }

    getLiveData(elementId: number, live: Live) {
        return LiveHelper.getElement(elementId);
    }
    
    renderPicks(live: Live, fixture: Fixture, teamPicks: Picks[], bootstrap: Bootstrap): JSX.Element[] {
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
        for (let fixtureStats  of activeFixtureElements) {
            if (!fixtureStats.live) continue;
            const elementBps = fixtureStats.live.stats.bps;
            const elementOnTeam1 = !!teamPicks[0].picks.find(p => p.element === fixtureStats.element.id);
            const elementOnTeam2 = !!teamPicks[1] && teamPicks[1].picks.find(p => p.element == fixtureStats.element.id);
            renderElements.push((
            <Box className="bps-table-element" display="flex" flexDirection="row">
                <Typography variant="body2" className="bps-element-name">{fixtureStats.element.web_name}</Typography>
                <Typography variant="body2" className="bps-element-bps">{elementBps}</Typography>
            </Box>
            ));
        }
        return renderElements;
    }
    
    render() {
        const {live, fixture, teamPicks, bootstrap} = this.props;

        if (!live || !fixture || !teamPicks || !bootstrap) {
            return null;
        }

        return (
            <Box className="fixture-bps-list" display="flex" flexDirection="column">
                {this.renderPicks(live, fixture, teamPicks, bootstrap)}
            </Box>
        );
    }
}