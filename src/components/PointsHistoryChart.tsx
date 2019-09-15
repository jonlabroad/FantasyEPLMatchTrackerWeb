import React from "react";
import EntryHistory from "../data/fpl/EntryHistory";
import ChartistGraph from 'react-chartist';
import Chartist from "chartist";
import "../styles/chartist/legend.css";

require("chartist-plugin-legend");

export interface PointsHistoryChartProps {
    history: EntryHistory[]
}

export default class PointsHistoryChart extends React.Component<PointsHistoryChartProps> {
    render() {
        const { history } = this.props;

        if (!history[0]) {
            return null;
        }

        const gameweekLabels = history[0].current.map(c => `GW${c.event}`);
        const series1 = history[0].current.map(c => c.points);
        const series2 = history[1] ? history[1].current.map(c => c.points) : undefined;
        const series = series2 ? [series1, series2] : [series1];

        return (
            <div>
                <ChartistGraph
                    data={{
                        labels: gameweekLabels,
                        series: series
                      }}
                    options={{
                        plugins: [Chartist.plugins.legend({className: 'crazyPink'})]
                    }}
                    type={'Line'}
                />
            </div>
        );
    }
}