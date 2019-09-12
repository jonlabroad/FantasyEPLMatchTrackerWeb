import { MappedFixtures } from "../data/MappedFixtures";
import { Fixtures } from "../data/fpl/Fixtures";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import BootstrapHelper from "./BootstrapHelper";
import Fixture from "../data/fpl/Fixture";
import { ElementFixtureStatus } from "../data/ElementFixtureStatus";
import Element from "../data/fpl/Element";
import moment from "moment";

export default class FixturesHelper {
    public static getFixtures(eventId: number, mappedFixtures?: MappedFixtures): Fixtures | undefined {
        return mappedFixtures ? mappedFixtures[eventId] : undefined;
    }

    public static getElementFixtureStatus(elementId: number, bootstrap?: BootstrapStatic, fixtures?: Fixtures): ElementFixtureStatus[] | undefined {
        if (!bootstrap || !fixtures) {
            return undefined;
        }

        const elementFixtures = this.getElementFixtures(elementId, bootstrap, fixtures);
        if (!elementFixtures) {
            return undefined;
        }

        return this.getFixtureStatuses(elementFixtures);
    }

    public static getElementFixtures(elementId: number, bootstrap?: BootstrapStatic, fixtures?: Fixtures): Fixture[] | undefined {
        if (!fixtures || !bootstrap) {
            return undefined;
        }
        const element = BootstrapHelper.getElement(elementId, bootstrap);
        if (!element) {
            return undefined;
        }

        return fixtures.filter(f => f.team_a === element.team || f.team_h === element.team);
    }

    public static getFixtureStatuses(fixtures?: Fixtures) {
        if (!fixtures) {
            return undefined;
        }

        return fixtures.map((fixture) => {
            if (fixture.finished) {
                return ElementFixtureStatus.FINISHED;
            }
            if (fixture.finished_provisional) {
                return ElementFixtureStatus.FINISHED_PROVISIONAL;
            }
            if (fixture.started) {
                return ElementFixtureStatus.IN_PROGRESS;
            }
            return ElementFixtureStatus.NOT_STARTED;
        });
    }

    public static getFixtureStatus(fixture?: Fixture): ElementFixtureStatus | undefined {
        if (!fixture) {
            return undefined;
        }

        if (fixture.finished) {
            return ElementFixtureStatus.FINISHED;
        }
        if (fixture.finished_provisional) {
            return ElementFixtureStatus.FINISHED_PROVISIONAL;
        }
        if (fixture.started) {
            return ElementFixtureStatus.IN_PROGRESS;
        }
        return ElementFixtureStatus.NOT_STARTED;
    }

    public static fixtureStatusToString(status?: ElementFixtureStatus): string {
        switch (status) {
            case ElementFixtureStatus.FINISHED: return "Finished";
            case ElementFixtureStatus.FINISHED_PROVISIONAL: return "Provisional";
            case ElementFixtureStatus.IN_PROGRESS: return "In Progress";
            case ElementFixtureStatus.NOT_STARTED: return "Not started";
        }
        return "";
    }

    public static getElementFixtureText(element: Element, fixture?: Fixture, bootstrap?: BootstrapStatic): string {
        if (!fixture || !bootstrap) {
            return "";
        }

        const fixtureStatus = this.getFixtureStatus(fixture);
        let additionalText = "";
        if (fixtureStatus === ElementFixtureStatus.NOT_STARTED) {
            const dateMoment = moment(fixture.kickoff_time);
            additionalText = dateMoment.format("ddd M/D k:mm");
        }
        else {
            additionalText = `${this.fixtureStatusToString(fixtureStatus)}:`;
        }

        const otherTeamId = fixture.team_h === element.team ? fixture.team_a : fixture.team_h;
        const homeAway = fixture.team_h === element.team ? "vs " : "@ ";
        const opponent = bootstrap.teams.find(t => t.id === otherTeamId);
        const opponentName = opponent ? opponent.name : "";
        return `${additionalText} ${homeAway}${opponentName}`;
    }
}