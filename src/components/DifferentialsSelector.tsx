import * as React from "react";
import * as ReactDOM from "react-dom";

import Selection from "../models/Selection";

export interface DifferentialsSelectorProps {
    onChange : any
    config : Selection
}

export default class DifferentialsSelector extends React.Component<DifferentialsSelectorProps, {}> {   
    constructor(props : any) {
        super(props);
        this.state = {};
    }

    protected getChecked() : boolean {
        return this.props.config.differentialsOnly;
    }

    render() {
        return (
            <div className="form-check-inline navbar-control">
    			<input className="form-check-input" type="checkbox" onChange={this.props.onChange} value="" id="diff-only"/>
                <label className="form-check-label">differentials only</label>
			</div>	
        );
    }
}