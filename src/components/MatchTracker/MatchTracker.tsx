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
import NavTab from "../NavTab";
import TabType from "../../models/TabType";
import ScoutingTab from "./ScoutingTab";

export interface MatchTrackerProps {
}

export interface MatchTrackerState {
  matchInfo: any;
  standings: any;
  selection: any;
  eventInfo: any;
  videoHighlights: any;
}

export default class MatchTracker extends React.Component<MatchTrackerProps, MatchTrackerState> {
  public eplClient: EPLClient;
  public componentMounted: boolean = false;

  public eventInfoCache: EventInfoCache = new EventInfoCache();
  protected lastEventInfoRead: EventInfoCache = new EventInfoCache();

  public videoHighlightCache: EventInfoCache = new EventInfoCache();
  protected lastVideoHighlightsRead: EventInfoCache = new EventInfoCache();

  protected stateManager: MatchTrackerStateManager = null;
  protected selManager: MatchTrackerSelectionManager = null;

  protected defaultGameweek: number = 1;
  public selection: TrackerSelection = null;

  public appConfig: any = null;

  constructor(props: any) {
    super(props);
    var appConfig = this.readAppConfig();
    if (appConfig) {
      this.defaultGameweek = appConfig.CurrentGameWeek;
      this.appConfig = appConfig;
    }

    this.stateManager = new MatchTrackerStateManager(this);
    this.selManager = new MatchTrackerSelectionManager(this);

    this.selection = this.getTrackerSelection();
    this.state = {
      eventInfo: null,
      matchInfo: null,
      standings: null,
      videoHighlights: null,
      selection: this.selection
    }
    this.eplClient = new EPLClient(this.selection.leagueId, this.selection.seasonStartYear);
    this.setUrl();
  }

  protected getTrackerSelection(): TrackerSelection {
    var selectedGameweek = parseInt(Url.getParameterByName("gameweek", this.defaultGameweek.toString()));
    var defaultTab = (this.appConfig == null || selectedGameweek <= this.appConfig.CurrentGameWeek) ? TabType.MATCH : TabType.SCOUTING;
    var tabVal = selectedGameweek <= this.appConfig.CurrentGameWeek ? Url.getParameterByName("tab", defaultTab.toString()) : TabType.SCOUTING;
    return {
      seasonStartYear: parseInt(Url.getParameterByName("season", "2018")),
      leagueId: parseInt(Url.getParameterByName("league", "5815")),
      gameweek: selectedGameweek,
      differentialsOnly: Url.getParameterByName("differentials", "false") == 'true',
      teamName: "",
      teamId: parseInt(Url.getParameterByName("team", "124911")),
      cup: Url.getParameterByName("cup", "false") == 'true',
      tab: tabVal
    };
  }

  protected getTeamsArray(matchInfo: any) {
    var teams = new Array();
    for (var id in matchInfo.teams) {
      teams.push(matchInfo.teams[id]);
    }

    if (teams.length == 1) {
      teams.push(teams[0]);
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
    this.eplClient.readTeamData(this.selection.leagueId, this.selection.teamId, this.selection.gameweek, this.selection.cup, this.selection.tab == TabType.SCOUTING, this.stateManager.processMatchInfo.bind(this.stateManager));
  }

  public readStandings() {
    if (!this.state.standings) {
      this.eplClient.readLeagueStandings(this.selection.leagueId, this.stateManager.processStandings.bind(this.stateManager));
    }
  }

  public readAppConfig() {
    return EPLClient.readAppConfigSync();
  }

  public setUrl() {
    Url.setUrl(this.selection.seasonStartYear, this.selection.leagueId, this.selection.teamId, this.selection.gameweek, this.selection.differentialsOnly, this.selection.cup, this.selection.tab);
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

  protected renderSelectors(): JSX.Element {
    var standings = this.state.standings;
    if (standings) {
      return <div>
        <TeamSelector
          config={this.selection}
          standings={this.state.standings}
          onChange={this.selManager.teamNameChanged.bind(this.selManager)}
        />
        <GameweekSelector
          config={this.selection}
          onChange={this.selManager.gameweekChanged.bind(this.selManager)}
        />
        <DifferentialsSelector
          config={this.selection}
          onChange={this.selManager.differentialsChanged.bind(this.selManager)}
        />
      </div>
    }
  }

  protected renderHeader(): JSX.Element {
    return (
      <div>
        <MatchHeader
          matchInfo={this.state.matchInfo}
          isScouting={this.selection.tab == TabType.SCOUTING}
        />
        <div className="container-fluid">
          <div className="row justify-content-center no-gutters">
            <div className="col-10">
              <NavTab
                onClick={this.selManager.tabChanged.bind(this.selManager)}
                matchAvailable={this.selection.gameweek <= this.appConfig.CurrentGameWeek}
                selection={this.selection.tab}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  protected renderTab(): JSX.Element {
    var matchInfo = this.state.matchInfo;
    if (matchInfo) {
      var teams = this.getTeamsArray(matchInfo);
      if (this.selection.tab == TabType.MATCH) {
        var tab = 
          <div className="container-fluid">
          <div className="row no-gutters justify-content-center">
            <div className="col order-1 d-flex flex-column align-items-end side-column">
              <div className="main-element side-column-element">
                <PickList picks={teams[0] != null ? teams[0].picks : null}
                  config={this.state.selection}
                  differentials={this.state.matchInfo.differentials}
                  isScouting={false}
                  />
              </div>
              <div className="main-element side-column-element">
                <FixtureStatusGroup
                  team={teams[0]}
                  fixtures={this.state.eventInfo ? this.state.eventInfo.fixtures : null}
                  clubs={this.state.eventInfo ? this.state.eventInfo.clubs : null}
                />
              </div>
            </div>
            <div className="col order-3 d-flex flex-column align-items-start side-column">
              <div className="main-element side-column-element">
                <PickList picks={teams[1] != null ? teams[1].picks : null}
                  config={this.state.selection}
                  differentials={this.state.matchInfo.differentials}
                  isScouting={false}
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

            <div className="col order-2 center-column">
              <div className="main-element d-flex justify-content-center">
                <Highlight team={teams[0]} events={matchInfo.allEvents} />
                <Highlight team={teams[1]} events={matchInfo.allEvents} />
              </div>
              <div className="main-element">
                <EventTable
                  eventList={matchInfo.allEvents}
                  teams={teams.reduce(function (map, team) {
                    map[team.id] = team;
                    return map;
                  }, {})}
                  gameweek={this.selection.gameweek}
                />
              </div>
              <div className="main-element">
                <LiveStandings
                  liveStandings={matchInfo.liveStandings != null ? matchInfo.liveStandings.liveStandings : null}
                  team1={teams[0]}
                  team2={teams[1]}
                />
              </div>
              <div className="main-element">
                <VideoHighlightGroup
                  playlistItems={this.state.videoHighlights}
                />
              </div>
            </div>
          </div>
        </div>
      }
      else if (this.selection.tab == TabType.SCOUTING) {
        var tab = <ScoutingTab
          matchInfo={matchInfo}
          standings={this.state.standings}
          selection={this.state.selection}
          eventInfo={this.state.eventInfo}
        />
      }
    }
    return tab;
  }

  protected renderMatchInfo(): JSX.Element {
    var matchInfo = this.state.matchInfo;
    if (matchInfo) {
        return (
          <div>
            {this.renderHeader()}
            {this.renderTab()}
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