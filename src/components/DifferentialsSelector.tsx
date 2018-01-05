import * as React from "react";
import * as ReactDOM from "react-dom";

import Selection from "../models/Selection";

export interface DifferentialsSelectorState {
    config : Selection
}

export interface DifferentialsSelectorProps {
    onChange : any
    config : Selection
}

export default class DifferentialsSelector extends React.Component<DifferentialsSelectorProps, DifferentialsSelectorState> {   
    constructor(props : any) {
        super(props);
        this.state = {
            config: props.config
        };
    }

    protected getChecked() : boolean {
        return this.state.config.differentialsOnly;
    }

    render() {
        return (
            <div className="form-check-inline">
				<label className="form-check-label">differentials only</label>
    			<input className="form-check-input" type="checkbox" onChange={this.props.onChange} value="" id="diff-only"/>
			</div>	
        );
    }
}