import React from "react";

export interface ClubIconProps {
    teamCode?: number
    size?: string
}

export default class ClubIcon extends React.Component<ClubIconProps> {
    render() {
        const sizeProp = this.props.size ? this.props.size : "30px";
        return this.props.teamCode && <div className="club-icon-container"><img className="club-icon" width={sizeProp} height={sizeProp} src={`https://platform-static-files.s3.amazonaws.com/premierleague/badges/t${this.props.teamCode}.png`}/></div>
    }
}