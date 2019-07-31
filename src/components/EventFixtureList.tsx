import React from "react";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import { Box } from "@material-ui/core";
import Bootstrap from "../data/fpl/Bootstrap";
import Fixture from "../data/fpl/Fixture";
import { Fixtures } from "../data/fpl/Fixtures";
import ClubIcon from "./ClubIcon";

export interface EventFixtureListProps {
    bootstrap?: Bootstrap
    fixtures?: Fixtures
}

export default class EventFixtureList extends React.Component<EventFixtureListProps> {
    renderFixtures(fixtures: Fixtures, bs: Bootstrap): JSX.Element[] {
        const elements: JSX.Element[] = [];
        for (let fixture of fixtures) {
            elements.push(
            <Box display="flex">
                <ClubIcon teamCode={fixture.team_a}/>
                <div>@</div>
                <ClubIcon teamCode={fixture.team_h}/>
            </Box>
            );
        }
        
        return elements;
    }
    
    render() {
        const { fixtures, bootstrap } = this.props;
        if (!fixtures || !bootstrap) {
            return null;
        }

        return (
            <Box display="flex" flexDirection="column" className="fixture-list-container">
                {this.renderFixtures(fixtures, bootstrap)}
            </Box>
        )
    }
}