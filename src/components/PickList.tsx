import * as React from "react";
import * as ReactDOM from "react-dom";

import PickListElement from "./PickListElement"

export interface PickListProps {
    picks : any[];
}

export default class PickList extends React.Component<PickListProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
            picks: props.picks
        }
    }

    render() {
        var starterPicks : Array<any> = new Array<any>();
        var subPicks : Array<any> = new Array<any>();
        for (var i in this.props.picks) {
            var pick = this.props.picks[i];
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
            <table className="table table-fluid table-picks">
                <tbody>
                    {starterPicks}
                    <tr><th>Subs</th></tr>
                    {subPicks}
                </tbody>
            </table>            
        );
    }
}