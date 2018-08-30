import * as React from "react";

export interface ScoutStatsProps {
    team : any,
    stats : any,
    side : string
}

export default class DifferentialsSelector extends React.Component<ScoutStatsProps, {}> {   
    constructor(props : any) {
        super(props);
        this.state = {};
    }

    createStat(key : number, name : string, value : any) {
        return (<tr key={key++}><td className="stats-table-name">{name}</td><td className="stats-table-value">{value}</td></tr>);
    }

    renderValue(value : number) : string {
        return `£${value/10}`;
    }

    renderStats(team : any, stats : any) {
        var elements : Array<JSX.Element> = new Array<JSX.Element>();
        var key = 0;
        elements.push(this.createStat(key++, "Points Per Week", Math.round(team.entry.entry.summary_overall_points/(team.standing.matches_played)*10)/10));
        elements.push(this.createStat(key++, "Overall Points", team.entry.entry.summary_overall_points));
        elements.push(this.createStat(key++, "Overall Rank", team.entry.entry.summary_overall_rank));
        elements.push(this.createStat(key++, "Team Value", this.renderValue(team.entry.entry.value)));
        elements.push(this.createStat(key++, "Bank", this.renderValue(team.entry.entry.bank)));
        elements.push(this.createStat(key++, "Total Transfers", team.entry.entry.total_transfers));
        if (stats)
        {
            elements.push(this.createStat(key++, 'Best Player', stats.bestPlayer.rawData.footballer.web_name));
            elements.push(this.createStat(key++, "In-Form Player", stats.informPlayer.rawData.footballer.web_name));
            elements.push(this.createStat(key++, 'Danger Man', stats.dangerousPlayer.rawData.footballer.web_name));
        }
        return elements;
    }

    render() {
        if (!this.props.team.entry) {
            return null;
        }

        return (
        <div>
            <div className="events-table">
                <table className={`table table-sm scouting-stats-table-${this.props.side}`}>
                    <tbody>
                        {this.renderStats(this.props.team, this.props.stats)}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}