import React from 'react';
import './App.css';
import MatchTrackerContainer from './containers/MatchTrackerContainer';

import 'typeface-roboto';
import 'typeface-roboto-mono';
import { MuiThemeProvider } from '@material-ui/core';
import Themes from './presentation/Themes';

export default class App extends React.Component<any, {}> {
  componentDidMount() {

  }

  render() {
    return (
      <MuiThemeProvider theme={Themes.mainTheme}>
        <div className="Fpl">
          <MatchTrackerContainer/>
        </div>
      </MuiThemeProvider>
    );
  }
}
