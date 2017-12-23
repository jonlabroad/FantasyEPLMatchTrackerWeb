var EventTable = /** @class */ (function () {
    function EventTable(tableId) {
        this.BEGIN_TAGS = "<tr><td>";
        this.END_TAGS = "<tr><td>";
        this._tableId = tableId;
    }
    EventTable.prototype.fillEventTable = function (events, myTeamId) {
        this.clear();
        var self = this;
        events = new EventFilter(events).filter();
        events.forEach(function (event, index) {
            if (new EventTypeUtil().isPrintableEvent(event)) {
                self.addEvent(event, myTeamId);
            }
        });
        this.scrollToBottom();
    };
    EventTable.prototype.addEvent = function (event, myTeamId) {
        var newElement = this.createElement(event);
        this.addFormatting(event, newElement, myTeamId);
    };
    EventTable.prototype.clear = function () {
        this.selectTable("tr").remove();
    };
    EventTable.prototype.getLatestHighPriorityEvent = function (teamId, events) {
        var reversedEvents = events.slice(0).reverse();
        for (var i in reversedEvents) {
            if (reversedEvents[i].teamId == teamId || reversedEvents[i].teamId < 0) {
                if (new EventTypeUtil().isHighPriorityEvent(reversedEvents[i])) {
                    return reversedEvents[i];
                }
            }
        }
        return null;
    };
    EventTable.prototype.getLatestAnyEvent = function (teamId, events) {
        var reversedEvents = events.slice(0).reverse();
        for (var i in reversedEvents) {
            if (reversedEvents[i].teamId == teamId || reversedEvents[i].teamId < 0) {
                return reversedEvents[i];
            }
        }
        return null;
    };
    EventTable.prototype.createElement = function (event) {
        var newElement = $(this.getEventString(event));
        this.selectTable().append(newElement);
        return newElement;
    };
    EventTable.prototype.addFormatting = function (event, newElement, myTeamId) {
        if (event.teamId < 0) {
            newElement.addClass("event-common");
        }
        else {
            if (event.teamId == myTeamId) {
                newElement.addClass("event-mine");
            }
            else {
                newElement.addClass("event-theirs");
            }
        }
        if (new EventTypeUtil().isHighPriorityEvent(event)) {
            newElement.addClass("event-important");
        }
    };
    EventTable.prototype.scrollToBottom = function () {
        var scrollable = this.selectScrollable();
        scrollable.scrollTop(scrollable[0].scrollHeight);
    };
    EventTable.prototype.selectTable = function (subtag) {
        if (subtag === void 0) { subtag = ""; }
        return $("#" + this._tableId + " " + subtag);
    };
    EventTable.prototype.selectScrollable = function (subtag) {
        if (subtag === void 0) { subtag = ""; }
        return $("#" + this._tableId + "-scrollable");
    };
    EventTable.prototype.getEventString = function (event) {
        return "" + this.BEGIN_TAGS + event.number + " " + event.typeString + " " + event.footballerName + " (" + event.pointDifference + ")" + this.END_TAGS;
    };
    return EventTable;
}());
var EventTypeUtil = /** @class */ (function () {
    function EventTypeUtil() {
        this.HIGH_PRIORITY_EVENTS = ['GOAL', 'ASSIST', 'BONUS', "PENALTY_SAVES", "PENALTY_MISSED", "OWN_GOALS"];
        this.PRINTABLE_EVENTS = ['GOAL', 'ASSIST', 'BONUS', "PENALTY_SAVES", "PENALTY_MISS", "CLEAN_SHEET", "YELLOW_CARD", "RED_CARD", "GOALS_CONCEDED", "SAVES", "OWN_GOALS", "AUTOSUB"];
    }
    EventTypeUtil.prototype.isHighPriorityEvent = function (event) {
        return this.HIGH_PRIORITY_EVENTS.indexOf(event.type) >= 0;
    };
    EventTypeUtil.prototype.isPrintableEvent = function (event) {
        return this.PRINTABLE_EVENTS.indexOf(event.type) >= 0;
    };
    return EventTypeUtil;
}());
var EventFilter = /** @class */ (function () {
    function EventFilter(events) {
        this._events = [];
        this._events = events;
    }
    EventFilter.prototype.filter = function () {
        var newEvents = [];
        var self = this;
        this._events.forEach(function (event, index) {
            if (self.doFilterNegativePoints(event, "BONUS")) {
                return;
            }
            newEvents.push(event);
        });
        return newEvents;
    };
    EventFilter.prototype.doFilterNegativePoints = function (event, type) {
        return event && event.typeString === "BONUS" && event.pointDifference < 0;
    };
    return EventFilter;
}());
