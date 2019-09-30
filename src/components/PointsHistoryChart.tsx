import React from "react";
import EntryHistory from "../data/fpl/EntryHistory";
import ChartistGraph from 'react-chartist';
import Entry from "../data/fpl/Entry";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryScatter, VictoryLegend } from "victory";




export interface PointsHistoryChartProps {
    teams: Entry[]
    history: EntryHistory[]
}

export default class PointsHistoryChart extends React.Component<PointsHistoryChartProps> {
    shouldComponentUpdate(newProps: PointsHistoryChartProps): boolean {
        return !!(newProps.history[0] && newProps.teams[0]);
    }
    
    renderSeries(series: {x: number, y: number}[] | undefined, color: string): JSX.Element[] | null{
        if (!series) {
            return null;
        }
        return [
            <VictoryLine
                interpolation="natural"
                data={series}
                style={{
                    data: {stroke: color}
                }}
            />,
            <VictoryScatter
                data={series}
                style={{
                    data: {fill: color}
                }}
            />
        ];
    }
    
    render() {
        const { history, teams } = this.props;

        if (!history[0] || !teams[0]) {
            return null;
        }

        const x = history[0].current.map(c => c.event);
        const xLabels = history[0].current.map(c => `GW${c.event}`);
        const series1 = history[0].current.map(c => ({x: c.event, y: c.points}));
        const series2 = history[1] ? history[1].current.map(c => ({x: c.event, y: c.points})) : undefined;

        const yTicks = [0, 20, 40, 60, 80, 100, 120];
        return (
            <div className="points-history-chart">
                <VictoryChart
                    theme={VictoryTheme.material}
                    height={180}
                    padding={{top:20, bottom: 25, left: 50, right: 50}}
                >
                    <VictoryAxis
                        tickValues={x}
                        tickFormat={xLabels}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickValues={yTicks}
                        tickFormat={yTicks}
                    />
                    <VictoryLegend
                        x={60} y={10}
                        centerTitle
                        orientation="vertical"
                        data={this.getLegendData(teams[0], "#e90052", teams[1], "#02894e")}
                    />
                    {this.renderSeries(series1, "#e90052")}
                    {this.renderSeries(series2, "#02894e")}
                </VictoryChart>
            </div>
        );
    }

    getLegendData(team1: Entry, color1: string, team2: Entry | undefined, color2: string) {
        const data = [];
        data.push({ name: team1.name, symbol: { fill: color1 }});
        if (team2) {
            data.push({ name: team2.name, symbol: { fill: color2 }});
        }
        return data;
    }
}