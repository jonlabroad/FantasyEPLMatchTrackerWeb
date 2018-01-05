import * as React from "react";
import * as ReactDOM from "react-dom";

import BadgeProvider from "../BadgeProvider";

export interface PickListElementProps {
    pick : any;
}

export default class PickListElement extends React.Component<PickListElementProps, PickListElementProps> {
    constructor(props : any) {
        super(props);
        this.state = props;
    }

    protected getIcons(explains : any) : string {
        var icons : string = "";
        icons += this.getIcon(explains, "minutes") + " ";
		icons += this.getIcon(explains, "goals_scored") + " ";
		icons += this.getIcon(explains, "assists") + " ";
		icons += this.getIcon(explains, "clean_sheets") + " ";
		icons += this.getIcon(explains, "saves") + " ";
		icons += this.getIcon(explains, "own_goals") + " ";
		icons += this.getIcon(explains, "yellow_cards") + " ";
		icons += this.getIcon(explains, "red_cards") + " ";
		icons += this.getIcon(explains, "penalties_missed") + " ";
		icons += this.getIcon(explains, "penalties_saved") + " ";
		icons += this.getIcon(explains, "goals_conceded") + " ";
		icons += this.getIcon(explains, "bonus") + " ";	
        return icons;
    }

    protected getIcon(explains : any, fieldName : string) : string {
        var combinedExplain : any = null;
        for (var i in explains) {
            var explain = this.getExplainElement(explains[i], fieldName);
            if (explain) {
                if (!combinedExplain) {
                    combinedExplain = explain;
                }
                else {
                    combinedExplain.points += explain.points;
                    combinedExplain.value += explain.value;
                }
            }
        }
        if (combinedExplain) {
            return this.getExplainString(combinedExplain, fieldName);
        }
        return "";
    }
    
	private getExplainElement(explains : any, elementName: string) {
        var explain = null;
        if (explains) {
			var explain = explains[elementName];
		}
		
		if (explain && explain.value != 0) {
			return explain;
		}
		return null;
	}

	private getExplainString(explain : any, explainName : string) : string {
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
    
    private getExplains() : any {
        return this.state.pick.footballer.rawData.explains;
    }

    private getName() : string {
        return this.state.pick.footballer.rawData.footballer.web_name;
    }

    private isStarter() : boolean {
        return this.state.pick.pick.position <= 11;
    }

    private getRole() : string {
        var rank = "";
        if (this.state.pick.pick.is_captain) {
            rank = "(C)";
        }
        else if(this.state.pick.pick.is_vice_captain) {
            rank = "(VC)"
        }
        return rank;
    }

    private getPoints() : number {
        return this.state.pick.points;
    }

    private getTeamCode() : number {
        return this.state.pick.footballer.rawData.footballer.team_code;
    }

    private getStarterClass() : string {
        return this.isStarter() ? "starter-pick" : "sub-pick";
    }

    private getRoleClass() : string {
        return this.getRole() === '(C)' ? "text-captain" : "";
    }

    private getBadgeLink() : string {
        return BadgeProvider.getBadgeUrl(this.getTeamCode());
    }

    private getFixtureStatusClass() : string {
        var pick = this.state.pick;
        if (pick.footballer.isCurrentlyPlaying) {
            return "current-fixture-pick";
        }
        if (pick.footballer.isDonePlaying) {
            return "completed-fixture-pick";
        }
    }

    render() {       
        var starterClassName = this.getStarterClass();
        var captainClassName = this.getRoleClass();
        var fixtureStatusClassName = this.getFixtureStatusClass();
        var badgeLink = this.getBadgeLink();
        return (
            <tr className={`${starterClassName} ${captainClassName} ${fixtureStatusClassName}`}>
                <td>
                    <img className="pick-badge" src={badgeLink}/>
                </td>
                <td>
                    {this.getPoints()}
                </td>
                <td>
                    {this.getRole()}
                </td>
                <td>
                    {this.getName()}
                </td>
                <td>
                    {this.getIcons(this.getExplains())}
                </td>
            </tr>
        );
    }
}