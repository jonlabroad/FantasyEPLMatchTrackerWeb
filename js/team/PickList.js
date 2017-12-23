var PickList = /** @class */ (function () {
    function PickList(teamNum, tableName) {
        this._tableName = "";
        this._tableName = tableName;
        this._teamNum = teamNum;
    }
    PickList.prototype.addPicks = function (picks) {
        var self = this;
        picks.forEach(function (pick, index) {
            var pickNum = index + 1;
            var pickElement = self.selectPick(pickNum);
            self.addPlayerClasses(pickElement, pick);
            self.addRole(pickNum, pick);
            self.addPoints(pickNum, pick);
            self.addName(pickNum, pick);
            self.clearIcons(pickNum);
            self.addIcons(pickNum, pick);
        });
    };
    PickList.prototype.addIcons = function (pickNum, pick) {
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
    };
    PickList.prototype.clearIcons = function (pickNum) {
        this.selectPickIcons(pickNum).empty();
    };
    PickList.prototype.addIconType = function (pickNum, pick, explainName) {
        var explain = this.getExplainElement(pick, explainName);
        if (explain) {
            var explainString = this.getExplainString(explain, explainName);
            this.selectPickIcons(pickNum).append(explainString + " ");
        }
    };
    PickList.prototype.addPlayerClasses = function (pickElement, pick) {
        var rawPick = pick.pick;
        if (rawPick.is_captain) {
            pickElement.addClass("text-captain");
        }
        if (rawPick.is_vice_captain) {
            pickElement.addClass("text-vice-captain");
        }
    };
    PickList.prototype.addPoints = function (pickNum, pick) {
        this.selectPickPoints(pickNum).text(this.getPoints(pick));
    };
    PickList.prototype.addName = function (pickNum, pick) {
        this.selectPickName(pickNum).text(this.getName(pick));
    };
    PickList.prototype.addRole = function (pickNum, pick) {
        this.selectPickRole(pickNum).text(this.getRankText(pick));
    };
    PickList.prototype.getName = function (pick) {
        return pick.footballer.rawData.footballer.web_name;
    };
    PickList.prototype.getPoints = function (pick) {
        return pick.score;
    };
    PickList.prototype.getRankText = function (pick) {
        var rank = "";
        if (pick.pick.is_captain) {
            rank = "(C) ";
        }
        else if (pick.pick.is_vice_captain) {
            rank = "(VC) ";
        }
        return rank;
    };
    PickList.prototype.selectPickIcons = function (pick) {
        return $("#team" + this._teamNum + "-pick" + pick + "-icons");
    };
    PickList.prototype.selectPickName = function (pick) {
        return $("#team" + this._teamNum + "-pick" + pick + "-name");
    };
    PickList.prototype.selectPickRole = function (pick) {
        return $("#team" + this._teamNum + "-pick" + pick + "-role");
    };
    PickList.prototype.selectPickPoints = function (pick) {
        return $("#team" + this._teamNum + "-pick" + pick + "-points");
    };
    PickList.prototype.selectPick = function (pick) {
        return $("#team" + this._teamNum + "-pick" + pick);
    };
    PickList.prototype.selectTable = function () {
        return $("#" + this._tableName);
    };
    PickList.prototype.getExplainElement = function (pick, elementName) {
        var explain = pick.footballer.rawData.details.explain[0].explain[elementName];
        if (explain && explain.value > 0) {
            return explain;
        }
        return null;
    };
    PickList.prototype.getExplainString = function (explain, explainName) {
        switch (explainName) {
            case "minutes":
                return explain.value + "Min";
            case "goals_scored":
                return explain.value + "GS";
            case "bonus":
                return explain.points + "B";
            case "clean_sheets":
                return "CS";
            case "assists":
                return explain.value + "A";
            case "yellow_cards":
                return explain.value + "YC";
            case "red_cards":
                return explain.value + "RC";
            case "penalties_missed":
                return explain.value + "PKM";
            case "goals_conceded":
                return explain.value + "GC";
            case "saves":
                return explain.value + "S";
            case "penalties_saved":
                return explain.value + "PKS";
            case "own_goals":
                return explain.value + "OG";
            default:
                return "";
        }
    };
    return PickList;
}());
