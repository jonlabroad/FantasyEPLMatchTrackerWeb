import React from 'react';
import './App.css';
import MatchTrackerContainer from './containers/MatchTrackerContainer';

import 'typeface-roboto';
import 'typeface-roboto-mono';
import { MuiThemeProvider } from '@material-ui/core';
import Themes from './presentation/Themes';
import Helmet from 'react-helmet';

export default class App extends React.Component<any, {}> {
  componentDidMount() {

  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"/>
          <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
        </Helmet>
        <MuiThemeProvider theme={Themes.mainTheme}>
          <div className="Fpl">
            <MatchTrackerContainer/>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}
