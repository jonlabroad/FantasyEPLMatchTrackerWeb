import { MappedFixtures } from "../data/MappedFixtures";
import { Fixtures } from "../data/fpl/Fixtures";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import BootstrapHelper from "./BootstrapHelper";
import Fixture from "../data/fpl/Fixture";
import { ElementFixtureStatus } from "../data/ElementFixtureStatus";

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

        return this.getFixtureStatus(elementFixtures);
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

    public static getFixtureStatus(fixtures?: Fixtures) {
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
}