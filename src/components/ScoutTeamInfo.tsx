import * as React from "react";
import ScoutStats from "./ScoutStats";
import PlayerPhoto from "./PlayerPhoto";
import { STATUS_CODES } from "http";
import { statSync } from "fs";

export interface ScoutTeamInfoProps {
    team : any,
    stats : any,
    side : string
}

export default class DifferentialsSelector extends React.Component<ScoutTeamInfoProps, {}> {   
    constructor(props : any) {
        super(props);
        this.state = {};
    }

    pickFootballerForPhoto() : any {
        return this.props.stats ? this.props.stats.bestPlayer : null;
    }

    renderPhoto() {
        var bestFootballer = this.pickFootballerForPhoto();
        if (!bestFootballer) {
            return null;
        }
        
        return (
            <PlayerPhoto
                footballer={bestFootballer}
                text={`Best Player: ${bestFootballer.rawData.footballer.web_name}`}
            />
        );
    }

    render() {
        if (!this.props.team.entry) {
            return null;
        }

        return (
        <div>
            <ScoutStats
                team={this.props.team}
                stats={this.props.stats}
                side={this.props.side}
            />
            {this.renderPhoto()}
        </div>
        );
    }
}