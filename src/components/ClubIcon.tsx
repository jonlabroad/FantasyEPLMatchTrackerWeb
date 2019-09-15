import React from "react";

export interface ClubIconProps {
    teamCode?: number
    size?: string
}

export default class ClubIcon extends React.Component<ClubIconProps> {
    render() {
        const sizeProp = this.props.size ? this.props.size : "30px";
        if (!this.props.teamCode) {
            return null;
        }
        return (
            <img className="club-icon" alt={`${this.props.teamCode}`} width={sizeProp} height={sizeProp} src={`https://platform-static-files.s3.amazonaws.com/premierleague/badges/t${this.props.teamCode}.png`}/>
        );
    }
}