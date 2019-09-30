import LiveElement from "./fpl/LiveElement";

export type MappedGameweekTimelines = {[key: number]: GameweekTimeline};

export interface GameweekTimelineEntry {
    timestamp: string
    diff: LiveElement[]
    predictionDiff: LiveElement[]
}

export default interface GameweekTimeline {
    isStarted: boolean
    isFinished: boolean
    liveElements: LiveElement[]
    prediction: LiveElement[]
    timeline: GameweekTimelineEntry[]
}