import React from "react";
import { IconButton } from "@material-ui/core";
import { Action, Dispatch } from "redux";
import { drawerOpenClose } from "../actions";
import { TrackerState } from "../types";
import { connect } from "react-redux";

import MenuIcon from '@material-ui/icons/Menu';

export interface DrawerIconContainerProps {
    open: boolean

    drawerOpenClose: any;
}

export class DrawerIconContainer extends React.Component<DrawerIconContainerProps> {
    render() {
        return (
        <IconButton
            color="inherit"
            onClick={() => this.props.drawerOpenClose(true)}
        >
            <MenuIcon/>
        </IconButton>
        );
    }
}

export function mapStateToProps(state: TrackerState) {
    return {
        open: state.nav.drawerOpen
    };
}

const mapDispatchToProps = (dispatch: Dispatch<Action<any>>) => ({
    drawerOpenClose: (open: boolean) => dispatch(drawerOpenClose(open))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerIconContainer);