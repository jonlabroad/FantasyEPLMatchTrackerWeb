import Axios from 'axios';
import IFplClient from './IFplClient';
import { MappedFixtures } from '../../data/MappedFixtures';
import Enumerable from 'linq';
import { Fixtures } from '../../data/fpl/Fixtures';
import Entry from '../../data/fpl/Entry';
import LeaguesH2hStandings from '../../data/fpl/LeaguesH2hStandings';
import { ProcessedPlayers } from '../../data/ProcessedPlayers';
import EventStatus from '../../data/fpl/EventStatus';
import { LeagueFixtures } from '../../data/LeagueFixtures';
import Picks from '../../data/fpl/Picks';
import EntryHistory from '../../data/fpl/EntryHistory';
import Live from '../../data/fpl/Live';
import GameweekTimeline from '../../data/GameweekTimeline';
import CacheHelper from '../../util/CacheHelper';
import { BootstrapStatic } from '../../data/fpl/BootstrapStatic';
import { CacheExpiryType } from '../../data/CacheData';

export default class FplClient implements IFplClient {
    static readonly baseUrl: string = 'https://fkcc5km0gj.execute-api.us-east-1.amazonaws.com/prod';
    static readonly leagueH2hPath = "/leagues-h2h-standings/{LEAGUE_ID}";
    static readonly footballerDetailsPath = "/element-summary/{FOOTBALLER_ID}";
    static readonly leagueH2hMatchesPath = "/leagues-entries-and-h2h-matches/league/{LEAGUE_ID}?page={PAGE}";

    async bootstrap() {
        return await this.get(`bootstrap`);
    }

    async bootstrapStatic() {
        var cached = CacheHelper.getCached<BootstrapStatic>('bootstrap-static');
        if (!cached) {
            var newData = await this.get(`bootstrap-static`);
            CacheHelper.setCache<BootstrapStatic>("bootstrap-static", CacheExpiryType.DAILY, newData);
            return newData;
        }
        return cached;
    }

    async live(eventId: number): Promise<Live> {
        return await this.get(`${this.eventUrl(eventId)}/live`);
    }

    async history(entryId: number): Promise<EntryHistory> {
        const url = this.historyUrl(entryId);
        var cached = CacheHelper.getCached<EntryHistory>(url);
        if (!cached) {
            var newData = await this.get(this.historyUrl(entryId));
            CacheHelper.setCache<EntryHistory>(url, CacheExpiryType.DAILY, newData);
            return newData;
        }
        return cached;
    }

    async fixtures(eventId?: number): Promise<MappedFixtures> {
        const key = this.fixtureUrl(eventId);
        var fixtures = CacheHelper.getCached<Fixtures>(key);
        if (!fixtures) {
            fixtures = await this.get(this.fixtureUrl(eventId)) as Fixtures;
        }
        
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

    async leaguesH2hStandings(leagueId: number): Promise<LeaguesH2hStandings> {
        return await this.get(this.leaguesH2hStandingsUrl(leagueId));
    }

    async entryEvent(entryId: number, eventId: number) {
        return await this.get(this.entryEventUrl(entryId, eventId));
    }

    async event(eventId: number) {
        return await this.get(this.eventUrl(eventId));
    }

    async eventStatus(): Promise<EventStatus> {
        return await this.get(this.eventStatusUrl());
    }

    async entry(entryId: number): Promise<Entry> {
        const response = await this.get(this.entryUrl(entryId));
        return response
    }

    async get(path: string) {
        return (await Axios.get(`${FplClient.baseUrl}/${path}`)).data; 
    }

    async picks(entryId: number, gameweek: number): Promise<Picks | undefined> {
        const url = this.picksUrl(entryId, gameweek)
        var cached = CacheHelper.getCached<Picks>(url);
        if (!cached) {
            var newData = await this.get(url);
            if (!newData.picks) {
                return undefined;
            }
            CacheHelper.setCache<Picks>(url, CacheExpiryType.DAILY, newData);
            return newData;
        }
        return cached;
    }

    async processedPlayers(eventId: number): Promise<ProcessedPlayers> {
        return await this.get(this.processedPlayersUrl(eventId));
    }

    async leagueFixtures(leagueId: number): Promise<LeagueFixtures> {
        const key = this.leagueFixturesUrl(leagueId);
        var cached = CacheHelper.getCached<LeagueFixtures>(key);
        if (!cached) {
            const newData = await this.get(this.leagueFixturesUrl(leagueId));
            CacheHelper.setCache(key, CacheExpiryType.DAILY, newData);
            return newData;
        }
        return cached;
    }

    async gameweekTimeline(gameweek: number): Promise<GameweekTimeline> {
        return await this.get(this.gameweekTimelineUrl(gameweek));
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

    leaguesH2hStandingsUrl(leagueId: number, page: number = 1) {
        return `processed/league/${leagueId}/standings`;
    }

    eventUrl(eventId: number) {
        return `event/${eventId}`;
    }

    eventStatusUrl() {
        return `event-status`;
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

    processedPlayersUrl(eventId: number) {
        return `processed/players/${eventId}`;
    }

    leagueFixturesUrl(leagueId: number) {
        return `processed/league/${leagueId}/fixtures`;
    }

    gameweekTimelineUrl(gameweek: number) {
        return `processed/players/${gameweek}/timeline`;
    }
}