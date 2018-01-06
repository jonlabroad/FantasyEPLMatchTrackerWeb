import * as React from "react";
import * as ReactDOM from "react-dom";

import * as JQuery from "jquery";

import EPLClient from "../EPLClient";
import MatchHeader from "./MatchHeader";
import TeamName from "./TeamName";
import PickList from "./PickList";
import EventTable from "./EventTable";
import TeamRecord from "./TeamRecord";
import TeamSelector from "./TeamSelector";
import GameweekSelector from "./GameweekSelector";
import DifferentialsSelector from "./DifferentialsSelector";
import Highlight from "./Highlight";
import Selection from "../models/Selection";
import MatchInfoCache from "../MatchInfoCache";
import { TeamStarterScore, TeamSubScore } from "./TeamScore";

export interface MatchTrackerProps {
}

export interface MatchTrackerState {
    matchInfo : any;
    standings : any;
    selection : any;
}

export default class MatchTracker extends React.Component<MatchTrackerProps, MatchTrackerState> {
    protected leagueId : number = 31187;
    protected eplClient : EPLClient = new EPLClient();
    protected componentMounted : boolean = false;
    protected matchInfoCache : MatchInfoCache = new MatchInfoCache();
    protected lastMatchInfoRead : MatchInfoCache = new MatchInfoCache();
    protected selection : Selection = {
        gameweek: 22,
        differentialsOnly: false,
        teamName: "The Vardy Boys",
        teamId: 2365803
    }

    constructor(props : any) {
        super(props);
        this.state = {
            matchInfo : null,
            standings : null,
            selection : {
                gameweek: 22,
                differentialsOnly: false,
                teamName: "The Vardy Boys",
                teamId: 2365803
            }
        }
    }

    protected getTeamsArray(matchInfo : any) {
        var teams = new Array();
        for (var id in matchInfo.teams) {
          teams.push(matchInfo.teams[id]);
        }
        return teams;
    }

    protected findTeamStandingByName(teamName : string) {
        var standings = this.state.standings;
        if (standings) {
          for (var i in standings.standings.results) {
            var result = standings.standings.results[i];
            if (result.entry_name === teamName) {
              return result;
            }
          }
        }
        return null;
      }

    protected teamNameChanged(event : any) {
        var oldSelection = this.selection;
        if (oldSelection.teamName !== event.target.value) {
            this.selection.teamName = event.target.value;
            this.selection.teamId = this.findTeamStandingByName(event.target.value).entry;
            this.readMatchInfo();
        }
    }

    protected gameweekChanged(event : any) {
        if (this.selection.gameweek !== event.target.value) {
            this.selection.gameweek = event.target.value;
            this.readMatchInfo();
        }
    }

    protected differentialsChanged(event : any) {
        if (this.selection.differentialsOnly !== event.target.checked) {
            this.selection.differentialsOnly = event.target.checked;
            this.setState({
                standings: this.state.standings,
                selection: this.selection,
                matchInfo: this.state.matchInfo
            });
        }
    }

    protected readMatchInfo() {
        var now = new Date();
        var lastRead = this.lastMatchInfoRead.get(this.selection.teamId, this.selection.gameweek);
        if (!lastRead || (now.getTime() - lastRead.getTime()) > 60000) {
            this.lastMatchInfoRead.update(this.selection.teamId, this.selection.gameweek, now);
            this.eplClient.readTeamData(this.leagueId, this.selection.teamId, this.selection.gameweek, this.processMatchInfo.bind(this));
        }
        else {
            this.processMatchInfo(this.matchInfoCache.get(this.selection.teamId, this.selection.gameweek));
        }
      }
    
    protected readStandings() {
        if (!this.state.standings) {
            this.eplClient.readLeagueStandings(this.leagueId, this.processStandings.bind(this));
        }
    }
    
    protected processStandings(data : any) {
        var standings = data;
        if (this.componentMounted) {
            this.setState({
                matchInfo: this.state.matchInfo,
                standings: standings
            });
        }
      }

    protected processMatchInfo(data : any) {
        if (data) {
            for (var key in data.teams) {
                this.matchInfoCache.update(parseInt(key), this.selection.gameweek, data);
            }
            
            if (this.componentMounted) {
                this.setState({
                    matchInfo: data,
                    standings: this.state.standings,
                    selection: this.selection
                });
            }
        }
        else {
            if (this.componentMounted) {
                this.setState({
                    matchInfo: this.state.matchInfo,
                    standings: this.state.standings,
                    selection: this.state.selection
                });
            }
        }
      }
      
        protected onFocus() {
            //this.readMatchInfo();
        }

      public componentDidMount() {
        if (!this.componentMounted) {
            this.componentMounted = true;
            $(window).on("focus", this.onFocus.bind(this));
        }
        this.readMatchInfo();
        this.readStandings();
      }

      public componentWillUnmount() {
          $(window).off("focus", this.onFocus.bind(this))
          this.componentMounted = false;
      }

      protected renderNavBar() {
        return (
          <nav className="navbar navbar-toggleable-xl navbar-inline bg-mine navbar-dark">
            <a className="navbar-brand" href="#">FPL Live Matchtracker</a>
            <form className="navbar-form form-inline navbar-control">
                {this.renderSelectors()}
            </form>
          </nav>
        );
      }
    
      protected renderSelectors() : JSX.Element {
        var standings = this.state.standings;
        if (standings) {
          return <div>
                    <TeamSelector
                      config = {this.selection}
                      standings = {this.state.standings}
                      onChange = {this.teamNameChanged.bind(this)}
                    />
                  <GameweekSelector
                    config = {this.selection}
                    onChange = {this.gameweekChanged.bind(this)}
                  />
                  <DifferentialsSelector
                    config = {this.selection}
                    onChange = {this.differentialsChanged.bind(this)}
                  />
                </div>
        }
      }
    
      protected renderMatchInfo() : JSX.Element {
        var matchInfo = this.state.matchInfo;
        if (matchInfo) {
          var teams = this.getTeamsArray(matchInfo);
          return (
            <div>
              <MatchHeader  
                matchInfo={this.state.matchInfo}
              />
              <div className="container">
                <div className="row no-gutters">
                  <div className="col-4">
                    <div className="main-element">
                      <PickList picks={teams[0].picks}
                                config={this.state.selection}
                                differentials={this.state.matchInfo.differentials}/>
                    </div>
                  </div>
                  <div className="col-4 no-gutters">
                    <div className="d-flex main-element">
                      <Highlight team={teams[0]} events={matchInfo.allEvents}/>
                      <Highlight team={teams[1]} events={matchInfo.allEvents}/>
                    </div>
                    <div className="main-element">
                      <EventTable
                        eventList={matchInfo.allEvents}
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="main-element">
                        <PickList picks={teams[1].picks}
                                  config={this.state.selection}
                                  differentials={this.state.matchInfo.differentials}
                        />
                    </div>
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
              {this.renderNavBar()}
              {this.renderMatchInfo()}
            </div>
        );
    }
}