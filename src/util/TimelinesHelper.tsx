import GameweekTimeline, { MappedGameweekTimelines, GameweekTimelineEntry } from "../data/GameweekTimeline";
import Picks from "../data/fpl/Picks";
import ScoreCalculator from "./ScoreCalculator";
import LiveElement from "../data/fpl/LiveElement";
import Fixture from "../data/fpl/Fixture";
import moment from "moment";
import { ExplainElement } from "../data/fpl/ExplainElement";
import { ProcessedPlayers } from "../data/ProcessedPlayers";
import * as Highcharts from "highcharts";

export interface TimelineBin {
    start: moment.Moment
    end: moment.Moment
    fixtures: Fixture[]
}

export interface TimelineDataEntry {
    x: number,
    y: number,
    events: {
        explain: ExplainElement
        elementId: number
    }[]
}

export default class TimelinesHelper {
    public static getTimeline(gameweek: number, timelines: MappedGameweekTimelines): GameweekTimeline | undefined {
        return timelines ? timelines[gameweek] : undefined;
    }

    public static getDataSeries(timeline: GameweekTimeline, picks: Picks, bins: TimelineBin[]): Highcharts.SeriesLineDataOptions[] {
        if (!timeline || !timeline.timeline) {
            return [];
        }

        var allLives = [];
        var data = [];
        var i = 0;
        for (let entry of timeline.timeline) {
            allLives.push(...entry.diff);
            const score = ScoreCalculator.calculateTeamScoreFromElements(picks, allLives);
            const xMoment = moment(entry.timestamp);
            data.push({x: this.calculateX(xMoment, bins), y: score.startingScore});
            i++;
        }
        return data;
    }

    public static getPrediction(timeline: GameweekTimeline, picks: Picks, bins: TimelineBin[]): Highcharts.SeriesLineDataOptions[] {
        if (!timeline || !timeline.timeline) {
            return [];
        }
        
        var allLives = [];
        var data = [];
        var i = 0;
        for (let entry of timeline.timeline) {
            if (entry.predictionDiff) {
                if (entry.predictionDiff.length > 0) {
                    const amn = entry.predictionDiff.find(pd => pd.id === 4);
                    if (amn) {
                        console.log(amn.explain.map(e => `${i}: ${e.stats.map(s => `${s.identifier} ${s.points}`)}`));
                    }
                }
                allLives.push(...entry.predictionDiff);
                //const score = ScoreCalculator.calculateTeamScoreFromElements(picks, allLives);
                const score = this.getPredictedScore(picks, allLives);
                const xMoment = moment(entry.timestamp);
                //data.push({x: this.calculateX(xMoment, bins), y: score.startingScore});
                data.push({x: this.calculateX(xMoment, bins), y: score});
                i++;
            }
        }
        return data;
    }

    public static getLatestPredictionElements(timeline: GameweekTimeline, picks?: Picks): LiveElement[] {
        if (!picks || !timeline || !timeline.timeline || timeline.timeline.length <= 0 || !picks) {
            return [];
        }
        const prediction = timeline.prediction;
        const pickIds = picks.picks.map(p => p.element);
        return prediction ? prediction.filter(p => pickIds.includes(p.id)) : [];
    }

    public static getTimelineBins(fixtures: Fixture[]): TimelineBin[] {
        const bins: TimelineBin[] = [];
        var remaining: Fixture[] = [];
        remaining.push(...fixtures);

        while (remaining.length > 0) {
            var minDateString: string | undefined = undefined;
            var minDate: moment.Moment | undefined = undefined;
    
            remaining.forEach(f => {
                const fixtureDate = moment(f.kickoff_time);
                if (!minDate || fixtureDate.isBefore(minDate)) {
                    minDateString = f.kickoff_time;
                    minDate = fixtureDate;
                }
            });

            const minDateFixtures = remaining.filter(f => f.kickoff_time === minDateString);
            const kickoffTimeMoment = moment(minDateFixtures[0].kickoff_time);
            const endMoment = moment(minDateFixtures[0].kickoff_time).add(2, "hours");
            bins.push({
                start: kickoffTimeMoment,
                end: endMoment,
                fixtures: minDateFixtures
            });
            remaining = remaining.filter(f => !minDateFixtures.includes(f));
        }
        return bins;
    }

    private static getPredictedScore(picks: Picks, preds: LiveElement[]): number {
        let score  = 0;
        const reversed = preds.slice(0).reverse();
        for (let i = 0; i < 15; i++) {
            const pick = picks.picks[i];
            const latestPred = reversed.find(p => p.id === pick.element);
            if (latestPred) {
                score += latestPred.score * pick.multiplier;
            }
        }
        return score;
    }

    public static getMatchEventScatter(picks?: Picks, processedPlayers?: ProcessedPlayers, bins?: TimelineBin[]): {x: number, y: number, type: string}[][] {
        if (!picks || !processedPlayers || !bins) {
            return [];
        }

        const allSeries: {x: number, y: number, type: string}[][] = [];
        const eventTypes = new Set<string>(Object.keys(processedPlayers.players).map((k:any) => processedPlayers.players[k].events.map(e => e.typeString)).flat());
        eventTypes.forEach(eventType => {
            const points: {x: number, y: number, type: string}[] = [];
            picks.picks.forEach((pick, i) => {
                const processedPlayer = processedPlayers.players[pick.element];
                if (processedPlayer) {
                    const events = processedPlayer.events.filter(e => e.typeString === eventType);
                    events.forEach((event, i) => {
                        var t = moment(event.dateTime);
                        points.push({
                            x: this.calculateX(t, bins),
                            y: 1,
                            type: event.typeString
                        })
                    });
                }
            });
            if (points.length > 0) {
                allSeries.push(points);
            }
        });
        return allSeries;
    }

    private static calculateX(t: moment.Moment, bins: TimelineBin[]): number {
        // Find which bin t is in
        let binIndex = bins.findIndex(bin => t.isAfter(bin.start) && t.isBefore(bin.end));
        if (binIndex < 0) {
            // Find the closest start/end position
            var minDistance: number | undefined = undefined;
            var minBinIndex: number | undefined = undefined;
            bins.forEach((bin, i) => {
                var diff = Math.abs(t.diff(bin.start));
                if (!minDistance || diff < minDistance) {
                    minDistance = diff;
                    minBinIndex = i;
                }
                diff = Math.abs(t.diff(bin.end));
                if (diff < minDistance) {
                    minDistance = diff;
                    minBinIndex = i;
                }
            });

            if (!minBinIndex) {
                return 0;
            }
            binIndex = minBinIndex;
        }

        const bin = bins[binIndex];
        
        // Map to 0 to 1 within bin, pinned to 0 or 1
        let rel = (t.unix() - bin.start.unix()) / (bin.end.unix() - bin.start.unix());
        rel = Math.min(1, rel);
        rel = Math.max(0, rel);
        const x = rel + binIndex;

        return x;
    }

    private static getEvents(entry: GameweekTimelineEntry, picks: Picks) {
        const first11 = picks.picks.slice(0, 10);
        const first11Ids = first11.map(p => p.element);
        const allPickEvents = entry.diff.filter(d => first11Ids.includes(d.id));
        const allPickExplains = allPickEvents.map(e => e.explain[0].stats).flat();
        //const relevantEvents = allPickExplains.filter()
    }
}