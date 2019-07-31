import React from "react";

export interface ClubIconProps {
    teamCode?: number
}

export default class ClubIcon extends React.Component<ClubIconProps> {
    render() {
        return this.props.teamCode && <img className="club-icon" src={`https://platform-static-files.s3.amazonaws.com/premierleague/badges/t${this.props.teamCode}.png`}/>
    }
}