class PickList {
    private _tableName: string = "";
    private _teamNum: number;

    constructor(teamNum: number, tableName) {
        this._tableName = tableName;
        this._teamNum = teamNum;
    }

    public addPicks(picks: any[]) {
        var self = this;
        picks.forEach(function(pick, index: number) {
            var pickNum = index + 1;
            var pickElement = self.selectPick(pickNum);
            self.addPlayerClasses(pickElement, pick);
            self.addRole(pickNum, pick);
            self.addName(pickNum, pick);
            self.addIcons(pickNum, pick);
        });
    }

    private addIcons(pickNum: number, pick) {
		this.addIconType(pickNum, pick, "minutes");
		this.addIconType(pickNum, pick, "goals_scored");
		this.addIconType(pickNum, pick, "assists");
		this.addIconType(pickNum, pick, "clean_sheets");
		this.addIconType(pickNum, pick, "saves");
		this.addIconType(pickNum, pick, "own_goals");
		this.addIconType(pickNum, pick, "yellow_cards");
		this.addIconType(pickNum, pick, "red_cards");
		this.addIconType(pickNum, pick, "penalties_missed");
		this.addIconType(pickNum, pick, "penalties_saved");
		this.addIconType(pickNum, pick, "goals_conceded");
		this.addIconType(pickNum, pick, "bonus");	
    }

    private addIconType(pickNum: number, pick, explainName: string) {
		var explain = this.getExplainElement(pick, explainName);
		if (explain) {
			var explainString = this.getExplainString(explain, explainName);
			this.selectPickIcons(pickNum).append(`${explainString} `);
		}
    }

    private addPlayerClasses(pickElement: JQuery, pick) {
        var rawPick = pick.pick;
        if (rawPick.is_captain) {
            pickElement.addClass("text-captain");
        }
        if (rawPick.is_vice_captain) {
            pickElement.addClass("text-vice-captain");
        }
    }

    private addName(pickNum: number, pick) {
        this.selectPickName(pickNum).text(this.getName(pick));
    }

    private addRole(pickNum: number, pick) {
        this.selectPickRole(pickNum).text(this.getRankText(pick));
    }
	
	private getName(pick) {
		return pick.footballer.rawData.footballer.web_name;
	}

	private getRankText(pick) {
		var rank = "";
		if (pick.pick.is_captain) {
			rank = "(C) ";
		}
		else if(pick.pick.is_vice_captain) {
			rank = "(VC) "
		}
		return rank;
	}

    private selectPickIcons(pick: number) : JQuery {
        return $(`#team${this._teamNum}-pick${pick}-icons`);
    }

    private selectPickName(pick: number) : JQuery {
        return $(`#team${this._teamNum}-pick${pick}-name`);
    }

    private selectPickRole(pick: number) : JQuery {
        return $(`#team${this._teamNum}-pick${pick}-role`);
    }

    private selectPick(pick: number) : JQuery {
        return $(`#team${this._teamNum}-pick${pick}`);
    }

    private selectTable() : JQuery {
        return $(`#${this._tableName}`);
    }

	private getExplainElement(pick, elementName: string) {
		var explain = pick.footballer.rawData.details.explain[0].explain[elementName];
		if (explain && explain.value > 0) {
			return explain;
		}
		return null;
	}

	private getExplainString(explain, explainName) {
		switch (explainName) {
			case "minutes":
				return `${explain.value}Min`;
			case "goals_scored":
				return `${explain.value}GS`;
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
}