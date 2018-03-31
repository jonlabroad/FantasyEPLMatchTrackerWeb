import * as React from "react";
import * as ReactDOM from "react-dom";

export interface VideoHighlightProps {
    video : any
}

export default class VideoHighlight extends React.Component<VideoHighlightProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
        }
    }

    render() {
        var snippet = this.props.video.snippet;
        if (!snippet || !snippet.thumbnails || !snippet.thumbnails.default) {
            return null;
        }

        var description = snippet.description.substring(0, Math.min(150, snippet.description.length));
        if (description.length >= 150) {
            description += " ...";
        }

        var linkUrl = "https://www.youtube.com/watch?v=" + snippet.resourceId.videoId;
        return (
            <div className="d-flex d-flex-inline video-highlight-element">
                <a href={linkUrl} className="video-highlight-thumbnail" target="_blank">
                    <img src={snippet.thumbnails.default.url}/>
                </a>
                <div>
                    <a href={linkUrl} className="video-highlight-title" target="_blank">
                        <div>
                            {snippet.title}
                        </div>
                    </a>
                    <div className="video-highlight-description">
                        {description}
                    </div>
                </div>
            </div>
        );
    }
}