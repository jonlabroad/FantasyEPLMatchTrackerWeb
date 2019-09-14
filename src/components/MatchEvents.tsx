import React from "react";
import { ProcessedPlayers } from "../data/ProcessedPlayers";
import { Box, Typography } from "@material-ui/core";
import Picks from "../data/fpl/Picks";
import PicksHelper from "../util/PicksHelper";
import { MatchEvent } from "../data/MatchEvent";
import moment from 'moment';
import MatchEventElement from "./MatchEventElement";

import "../styles/match-events.css"
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";

export interface MatchEventsProps {
    teams: number[]
    gameweek: number
    picks: {[key: string]: Picks}
    processedPlayers?: ProcessedPlayers
    bootstrapStatic?: BootstrapStatic
}

export default class MatchEvents extends React.Component<MatchEventsProps> {
    teamHasElement(teamId?: number, elementId?: number) {
        if (!teamId || !elementId) {
            return false;
        }
        const picks = PicksHelper.getPicks(teamId, this.props.gameweek, this.props.picks);
        if (!picks) {
            return false;
        }
        return picks.picks.find(p => p.element === elementId);
    }
    
    renderEvents(): JSX.Element[] {
        if (!this.props.processedPlayers || !this.props.processedPlayers.players || !this.props.picks || !this.props.teams) {
            return [];
        }
        
        const elements: JSX.Element[] =  [];
        const events: MatchEvent[] = [];
        for (let elementIdStr of Object.keys(this.props.processedPlayers.players)) {
            const elementId = parseInt(elementIdStr);
            if (this.teamHasElement(this.props.teams[0], elementId) || this.teamHasElement(this.props.teams[1], elementId)) {
                events.push(...this.props.processedPlayers.players[elementId].events);
            }
        }

        const sortedEvents = events.sort((a, b) => moment(b.dateTime).valueOf() - moment(a.dateTime).valueOf());
        for (const event of sortedEvents) {
            elements.push(
                <MatchEventElement
                    key={`${event.footballerId} ${event.dateTime} ${event.type}`}
                    event={event}
                    bootstrapStatic={this.props.bootstrapStatic}
                />
            )
        }

        return elements;
    }

    render() {
        const eventElements = this.renderEvents();
        const header = eventElements.length > 0 ? 
            <Typography className="fixture-list-header" variant="subtitle1">Match Commentary</Typography> :
            null;

        return (
        <Box className="match-events" display="flex" flexDirection="column" justifyItems="center" justifyContent="center">
            {header}
            {this.renderEvents()}
        </Box>
        );
    }
}