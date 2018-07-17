import * as React from "react";

import EPLClient from "../../EPLClient";
import EventInfoCache from "../../EventInfoCache";
import MatchTrackerStateManager from "./MatchTrackerStateManager";
import MatchTrackerSelectionManager from "./MatchTrackerSelectionManager";
import Url from "../../Url";
import TeamSelector from "../TeamSelector";
import GameweekSelector from "../GameweekSelector";
import DifferentialsSelector from "../DifferentialsSelector";
import MatchHeader from "../MatchHeader";
import PickList from "../PickList";
import FixtureStatusGroup from "../FixtureStatusGroup";
import Highlight from "../Highlight";
import SimulatedH2h from "../SimulatedH2h";
import TrackerSelection from "../../models/TrackerSelection";
import LiveStandings from "../LiveStandings";
import EventTable from "../EventTable";
import VideoHighlightGroup from "../VideoHighlightGroup";
import { V4MAPPED } from "dns";

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
    public componentMounted : boolean = false;
    
    public eventInfoCache : EventInfoCache = new EventInfoCache();
    protected lastEventInfoRead : EventInfoCache = new EventInfoCache();   
    
    public videoHighlightCache : EventInfoCache = new EventInfoCache();
    protected lastVideoHighlightsRead : EventInfoCache = new EventInfoCache();
    
    protected stateManager : MatchTrackerStateManager = null;
    protected selManager : MatchTrackerSelectionManager = null;

    public selection : TrackerSelection = {
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
        this.stateManager = new MatchTrackerStateManager(this);
        this.selManager = new MatchTrackerSelectionManager(this);
        this.setUrl();
    }

    protected getTeamsArray(matchInfo : any) {
        var teams = new Array();
        for (var id in matchInfo.teams) {
          teams.push(matchInfo.teams[id]);
        }
        return teams;
    }

  public readEventInfo() {
    var selectedGameweek = this.selection.gameweek;
    var now = new Date();
    var lastRead = this.lastEventInfoRead.get(selectedGameweek);
    if (!lastRead || (now.getTime() - lastRead.getTime()) > 60000) {
        this.lastEventInfoRead.update(selectedGameweek, now);
        this.eplClient.readEventInfo(selectedGameweek, this.stateManager.processEventInfo.bind(this.stateManager));
    }
    else {
        this.stateManager.processEventInfo(this.eventInfoCache.get(selectedGameweek));
    }
  }

  public readVideoHighlights() {
    var selectedGameweek = this.selection.gameweek;
    var now = new Date();
    var lastRead = this.lastVideoHighlightsRead.get(selectedGameweek);
    if (!lastRead || (now.getTime() - lastRead.getTime()) > 60000) {
        this.lastVideoHighlightsRead.update(selectedGameweek, now);
        this.eplClient.readVideoHighlights(selectedGameweek, this.stateManager.processVideoHighlights.bind(this.stateManager));
    }
    else {
        this.stateManager.processVideoHighlights(this.videoHighlightCache.get(selectedGameweek));
    }

  }

    public readMatchInfo() {
        this.eplClient.readTeamData(this.leagueId, this.selection.teamId, this.selection.gameweek, this.selection.cup, this.stateManager.processMatchInfo.bind(this.stateManager));
    }
    
    public readStandings() {
        if (!this.state.standings) {
            this.eplClient.readLeagueStandings(this.leagueId, this.stateManager.processStandings.bind(this.stateManager));
        }
    }
    
    public setUrl() {
        Url.setUrl(this.selection.teamId, this.selection.gameweek, this.selection.differentialsOnly, this.selection.cup);
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
                      onChange = {this.selManager.teamNameChanged.bind(this.selManager)}
                    />
                  <GameweekSelector
                    config = {this.selection}
                    onChange = {this.selManager.gameweekChanged.bind(this.selManager)}
                  />
                  <DifferentialsSelector
                    config = {this.selection}
                    onChange = {this.selManager.differentialsChanged.bind(this.selManager)}
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
                      <EventTable
                        eventList={matchInfo.allEvents}
                        teams={teams.reduce(function(map, team) {
                          map[team.id] = team;
                          return map;
                        }, {})}
                      />
                    </div>
                    <div className="main-element">
                        <LiveStandings
                            liveStandings={matchInfo.liveStandings != null ? matchInfo.liveStandings.liveStandings : null}
                            team1Id={teams[0] != null ? teams[0].id : 0}
                            team2Id={teams[1] != null ? teams[1].id : 0}
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