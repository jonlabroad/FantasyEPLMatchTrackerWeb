import * as React from "react";
import TabType from "../models/TabType";

export interface NavTabProps {
    onClick : Function,
    matchAvailable : boolean,
    selection : TabType
}

export default class NavTab extends React.Component<NavTabProps, {}> {   
    constructor(props : any) {
        super(props);
        this.state = {};
    }

    public componentDidMount()
    {
        var self = this;
        $("#match-tab").click(function() {
            self.props.onClick(TabType.MATCH);
        });
        $("#scouting-tab").click(function() {
            self.props.onClick(TabType.SCOUTING);
        });
    }

    protected getClasses(tab : TabType) : string
    {
        var classes = ["nav-link"];
        if (this.props.selection === tab) {
            classes.push("active");
        }
        if (!this.props.matchAvailable && tab === TabType.MATCH) {
            classes.push("disabled");
        }

        // TODO temp until scouting pages are ready
        //if (tab === TabType.SCOUTING) {
        //    classes.push("disabled");
        //}

        return classes.join(" ");
    }

    render() {
        var liElements : Array<JSX.Element> = new Array<JSX.Element>();
        liElements.push((
            <li key="match" className="nav-item">
                <a id="match-tab" className={this.getClasses(TabType.MATCH)} href="#">Match</a>
            </li>
        ));
        liElements.push((
            <li id="scouting-tab" key="scouting" className="nav-item">
                <a className={this.getClasses(TabType.SCOUTING)} href="#">Scouting</a>
            </li>
        ));

        return (
            <ul className="nav nav-pills">
                {liElements}
            </ul>
        );
    }
}