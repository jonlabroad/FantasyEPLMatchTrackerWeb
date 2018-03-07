import * as React from "react";
import * as ReactDOM from "react-dom";

import VideoHighlight from "./VideoHighlight"

export interface VideoHighlightGroupProps {
    playlistItems : any[]
}

export default class VideoHighlightGroup extends React.Component<VideoHighlightGroupProps, {}> {
    constructor(props : any) {
        super(props);
        this.state = {
        }
    }

    renderHighlights() : Array<JSX.Element> {
        var elements : Array<JSX.Element> = new Array<JSX.Element>();
        for (var i in this.props.playlistItems) {
            elements.push(this.renderHighlight(this.props.playlistItems[i]));
        }
        return elements;
    }

    renderHighlight(item : any) : JSX.Element {
        return (
                <VideoHighlight
                    key={item.id}
                    video={item}
                />
        );
    }

    render() {
        return (
            <div className="video-highlight-group">
                {this.renderHighlights()}
            </div>
        );
    }
}