import Event from "./Event"
import Club from "./Club";
import Element from "./Element";

export interface BootstrapStatic {
    currentEvent: number;
    events: Event[];
    elements: Element[];
    teams: Club[];

    // There's a lot more to this but it's not important, yet
}
