import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Enumerable from "linq";

export interface TeamFormProps {
    form: string[]
}

export default class TeamForm extends React.Component<TeamFormProps, {}> {
    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    render() {
        var form = Enumerable.from(this.props.form).reverse().take(10).reverse().toArray();
        return (
            <span className="team-record">
                {form ? form.join('-') : null}
            </span>
        );
    }
}