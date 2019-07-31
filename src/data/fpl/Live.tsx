import Fixture from "./Fixture";
import LiveElement from "./LiveElement";

export default interface Live
{
    fixtures: Fixture[];
    elements: { [key: number]: LiveElement };
}
