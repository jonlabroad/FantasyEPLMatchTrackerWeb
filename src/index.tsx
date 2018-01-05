import * as React from "react";
import * as ReactDOM from "react-dom";

import * as JQuery from "jquery";

import EPLClient from "./EPLClient";
import MatchHeader from "./components/MatchHeader";
import TeamName from "./components/TeamName";
import PickList from "./components/PickList";
import EventTable from "./components/EventTable";
import TeamRecord from "./components/TeamRecord";
import TeamSelector from "./components/TeamSelector";
import GameweekSelector from "./components/GameweekSelector";
import DifferentialsSelector from "./components/DifferentialsSelector";
import Highlight from "./components/Highlight";
import Selection from "./models/Selection";
import { TeamStarterScore, TeamSubScore } from "./components/TeamScore";

  var leagueId : number = 31187;
    var standings : any = null;
  var matchInfo : any = null;

  function getTeamsArray(matchInfo : any) {
    var teams = new Array();
    for (var id in matchInfo.teams) {
      teams.push(matchInfo.teams[id]);
    }
    return teams;
  }

  // TODO move this up
  var selection : Selection = {
    gameweek: 22,
    differentialsOnly: false,
    teamName: "The Vardy Boys",
    teamId: 2365803
  }

  function renderAll() {
    ReactDOM.render(
      <div>
        {renderNavBar()}
        {renderSelectors()}
        {renderMatchInfo()}
      </div>,
      document.getElementById("root")
    );
  }

  function renderNavBar() {
    return (
      <nav className="navbar navbar-expand-sm bg-mine navbar-dark">
			  <a className="navbar-brand" href="#">FPL Live Matchtracker</a>
		  </nav>
    );
  }

  function renderSelectors() : JSX.Element {
    if (standings) {
      return <div className="container">
        <div className="row">
          <div className="col-1"></div>
            <div className="col-4">
                <TeamSelector
                  config = {selection}
                  standings = {standings}
                  onChange = {teamNameChanged}
                />
            </div>
            <div className="col-3">
              <GameweekSelector
                config = {selection}
                onChange = {() => {}}
              />
            </div>
            <div className="col-3">
              <DifferentialsSelector
                config = {selection}
                onChange = {() => {}}
              />
            </div>
          </div>
        <div className="col-1"></div>
      </div>
    }
  }

  function renderMatchInfo() : JSX.Element {
    if (matchInfo) {
      var teams = getTeamsArray(matchInfo);
      return (
        <div>
        <div className="container-fluid match-strip-container mx-auto no-gutters">
          <div className="row-fluid">
            <div className="main-element match-strip-row">
              <MatchHeader  
                matchInfo={matchInfo}
              />
            </div>
          </div>
        </div>
          <div className="container">
            <div className="row no-gutters">
              <div className="col-4">
                <div className="main-element">
                  <PickList picks={teams[0].picks}/>
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
                    <PickList picks={teams[1].picks}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  function findTeamStandingByName(teamName : string) {
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

  function teamNameChanged(event : any) {
    if (selection.teamName !== event.target.value) {
      selection.teamName = event.target.value;
      var teamStanding = findTeamStandingByName(selection.teamName);
      selection.teamId = teamStanding.entry;
      readMatchInfo();
    }
  }

  function readMatchInfo() {
    eplClient.readTeamData(leagueId, selection.teamId, selection.gameweek, processMatchInfo);
  }

  function readStandings() {
    eplClient.readLeagueStandings(leagueId, function(data : any) {
      standings = data;
      renderAll();
    });
  }

  function processMatchInfo(data : any) {
    matchInfo = data;
    renderAll();
  }

  var eplClient : EPLClient = new EPLClient();
  readStandings();
  readMatchInfo();

  var window_focus;
  $(window).focus(function() {
    window_focus = true;
    readMatchInfo();
  }).blur(function() {
    window_focus = false;
  });

  setInterval(readMatchInfo, 120000);
