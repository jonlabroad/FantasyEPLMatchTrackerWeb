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
import FixtureStatusGroup from "./FixtureStatusGroup";
import EventInfoCache from "../EventInfoCache";
import VideoHighlightGroup from "./VideoHighlightGroup"
import SimulatedH2h from "./SimulatedH2h";
import LiveStandings from "./LiveStandings";
import Url from "../Url";
import { TeamStarterScore, TeamSubScore } from "./TeamScore";

export interface MatchTrackerProps {
}

export interface MatchTrackerState {
    matchInfo : any;
    standings : any;
    selection : any;
    eventInfo : any;
    videoHighlights : any;
}

export default class MatchTracker extends React.Component<MatchTrackerProps, MatchTrackerState> {
    protected leagueId : number = 31187;
    protected eplClient : EPLClient = new EPLClient();
    protected componentMounted : boolean = false;
    
    protected eventInfoCache : EventInfoCache = new EventInfoCache();
    protected lastEventInfoRead : EventInfoCache = new EventInfoCache();   
    
    protected videoHighlightCache : EventInfoCache = new EventInfoCache();
    protected lastVideoHighlightsRead : EventInfoCache = new EventInfoCache();
    
    protected selection : Selection = {
        gameweek: parseInt(Url.getParameterByName("gameweek", "22")),
        differentialsOnly: Url.getParameterByName("differentials", "false") == 'true',
        teamName: "",
        teamId: parseInt(Url.getParameterByName("team", "2365803")),
        cup: Url.getParameterByName("cup", "false") == 'true'
    }

    constructor(props : any) {
        super(props);
        this.state = {
            eventInfo : null,
            matchInfo : null,
            standings : null,
            videoHighlights : null,
            selection : {
                gameweek: parseInt(Url.getParameterByName("gameweek", "22")),
                differentialsOnly: Url.getParameterByName("differentials", "false") == 'true',
                teamName: "",
                teamId: parseInt(Url.getParameterByName("team", "2365803")),
                cup: Url.getParameterByName("cup", "false") == 'true'
            }
        }
        this.setUrl();
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

      protected findTeamStandingById(teamId : number, standings? : any) {
        var standings = standings ? standings : this.state.standings;
        if (standings) {
          for (var i in standings.standings.results) {
            var result = standings.standings.results[i];
            if (result.entry == teamId) {
              return result;
            }
          }
        }
      }

    protected teamNameChanged(event : any) {
        var oldSelection = this.selection;
        if (oldSelection.teamName !== event.target.value) {
            this.selection.teamName = event.target.value;
            this.selection.teamId = this.findTeamStandingByName(event.target.value).entry;
            this.setUrl();
            this.readMatchInfo();
        }
    }

    protected gameweekChanged(event : any) {
        if (this.selection.gameweek !== event.target.value) {
            this.selection.gameweek = event.target.value;
            this.setUrl();
            this.readMatchInfo();
            this.readEventInfo();
            this.readVideoHighlights();
        }
    }

    protected differentialsChanged(event : any) {
        if (this.selection.differentialsOnly !== event.target.checked) {
            this.selection.differentialsOnly = event.target.checked;
            this.setUrl();
            this.setState({
                standings: this.state.standings,
                selection: this.selection,
                matchInfo: this.state.matchInfo,
                eventInfo: this.state.eventInfo
            });
        }
    }

  protected readEventInfo() {
    var selectedGameweek = this.selection.gameweek;
    var now = new Date();
    var lastRead = this.lastEventInfoRead.get(selectedGameweek);
    if (!lastRead || (now.getTime() - lastRead.getTime()) > 60000) {
        this.lastEventInfoRead.update(selectedGameweek, now);
        this.eplClient.readEventInfo(selectedGameweek, this.processEventInfo.bind(this));
    }
    else {
        this.processEventInfo(this.eventInfoCache.get(selectedGameweek));
    }
  }

  protected readVideoHighlights() {
    var selectedGameweek = this.selection.gameweek;
    var now = new Date();
    var lastRead = this.lastVideoHighlightsRead.get(selectedGameweek);
    if (!lastRead || (now.getTime() - lastRead.getTime()) > 60000) {
        this.lastVideoHighlightsRead.update(selectedGameweek, now);
        this.eplClient.readVideoHighlights(selectedGameweek, this.processVideoHighlights.bind(this));
    }
    else {
        this.processVideoHighlights(this.videoHighlightCache.get(selectedGameweek));
    }

  }

    protected readMatchInfo() {
        this.eplClient.readTeamData(this.leagueId, this.selection.teamId, this.selection.gameweek, this.selection.cup, this.processMatchInfo.bind(this));
    }
    
    protected readStandings() {
        if (!this.state.standings) {
            this.eplClient.readLeagueStandings(this.leagueId, this.processStandings.bind(this));
        }
    }
    
    protected processStandings(data : any) {
        var standings = data;
        if (this.componentMounted) {
            var standing = this.findTeamStandingById(this.selection.teamId, standings);
            this.selection.teamName = standing.entry_name;
            this.setState({
                matchInfo: this.state.matchInfo,
                standings: standings,
                selection: this.selection
            });
        }
      }

      protected setUrl() {
        Url.setUrl(this.selection.teamId, this.selection.gameweek, this.selection.differentialsOnly, this.selection.cup);
      }

    protected processMatchInfo(data : any) {
        if (data) {          
            if (this.componentMounted) {
                this.setState({
                    matchInfo: data,
                    selection: this.selection
                });
            }
        }
        else {
            if (this.componentMounted) {
                this.setState({
                    matchInfo: this.state.matchInfo,
                });
            }
        }
      }

      protected processEventInfo(data : any) {
        if (data) {
            this.eventInfoCache.update(this.selection.gameweek, data);
            
            if (this.componentMounted) {
                this.setState({
                    eventInfo: data,
                    selection: this.selection
                });
            }
        }
        else {
            if (this.componentMounted) {
                this.setState({
                    eventInfo: this.state.eventInfo
                });
            }
        }
      }  
      
      protected processVideoHighlights(data : any) {
        if (data) {
            this.videoHighlightCache.update(this.selection.gameweek, data);
            
            if (this.componentMounted) {
                this.setState({
                    videoHighlights: data,
                    selection: this.selection
                });
            }
        }
        else {
            if (this.componentMounted) {
                this.setState({
                    videoHighlights: this.state.videoHighlights,
                });
            }
        }
      }        
      
        protected onFocus() {
            this.readMatchInfo();
            this.readEventInfo();
            this.readVideoHighlights();
        }

      public componentDidMount() {
        if (!this.componentMounted) {
            this.componentMounted = true;
            $(window).on("focus", this.onFocus.bind(this));
        }
        this.readMatchInfo();
        this.readStandings();
        this.readEventInfo();
        this.readVideoHighlights();
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
              <div className="container-fluid">
                <div className="row justify-content-center no-gutters">
                  <div className="col-4 d-flex flex-column align-items-end">
                    <div className="d-flex main-element side-column-element">
                      <PickList picks={teams[0] != null ? teams[0].picks : null}
                                config={this.state.selection}
                                differentials={this.state.matchInfo.differentials}/>
                    </div>
                    <div className="main-element side-column-element">
                      <FixtureStatusGroup
                        team={teams[0]}
                        fixtures={this.state.eventInfo ? this.state.eventInfo.fixtures : null}
                        clubs={this.state.eventInfo ? this.state.eventInfo.clubs : null}
                      />                    
                    </div>
                  </div>
                  <div className="col-4 d-flex flex-column align-items-center no-gutters center-column">
                    <div className="d-flex main-element justify-content-center">
                      <Highlight team={teams[0]} events={matchInfo.allEvents}/>
                      <Highlight team={teams[1]} events={matchInfo.allEvents}/>
                    </div>
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
                    <div className="main-element">
                      <EventTable
                        eventList={matchInfo.allEvents}
                      />
                    </div>
                    <div className="main-element">
                      <VideoHighlightGroup
                        playlistItems={this.state.videoHighlights}
                      />
                    </div>
                  </div>
                  <div className="col-4 d-flex flex-column align-items-start">
                    <div className="main-element side-column-element">
                        <PickList picks={teams[1] != null ? teams[1].picks : null}
                                  config={this.state.selection}
                                  differentials={this.state.matchInfo.differentials}
                        />
                    </div>
                    <div className="main-element side-column-element">
                      <FixtureStatusGroup
                        team={teams[1]}
                        fixtures={this.state.eventInfo ? this.state.eventInfo.fixtures : null}
                        clubs={this.state.eventInfo ? this.state.eventInfo.clubs : null}
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