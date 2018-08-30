import * as React from "react";
import * as ReactDOM from "react-dom";

import BadgeProvider from "../BadgeProvider";
import IconProvider from "../IconProvider";

export interface ScoutPickListElementProps {
    pick: any;
}

export default class ScoutPickListElement extends React.Component<ScoutPickListElementProps, {}> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    private getName(): string {
        return this.props.pick.footballer.rawData.footballer.web_name;
    }

    private isStarter(): boolean {
        return this.props.pick.pick.position <= 11;
    }

    private getRole(): string {
        var rank = "";
        if (this.props.pick.pick.is_captain) {
            rank = "(C)";
        }
        else if (this.props.pick.pick.is_vice_captain) {
            rank = "(VC)"
        }
        return rank;
    }

    private getForm() : number {
        return parseFloat(this.props.pick.footballer.rawData.footballer.form);
    }

    private getAvgPts() : string {
        return this.props.pick.footballer.rawData.footballer.points_per_game;
    }

    private getSelectedPct() : string {
        return this.props.pick.footballer.rawData.footballer.selected_by_percent;
    }

    private getCost() : number {
        return this.props.pick.footballer.rawData.footballer.now_cost/10;
    }

    private getValue() : number {
        var footballer = this.props.pick.footballer.rawData.footballer;
        return Math.round(footballer.now_cost/parseFloat(footballer.points_per_game)*10)/100;
    }

    private getPosition() : string {
        switch (this.props.pick.footballer.rawData.footballer.element_type) {
            case 1:
                return "GK";
            case 2:
                return "D";
            case 3:
                return "M";
            case 4:
                return "F";
            default:
                return "???";
        }
    }

    private getPoints(): number {
        return this.props.pick.footballer.rawData.footballer.ep_next;
    }

    private getTeamCode(): number {
        return this.props.pick.footballer.rawData.footballer.team_code;
    }

    private getStarterClass(): string {
        return this.isStarter() ? "starter-pick" : "sub-pick";
    }

    private getRoleClass(): string {
        return this.getRole() === '(C)' ? "text-captain" : "";
    }

    private getBadgeLink(): string {
        return BadgeProvider.getBadgeUrl(this.getTeamCode());
    }

    render() {
        var starterClassName = this.getStarterClass();
        var captainClassName = this.getRoleClass();
        var badgeLink = this.getBadgeLink();
        return (
            <tr className={`${starterClassName} ${captainClassName}`}>
                <td className="pick-badge">
                    <img className="pick-badge" src={badgeLink} />
                </td>
                <td className="pick-points">
                    {this.getPoints()}
                </td>
                <td className="pick-position">
                    {this.getPosition()}
                </td>
                <td className="pick-name">
                    {this.getName()}
                    <span> </span>
                    <span className="pick-role">
                        {this.getRole()}
                    </span>
                </td>
                <td className="pick-form">
                    {this.getForm()}
                </td>
                <td className="pick-avg-pts">
                    {this.getAvgPts()}
                </td>
                <td className="pick-selected">
                    {this.getSelectedPct()}%
                </td>
                <td className="pick-cost">
                    £{this.getCost()}
                </td>
                <td className="pick-value">
                    £{this.getValue()}
                </td>
            </tr>
        );
    }
}