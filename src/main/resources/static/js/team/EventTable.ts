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
        events.forEach(function(event, index) {
            self.addEvent(event, myTeamId);            
        });
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

    private selectTable(subtag = "") : JQuery {
        return $(`#${this._tableId} ${subtag}`);
    }

    private getEventString(event): string {
        return `${this.BEGIN_TAGS}${event.number} ${event.typeString} ${event.footballerName} (${event.pointDifference})${this.END_TAGS}`;
    }
}

class EventTypeUtil {
    private HIGH_PRIORITY_EVENTS = ['GOAL', 'ASSIST', 'BONUS', "PENALTY_SAVES", "PENALTY_MISSED"];
    
    public isHighPriorityEvent(event) : boolean {
        return this.HIGH_PRIORITY_EVENTS.indexOf(event.type) >= 0;
    }
}