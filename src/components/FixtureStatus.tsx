import * as React from "react";
import * as ReactDOM from "react-dom";

import BadgeProvider from "../BadgeProvider"
import CombinedBpsTable from "../CombinedBpsTable"

export interface FixtureStatusProps {
    fixture : any,
    team : any,
    clubs : any[]
}

export default class FixtureStatus extends React.Component<FixtureStatusProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
        }
    }

    getPlayer(elementId : number) {
        var team = this.props.team;
        if (!team) {
            return null;
        }

        for (var i in team.picks) {
            if (team.picks[i].footballer.rawData.footballer.id == elementId) {
                return team.picks[i].footballer.rawData.footballer;
            }
        }
        return null;
    }

    getPlayerName(elementId : number) : string {
        var footballer = this.getPlayer(elementId);
        if (!footballer) {
            return "";
        }

        return footballer.web_name;        
    }

    getTeamCode(teamId : number) : number {
        return this.props.clubs[teamId-1].code;
    }

    renderScore() {
        var fixture = this.props.fixture;
        var awayBadgeLink = BadgeProvider.getBadgeUrl(this.getTeamCode(fixture.team_a));
        var homeBadgeLink = BadgeProvider.getBadgeUrl(this.getTeamCode(fixture.team_h));
        var homeClub = this.props.clubs[fixture.team_h-1];
        var awayClub = this.props.clubs[fixture.team_a-1];
        return (
                <div className="d-flex d-flex-inline justify-content-center fixture-status">
                    <div className="fixture-club-name text-right">
                        {homeClub.name}
                    </div>
                    <div className="fixture-badge">
                        <img className="fixture-badge" src={homeBadgeLink}/>
                    </div>
                    <div className="fixture-score">
                        {fixture ? `${fixture.team_h_score} - ${fixture.team_a_score}` : ""}
                    </div>
                    <div className="fixture-badge">
                        <img className="fixture-badge" src={awayBadgeLink}/>
                    </div>
                    <div className="fixture-club-name text-left">
                        {awayClub.name}
                    </div>
                </div>
        );
    }

    renderBpsTable() : JSX.Element[] {
        var fixture = this.props.fixture;

        if (!fixture.parsedStats.bps) {
            return null;
        }

        var rows = new Array<JSX.Element>();
        var table = new CombinedBpsTable(fixture.parsedStats.bps.h, fixture.parsedStats.bps.a);
        for (var i = 0; i < table.table.length; i++) {
            var playerName = this.getPlayerName(table.table[i].element);
            var className = i < 3 ? "fixture-bps-top-3" : "";
            if (!playerName) {
                continue;
            }
            rows.push(
                <tr className={className} key={i+1}>
                    <td>{i+1}</td>
                    <td>{playerName}</td>
                    <td>{table.table[i].value}</td>
                </tr>
            )
        }
        
        return rows;
    }

    render() {
        var fixture = this.props.fixture;
        if (!fixture) {
            return null;
        }

        return (
            <div className="fixture-element">
                {this.renderScore()}
                <table className="table table-sm table-fluid table-fixtures">
                    <tbody>
                        {this.renderBpsTable()}
                    </tbody>
                </table>
            </div>
        );
    }
}