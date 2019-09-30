import React from "react";
import GameweekTimeline from "../data/GameweekTimeline";
import { BootstrapStatic } from "../data/fpl/BootstrapStatic";
import Entry from "../data/fpl/Entry";
import Picks from "../data/fpl/Picks";
import TimelinesHelper, { TimelineBin } from "../util/TimelinesHelper";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryScatter, VictoryLabel } from "victory";
import Fixture from "../data/fpl/Fixture";
import { ProcessedPlayers } from "../data/ProcessedPlayers";
import GameweekTimelineEventIcon from "./GameweekTimelineEventIcon";
import HighchartsReact from "highcharts-react-official";

import "../styles/gameweek-timeline.css"
import Highcharts, { AxisLabelsFormatterContextObject, XAxisOptions, XAxisLabelsOptions } from "highcharts";

export interface GameweekTimelinePlotProps {
    bootstrap: BootstrapStatic
    entries: Entry[]
    picks: Picks[]
    fixtures?: Fixture[]
    timeline: GameweekTimeline
    processedPlayers?: ProcessedPlayers
}

export default class GameweekTimelinePlot extends React.Component<GameweekTimelinePlotProps> {
    renderTeamPlots(entry: Entry, picks: Picks, xBins: TimelineBin[], color: string): JSX.Element[] {
        const { timeline, entries, bootstrap, fixtures, processedPlayers } = this.props;

        const data = TimelinesHelper.getDataSeries(timeline, picks, xBins);
        const prediction = TimelinesHelper.getPrediction(timeline, picks, xBins);
        const matchEvents = TimelinesHelper.getMatchEventScatter(picks, processedPlayers, xBins);

        const eventScatters = matchEvents.filter(me => me.length > 0).map(me =>
        <VictoryScatter
            data={me}
            dataComponent={<GameweekTimelineEventIcon eventType={me[0].type} /> }
            size={1}
            style={{
                data: {
                    stroke: color,
                    strokeWidth: "1"
                }
            }}
        />);

        console.log(data);
        console.log(matchEvents);
        return [
            <VictoryLine
                interpolation="monotoneX"
                data={data}
                style={{
                    data: {
                        stroke: color,
                        strokeWidth: "1"
                    }
                }}
            />,
            ...eventScatters,
            <VictoryLine
                interpolation="linear"
                data={prediction}
                style={{
                    data: {
                        stroke: color,
                        strokeDasharray: "2,2",
                        strokeWidth: "1"
                    }
                }}
            />
        ];
    }
    
    render() {
        const { timeline, picks, entries, bootstrap, fixtures } = this.props;

        if (!fixtures || fixtures.length <= 0) {
            return null;
        }

        const xBins = TimelinesHelper.getTimelineBins(fixtures);
        const xTicks: number[] = [];
        for (let i = 0; i < xBins.length; i++) {
            xTicks.push(i);
        }
        const xLabels = xTicks.map(x => xBins[x].start.format("ddd hh:mm a"));
        xTicks.push(xBins.length);
        xLabels.push(xBins[xBins.length - 1].end.format("ddd hh:mm a"));
        const yTicks = [0, 20, 40, 60, 80];//, 120];

        const series1 = TimelinesHelper.getDataSeries(timeline, picks[0], xBins);
        const series2 = TimelinesHelper.getDataSeries(timeline, picks[1], xBins);
        const prediction1 = TimelinesHelper.getPrediction(timeline, picks[0], xBins);
        const prediction2 = TimelinesHelper.getPrediction(timeline, picks[1], xBins);
        const yMax1 = Math.max(series1 ? Math.max(...series1.map(d => (d && d.y) ? d.y : 0)) + 10 : 40, 40);
        const yMax2 = Math.max(series2 ? Math.max(...series2.map(d => (d && d.y) ? d.y : 0)) + 10 : 40, 40);
        const yMax3 = Math.max(prediction1 ? Math.max(...prediction1.map(d => (d && d.y) ? d.y : 0)) + 10 : 40, 40);
        const yMax4 = Math.max(prediction2 ? Math.max(...prediction2.map(d => (d && d.y) ? d.y : 0)) + 10 : 40, 40);
        const yMax = Math.max(yMax1, yMax2, yMax3, yMax4);

        const xAxisOptions: XAxisOptions = {
            min: 0,
            max: xTicks[xTicks.length - 1],
            tickPositions: xTicks,
            labels: {
                formatter: function(): string {
                    return xLabels[Math.trunc(this.value)];
                }
            }
        };

        const options: Highcharts.Options = {
            series: [
                {
                    type: 'line',
                    data: series1,
                    color: "#e90052"
                },
                {
                    type: 'line',
                    data: prediction1,
                    dashStyle: 'ShortDash',
                    color: "#e90052"
                }
            ],
            xAxis: xAxisOptions,
            yAxis: {
                min: 0,
                max: yMax
            }
        };
        if (series2 && options.series) {
            options.series.push({
                type: 'line',
                data: series2,
                color: "#02894e"
            });
            options.series.push({
                type: 'line',
                data: prediction2,
                dashStyle: 'ShortDash',
                color: "#02894e"
            })
        }

        return (
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        );
    }
}