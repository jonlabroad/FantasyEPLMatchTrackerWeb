import * as React from "react";
import * as ReactDOM from "react-dom";

import BadgeProvider from "../BadgeProvider";
import IconProvider from "../IconProvider";

export interface PickListElementProps {
    pick: any;
    isScouting: any;
}

export default class PickListElement extends React.Component<PickListElementProps, {}> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    protected getIcons(explains: any): JSX.Element {
        var icons = <span>
            {this.getIcon(explains, "minutes")}
            {this.getIcon(explains, "goals_scored")}
            {this.getIcon(explains, "assists")}
            {this.getIcon(explains, "clean_sheets")}
            {this.getIcon(explains, "saves")}
            {this.getIcon(explains, "own_goals")}
            {this.getIcon(explains, "yellow_cards")}
            {this.getIcon(explains, "red_cards")}
            {this.getIcon(explains, "penalties_missed")}
            {this.getIcon(explains, "penalties_saved")}
            {this.getIcon(explains, "goals_conceded")}
            {this.getIcon(explains, "bonus")}
        </span>
        return icons;
    }

    protected getIcon(explains: any, fieldName: string): JSX.Element {
        var combinedExplain: any = null;
        for (var i in explains) {
            var explain = this.getExplainElement(explains[i], fieldName);
            if (explain) {
                if (!combinedExplain) {
                    combinedExplain = {
                        points: explain.points,
                        value: explain.value
                    }
                }
                else {
                    combinedExplain.points += explain.points;
                    combinedExplain.value += explain.value;
                }
            }
        }
        if (combinedExplain) {
            return this.getExplainIcons(combinedExplain, fieldName);
        }
        return null;
    }

    private getExplainElement(explains: any, elementName: string) {
        var explain = null;
        if (explains) {
            var explain = explains[elementName];
        }

        if (explain && explain.value != 0) {
            return explain;
        }
        return null;
    }

    private getExplainIcons(explain: any, explainName: string): JSX.Element {
        var iconFiles: Array<string> = new Array<string>();
        if (explainName === 'minutes') {
            iconFiles.push(explain.value < 60 ? IconProvider.getIcon(explainName) : IconProvider.getIcon("minutes_60"));
        }
        else if (explainName === 'bonus') {
            for (var n = 0; n < explain.points; n++) {
                iconFiles.push(IconProvider.getIcon(explainName));
            }
        }
        else {
            for (var n = 0; n < explain.value; n++) {
                iconFiles.push(IconProvider.getIcon(explainName));
            }
        }

        var icons = new Array<JSX.Element>();
        for (var i in iconFiles) {
            icons.push(this.renderIconElement(iconFiles[i], explain, explainName, `${explainName}${i}`));
        }

        return (
            <span className="pick-icon">
                {icons}
            </span>
        );
    }

    private renderIconElement(iconFile: string, explain: any, explainName: string, key: string): JSX.Element {
        return (<span key={key}>
            <img
                data-toggle="tooltip"
                title={explain.value + " " + explainName.replace("_", " ") + ": " + explain.points + "pts"}
                src={`img/icon/${iconFile}`}
                alt={explainName} />
            <span> </span>
        </span>
        );
    }

    private getExplainString(explain: any, explainName: string): string {
        switch (explainName) {
            case "minutes":
                return `${explain.value}Min`;
            case "goals_scored":
                return `${explain.value}G`;
            case "bonus":
                return `${explain.points}B`;
            case "clean_sheets":
                return "CS";
            case "assists":
                return `${explain.value}A`;
            case "yellow_cards":
                return `${explain.value}YC`;
            case "red_cards":
                return `${explain.value}RC`;
            case "penalties_missed":
                return `${explain.value}PKM`;
            case "goals_conceded":
                return `${explain.value}GC`;
            case "saves":
                return `${explain.value}S`;
            case "penalties_saved":
                return `${explain.value}PKS`;
            case "own_goals":
                return `${explain.value}OG`;

            default:
                return "";
        }
    }

    private getExplains(): any {
        return this.props.pick.footballer.rawData.explains;
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
        return this.props.isScouting ? this.props.pick.footballer.rawData.footballer.ep_next : this.props.pick.score;
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

    private getFixtureStatusClass(): string {
        if (!this.props.isScouting) {
            var pick = this.props.pick;
            if (pick.footballer.isCurrentlyPlaying) {
                return "pick-in-fixture";
            }
            if (pick.footballer.isDonePlaying) {
                return "pick-fixture-complete";
            }
        }
    }

    render() {
        var starterClassName = this.getStarterClass();
        var captainClassName = this.getRoleClass();
        var fixtureStatusClassName = this.getFixtureStatusClass();
        var badgeLink = this.getBadgeLink();
        return (
            <tr className={`${starterClassName} ${captainClassName} ${fixtureStatusClassName}`}>
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
                <td className="pick-explains">
                    {this.props.isScouting ? "" : this.getIcons(this.getExplains())}
                </td>
            </tr>
        );
    }
}