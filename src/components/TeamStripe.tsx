import * as React from "react";
import * as ReactDOM from "react-dom";

export interface TeamStripeProps {
    team : any,
    reverse : boolean
}

export default class TeamStripe extends React.Component<TeamStripeProps, {}> {
    protected defaultKit = {
        kit_shirt_type: "plain",
        kit_shirt_base: "#e8e8e8",
        kit_shirt_sleeves: "#e8e8e8",
        kit_shirt_secondary: "#ffffff",
        kit_shirt_logo: "none",
        kit_shorts: "#e8e8e8",
        kit_socks_type: "hoops",
        kit_socks_base: "#e8e8e8",
        kit_socks_secondary: "#ffffff"
    }
    
    constructor(props : any) {
        super(props);
        this.state = {
            team: props.team
        }
    }

    protected getKit() : any {
        if (!this.props.team.entry || !this.props.team.entry.entry || !this.props.team.entry.entry["kitParsed"]) {
            return this.defaultKit;
        }
        return this.props.team.entry.entry.kitParsed;
    }

    protected getStyle(color : string) {
        return {
            backgroundColor: color
        }
    }

    protected getShirtStyle() : any {
        return this.getStyle(this.getKit().kit_shirt_base);
    }

    protected getSecondaryStyle() : any {
        return this.getStyle(this.getKit().kit_shirt_secondary);
    }

    protected getShortsStyle() : any {
        return this.getStyle(this.getKit().kit_shorts);
    }

    protected getSocksStyle() : any {
        return this.getStyle(this.getKit().kit_socks_base);
    }
    
    protected getSocksSecondaryStyle() : any {
        return this.getStyle(this.getKit().kit_socks_secondary);
    }

    protected getSleevesStyle() : any {
        return this.getStyle(this.getKit().kit_shirt_sleeves);
    }    

    protected getPolygon() : JSX.Element {
        if (!this.props.reverse) {
            return (
                <svg className="kit-overlay" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 80">
                    <polygon className="" points="0 80 80 80 0 0 0 80"></polygon>
                </svg>
            );
        }
        return (
            <svg className="kit-overlay" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 80">
                <polygon className="" points="0 80 80 80 0 0 0 80"></polygon>
            </svg>
        );
    }

    protected getElements() : Array<JSX.Element> {
        var elements = new Array<JSX.Element>();


        return elements;

    }

    render() {
        return (
            <span>
            <div className="d-flex" style={this.props.reverse ? {flexDirection:"row-reverse"} : {}}>
                <div className="kit-shirt" style={this.getShirtStyle()}>
                </div>
                <div className="kit-shirt-sleeves" style={this.getSleevesStyle()}>
                </div>
                <div className="kit-shirt" style={this.getShirtStyle()}>
                </div>
                <div className="kit-shorts" style={this.getShortsStyle()}>
                </div>
                <div className="kit-socks-base-top" style={this.getSocksStyle()}>
                </div>
                <div className="kit-socks-secondary" style={this.getSocksSecondaryStyle()}>
                </div>
                <div className="kit-socks-base-bottom" style={this.getSocksStyle()}>
                </div>
            </div>
            </span>
        );
    }
}