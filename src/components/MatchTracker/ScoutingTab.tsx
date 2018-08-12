import * as React from "react";

import PickList from "../PickList";
import FixtureStatusGroup from "../FixtureStatusGroup";
import SimulatedH2h from "../SimulatedH2h";
import LiveStandings from "../LiveStandings";

export interface ScoutingTabProps {
    matchInfo : any;
    standings : any;
    selection : any;
    eventInfo : any;
}

export interface ScoutingTabState {

}

export default class ScoutingTab extends React.Component<ScoutingTabProps, ScoutingTabState> {
    constructor(props : any) {
        super(props);
    }

    protected getTeamsArray(matchInfo : any) {
        var teams = new Array();
        for (var id in matchInfo.teams) {
          teams.push(matchInfo.teams[id]);
        }
        return teams;
    }

      protected renderMatchInfo() : JSX.Element {
        var matchInfo = this.props.matchInfo;
        if (matchInfo) {
          var teams = this.getTeamsArray(matchInfo);
          return (
              <div className="container-fluid">
                <div className="row justify-content-center no-gutters">
                  <div className="col-4 order-1 d-flex flex-column align-items-end">
                    <div className="d-flex main-element side-column-element">
                      <PickList picks={teams[0] != null ? teams[0].picks : null}
                                config={this.props.selection}
                                differentials={this.props.matchInfo.differentials}/>
                    </div>
                    <div className="main-element side-column-element">
                      <FixtureStatusGroup
                        team={teams[0]}
                        fixtures={this.props.eventInfo ? this.props.eventInfo.fixtures : null}
                        clubs={this.props.eventInfo ? this.props.eventInfo.clubs : null}
                      />                    
                    </div>
                  </div>
                  <div className="col-4 order-3 d-flex flex-column align-items-start">
                    <div className="main-element side-column-element">
                        <PickList picks={teams[1] != null ? teams[1].picks : null}
                                  config={this.props.selection}
                                  differentials={this.props.matchInfo.differentials}
                        />
                    </div>
                    <div className="main-element side-column-element">
                      <FixtureStatusGroup
                        team={teams[1]}
                        fixtures={this.props.eventInfo ? this.props.eventInfo.fixtures : null}
                        clubs={this.props.eventInfo ? this.props.eventInfo.clubs : null}
                      />
                    </div>
                  </div>

                  <div className="col-4 order-2 d-flex flex-column align-items-center no-gutters center-column">
                    <SimulatedH2h
                          teams={teams}
                          simulatedH2h={matchInfo.simulatedH2h}
                    />
                    <div className="main-element">
                        <LiveStandings
                            liveStandings={matchInfo.liveStandings != null ? matchInfo.liveStandings.liveStandings : null}
                            team1Id={teams[0] != null ? teams[0].id : 0}
                            team2Id={teams[1] != null ? teams[1].id : 0}
                        />
                    </div>
                  </div>
                </div>
              </div>
          );
        }
      }

    render() {
        return (
            <div>
              {this.renderMatchInfo()}
            </div>
        );
    }
}