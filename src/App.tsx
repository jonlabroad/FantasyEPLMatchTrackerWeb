import React from 'react';
import './App.css';
import MatchTrackerContainer from './containers/MatchTrackerContainer';

import 'typeface-roboto';

export default class App extends React.Component<any, {}> {
  componentDidMount() {

  }

  render() {
    return (
      <div className="Fpl">
        <MatchTrackerContainer/>
      </div>
    );
  }
}
