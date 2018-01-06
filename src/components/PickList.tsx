import * as React from "react";
import * as ReactDOM from "react-dom";

import PickListElement from "./PickListElement"
import Selection from "../models/Selection";

export interface PickListProps {
    picks : any;
    differentials : any;
    config : Selection;
}

export default class PickList extends React.Component<PickListProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
        }
    }

    protected isDifferential(elementId : number) {
        return this.props.differentials.indexOf(elementId) >= 0;
    }

    render() {
        var starterPicks : Array<any> = new Array<any>();
        var subPicks : Array<any> = new Array<any>();
        for (var i in this.props.picks) {
            var pick = this.props.picks[i];
            if (this.props.config.differentialsOnly && !this.isDifferential(pick.footballer.rawData.footballer.id)) {
                continue;
            }
            var element = <PickListElement
                key={i}
                pick = {this.props.picks[i]}
            />
            if (this.props.picks[i].pick.position <= 11) {
                starterPicks.push(element);
            }
            else {
                subPicks.push(element);
            }
        }       

        return (
            <table className="table table-sm table-striped table-fluid table-picks">
                <tbody>
                    {starterPicks}
                    <tr><th>Subs</th></tr>
                    {subPicks}
                </tbody>
            </table>            
        );
    }
}