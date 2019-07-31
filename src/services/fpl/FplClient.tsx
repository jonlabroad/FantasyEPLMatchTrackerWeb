import Axios from 'axios';
import IFplClient from './IFplClient';
import { MappedFixtures } from '../../data/MappedFixtures';
import Enumerable from 'linq';
import { Fixtures } from '../../data/fpl/Fixtures';

export default class FplClient implements IFplClient {
    static readonly baseUrl: string = 'https://fkcc5km0gj.execute-api.us-east-1.amazonaws.com/prod';
    static readonly leagueH2hPath = "/leagues-h2h-standings/{LEAGUE_ID}";
    static readonly footballerDetailsPath = "/element-summary/{FOOTBALLER_ID}";
    static readonly leagueH2hMatchesPath = "/leagues-entries-and-h2h-matches/league/{LEAGUE_ID}?page={PAGE}";

    async bootstrap() {
        return await this.get(`bootstrap`);
    }

    async bootstrapStatic() {
        return await this.get(`bootstrap-static`);
    }

    async live(eventId: number) {
        return await this.get(`${this.eventUrl(eventId)}/live`);
    }

    async history(entryId: number) {
        return await this.get(this.historyUrl(entryId));
    }

    async fixtures(eventId?: number): Promise<MappedFixtures> {
        const fixtures: Fixtures = await this.get(this.fixtureUrl(eventId));
        if (eventId) {
            return {[eventId]: fixtures};
        }
        let mapped: MappedFixtures = {};
        const allEvents = Enumerable.from(fixtures).select(f => f.event).distinct().toArray();
        for (let event of allEvents) {
            mapped[event] = Enumerable.from(fixtures).where(f => f.event === event).toArray();
        }
        return mapped;
    }

    async leaguesH2hMatches(leagueId: number) {
        // TODO pagination required?
        return await this.get(this.historyUrl(leagueId));
    }

    async entryEvent(entryId: number, eventId: number) {
        return await this.get(this.entryEventUrl(entryId, eventId));
    }

    async event(eventId: number) {
        return await this.get(this.eventUrl(eventId));
    }

    async entry(entryId: number) {
        return await this.get(this.entryUrl(entryId));
    }

    async get(path: string) {
        return (await Axios.get(`${FplClient.baseUrl}/${path}`)).data; 
    }

    async picks(entryId: number, gameweek: number) {
        return await this.get(this.picksUrl(entryId, gameweek));
    }

    historyUrl(entryId: number) {
        return `${this.entryUrl(entryId)}/history`;
    }

    picksUrl(entryId: number, eventId: number) {
        return `${this.entryEventUrl(entryId, eventId)}/picks`;
    }

    liveUrl(eventId: number) {
        return `${this.eventUrl(eventId)}/live`;
    }

    leaguesH2hMatchesUrl(leagueId: number, page: number = 0) {
        return `leagues-entries-and-h2h-matches/league/${leagueId}?page=${page}`;
    }

    eventUrl(eventId: number) {
        return `event/${eventId}`;
    }

    entryEventUrl(entryId: number, eventId: number) {
        return `${this.entryUrl(entryId)}/event/${eventId}`;
    }

    entryUrl(entryId: number) {
        return `entry/${entryId}`;
    }

    fixtureUrl(eventId?: number) {
        return `fixtures${eventId ? `?event=${eventId}` : ''}`;
    }
}