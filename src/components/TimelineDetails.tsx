import React from "react";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import Entry from "../data/fpl/Entry";
import Picks from "../data/fpl/Picks";
import LiveElement from "../data/fpl/LiveElement";
import GameweekTimeline from "../data/GameweekTimeline";
import TimelinesHelper from "../util/TimelinesHelper";
import BootstrapHelper from "../util/BootstrapHelper";

export interface TimelineDetailsProps {
    bootstrap: BootstrapStatic
    entries: Entry
    picks: Picks
    timeline: GameweekTimeline
}

export default class TimelineDetails extends React.Component<TimelineDetailsProps> {
    shouldComponentUpdate(newProps: TimelineDetailsProps): boolean {
        return !!(newProps.bootstrap && newProps.entries && newProps.timeline && newProps.picks);
    }
    
    render() {
        const { bootstrap, entries, picks, timeline } = this.props;

        const latestPrediction = TimelinesHelper.getLatestPredictionElements(timeline, picks);
        const predElements: JSX.Element[] = [];
        latestPrediction.forEach(p => {
            return p.explain.forEach(e => {
                e.stats.forEach(s => {
                    const element = BootstrapHelper.getElement(p.id, bootstrap);
                    predElements.push(<div key={`${element ? element.web_name : "???"} ${s.identifier}`}>{`${element ? element.web_name : "???"} ${s.identifier} ${s.points} ${s.value}`}</div>)
                })
            });
        });

        return (
            <div>{predElements}</div>
        );
    }
}