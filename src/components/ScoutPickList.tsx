import * as React from "react";
import * as ReactDOM from "react-dom";

import PickListElement from "./PickListElement"
import Selection from "../models/TrackerSelection";
import ScoutPickListElement from "./ScoutPickListElement";

export interface ScoutPickListProps {
    picks : any;
    differentials : any;
    config : Selection;
    isScouting : boolean
}

export default class ScoutPickList extends React.Component<ScoutPickListProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        //($('[data-toggle="tooltip"]') as any).tooltip(); 
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
            var element = <ScoutPickListElement
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
            <div>
                <div className="events-table-header">Starting Lineup</div>
                <table className="table table-sm table-striped table-picks">
                    <thead className="events-table-header">
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Form</th>
                            <th>Pts Per Game</th>
                            <th>Selected %</th>
                            <th>Cost</th>
                            <th>£/Ppg</th>
                        </tr>
                    </thead>
                    <tbody>
                        {starterPicks}
                    </tbody>
                </table>
                <div className="events-table-header">Bench</div>
                <table className="table table-sm table-striped table-picks">
                    <tbody>
                        {subPicks}
                    </tbody>
                </table>
            </div>
        );
    }
}