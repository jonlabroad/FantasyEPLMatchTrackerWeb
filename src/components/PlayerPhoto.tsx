import * as React from "react";
import * as ReactDOM from "react-dom";

import BadgeProvider from "../BadgeProvider";

export interface PlayerPhotoProps {
    footballer: any,
    text: string
}

export default class PlayerPhoto extends React.Component<PlayerPhotoProps, {}> {
    protected photoRoot: string = 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p';

    constructor(props: any) {
        super(props);
        this.state = props;
    }

    protected findTeamCode(): number {
        if (this.props.footballer) {
            return this.props.footballer.rawData.footballer.team_code;
        }
        return 0;
    }

    protected renderPicture(): any {
        var highlightPhoto = this.renderPhoto();
        var highlightText = this.renderHighlightText();
        var highlightBackground = this.renderHighlightBackground();
        var style = {
            backgroundImage: `url(${BadgeProvider.getBadgeUrl(this.findTeamCode())})`
        }

        return (
            <div
                className="team-highlight"
                style={style}>
                {highlightPhoto}
                {highlightBackground}
                {highlightText}
            </div>
        );
    }

    protected renderHighlightText() {
        return (
            <div className="highlight-text">
                {this.props.text}
            </div>
        );
    }

    protected renderHighlightBackground() {
        return <div className="highlight-background"></div>
    }

    protected renderPhoto() {
        var photoSuffix = this.getPhotoId();
        var photoUrl = this.photoRoot + photoSuffix;
        photoUrl = photoUrl.replace(".jpg", ".png");
        return <img
            src={photoUrl}
            className="team-highlight"
        />
    }

    private getPhotoId() {
        if (this.props.footballer)
        {
            return this.props.footballer.rawData.footballer.photo;
        }
        return null;
    }

    render() {
        return <span>
            {this.renderPicture()}
        </span>
    }
}