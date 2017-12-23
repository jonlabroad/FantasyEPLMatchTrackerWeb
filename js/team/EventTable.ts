class EventTable {
    private BEGIN_TAGS: string;
    private END_TAGS: string;
    private _tableId: string;
    
    constructor(tableId: string) {
        this.BEGIN_TAGS = "<tr><td>";    
        this.END_TAGS = "<tr><td>";   
        this._tableId = tableId;
    }

    public fillEventTable(events: any[], myTeamId: number) {
        this.clear();
        var self = this;

        events = new EventFilter(events).filter();

        events.forEach(function(event, index) {
            if (new EventTypeUtil().isPrintableEvent(event)) {
                self.addEvent(event, myTeamId);
            }
        });
        this.scrollToBottom();
    }

    public addEvent(event, myTeamId: number) {
        var newElement = this.createElement(event);
        this.addFormatting(event, newElement, myTeamId);
    }

    public clear() {
        this.selectTable("tr").remove();
    }

	public getLatestHighPriorityEvent(teamId: number, events: any[]) : any {
		var reversedEvents = events.slice(0).reverse();
		for (var i in reversedEvents) {
			if (reversedEvents[i].teamId == teamId || reversedEvents[i].teamId < 0) {
				if (new EventTypeUtil().isHighPriorityEvent(reversedEvents[i])) {
					return reversedEvents[i];
				}
			}
		}
		return null;
    }
    
    public getLatestAnyEvent(teamId: number, events: any[]) : any {
		var reversedEvents = events.slice(0).reverse();
		for (var i in reversedEvents) {
			if (reversedEvents[i].teamId == teamId || reversedEvents[i].teamId < 0) {
				return reversedEvents[i];
			}
		}
		return null;       
    }

    private createElement(event) : JQuery {
        var newElement = $(this.getEventString(event));
        this.selectTable().append(newElement);
        return newElement;
    }

    private addFormatting(event, newElement : JQuery, myTeamId: number) {
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
    }

    private scrollToBottom() {
        var scrollable: JQuery = this.selectScrollable();
        scrollable.scrollTop(scrollable[0].scrollHeight);
    }
   
    private selectTable(subtag = "") : JQuery {
        return $(`#${this._tableId} ${subtag}`);
    }

    private selectScrollable(subtag = "") : JQuery {
        return $(`#${this._tableId}-scrollable`);
    }

    private getEventString(event): string {
        return `${this.BEGIN_TAGS}${event.number} ${event.typeString} ${event.footballerName} (${event.pointDifference})${this.END_TAGS}`;
    }
}

class EventTypeUtil {
    private HIGH_PRIORITY_EVENTS = ['GOAL', 'ASSIST', 'BONUS', "PENALTY_SAVES", "PENALTY_MISSED", "OWN_GOALS"];
    private PRINTABLE_EVENTS = ['GOAL', 'ASSIST', 'BONUS', "PENALTY_SAVES", "PENALTY_MISS", "CLEAN_SHEET", "YELLOW_CARD", "RED_CARD", "GOALS_CONCEDED", "SAVES", "OWN_GOALS", "AUTOSUB"];
    
    public isHighPriorityEvent(event) : boolean {
        return this.HIGH_PRIORITY_EVENTS.indexOf(event.type) >= 0;
    }

    public isPrintableEvent(event) : boolean {
        return this.PRINTABLE_EVENTS.indexOf(event.type) >= 0;
    }
}

class EventFilter {
	private _events = [];

	constructor(events: any[]) {
		this._events = events;
	}

	public filter() : any[] {
		var newEvents = [];
		var self = this;
		this._events.forEach(function(event, index) {
			if (self.doFilterNegativePoints(event, "BONUS")) {
				return;
			}

			newEvents.push(event);
		});
		return newEvents;
	}

	public doFilterNegativePoints(event, type: string) : any {
		return event && event.typeString === "BONUS" && event.pointDifference < 0;
	}
}