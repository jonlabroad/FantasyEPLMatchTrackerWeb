import Fixture from "./Fixture";
import LiveElement from "./LiveElement";

export type Lives = {[key: number]: Live};

export default interface Live
{
    fixtures: Fixture[];
    elements: { [key: number]: LiveElement };
}
