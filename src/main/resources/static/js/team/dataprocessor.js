var photoRoot = 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p';

$(document).ready(function() {
	var leagueId = 31187;
	var bucket = "fantasyeplmatchtracker";
	var matchInfoRoot = "data/${leagueId}";
	
	var teamId = getParameterByName('team');
	var gameweek = getParameterByName('gameweek');
	readTeamData(teamId, gameweek);

	var eventTable = new EventTable("events");
		
	function processMatchInfo(matchInfo) {
		var teams = getTeamsArray(matchInfo);
		setTeamsData(teams);
		eventTable.fillEventTable(matchInfo.allEvents, teamId);
		updateHighlights(teams, matchInfo);
	}
	
	function setTeamsData(teams) {
		teams.forEach(function (team, i) {
			setTeamData(team, i + 1);
		});
	}
	
	function updateHighlights(teams, matchInfo) {
		var team1Highlight = eventTable.getLatestHighPriorityEvent(teams[0].id, matchInfo.allEvents);
		var team2Highlight = eventTable.getLatestHighPriorityEvent(teams[1].id, matchInfo.allEvents);
		var highlights = [team1Highlight, team2Highlight];
		highlights.forEach(function (highlight, index) {
			var photoSuffix = getPhotoId(teams[index], highlight.footballerId);
			var photoUrl = photoRoot + photoSuffix;
			photoUrl = photoUrl.replace(".jpg", ".png");
			var teamNum = index + 1;
			$(`#team${teamNum}-highlight-img`).attr('src', photoUrl);
		});
	}
	
	function setTeamData(team, teamNum) {
		$(`#team${teamNum}-name`).text("#" + team.standing.rank + " " + team.standing.entry_name);
		$(`#team${teamNum}-record`).text(getRecord(team));
		$(`#team${teamNum}-score`).text(getScore(team, teamNum));
		addPicks(team, teamNum);
		
	}
	
	function getTeamsArray(matchInfo) {
		var teams = new Array();
		for (var id in matchInfo.teams) {
			teams.push(matchInfo.teams[id]);
		}
		return teams;
	}
	
	function getRecord(team) {
		var standing = team.standing;
		return `${standing.matches_won}W-${standing.matches_drawn}D-${standing.matches_lost}L`
	}
	
	function getScore(team, teamNum) {
		var startingScore = team.score.startingScore;
		var subScore = team.score.subScore;
		if (teamNum == 1) {
			return `(${subScore}) ${startingScore}`
		}
		return `${startingScore} (${subScore})`
	}
	
	function addPicks(team, teamNum) {
		var tableSel = `team${teamNum}-table`;
		var picks = team.picks;
		var squadNum = 1;
		for (var id in picks) {
			var pick = picks[id];
			var pickSel = `#team${teamNum}-pick${squadNum}`
			$(`${pickSel}`).addClass(getPlayerClasses(pick));
			$(`${pickSel}-role`).text(getRankText(pick)) 
			$(`${pickSel}-name`).text(getName(pick))
			appendPickData(teamNum, squadNum, pick);
			
			squadNum++;
		}
	}
	
	function appendPickData(teamId, pickNum, pick) {
		addExplainElement(teamId, pickNum, pick, "minutes");
		addExplainElement(teamId, pickNum, pick, "goals_scored");
		addExplainElement(teamId, pickNum, pick, "assists");
		addExplainElement(teamId, pickNum, pick, "clean_sheets");
		addExplainElement(teamId, pickNum, pick, "saves");
		addExplainElement(teamId, pickNum, pick, "own_goals");
		addExplainElement(teamId, pickNum, pick, "yellow_cards");
		addExplainElement(teamId, pickNum, pick, "red_cards");
		addExplainElement(teamId, pickNum, pick, "penalties_missed");
		addExplainElement(teamId, pickNum, pick, "penalties_saved");
		addExplainElement(teamId, pickNum, pick, "goals_conceded");
		addExplainElement(teamId, pickNum, pick, "bonus");	
	}
	
	function getPlayerClasses(pick) {
		var classes = "";
		var rawPick = pick.pick;
		if (rawPick.is_captain) {
			classes = classes + " text-captain";
		}
		if (rawPick.is_vice_captain) {
			classes = classes + " text-vice-captain";
		}
		return classes;
	}
	
	function getRankText(pick) {
		var rank = "";
		if (pick.pick.is_captain) {
			rank = "(C) ";
		}
		else if(pick.pick.is_vice_captain) {
			rank = "(VC) "
		}
		return rank;
	}
	
	function getName(pick) {
		return pick.footballer.rawData.footballer.web_name;
	}
	
	function addExplainElement(teamId, pickNum, pick, elementName) {
		var explain = getExplainElement(pick, elementName);
		if (explain) {
			var explainString = getExplainString(explain, elementName);
			$(`#team${teamId}-pick${pickNum}-icons`).append(`${explainString} `);
		}
	}
	
	function getExplainString(element, elementName) {
		switch (elementName) {
			case "minutes":
				return `${element.value}Min`;
			case "goals_scored":
				return `${element.value}GS`;
			case "bonus":
				return `${element.points}B`;
			case "clean_sheets":
				return "CS";
			case "assists":
				return `${element.value}A`;
			case "yellow_cards":
				return `${element.value}YC`;
			case "red_cards":
				return `${element.value}RC`;
			case "penalties_missed":
				return `${element.value}PKM`;
			case "goals_conceded":
				return `${element.value}GC`;
			case "saves":
				return `${element.value}S`;
			case "penalties_saved":
				return `${element.value}PKS`;
			case "own_goals":
				return `${element.value}OG`;
			default:
				return "";
		}
	}
	
	function getExplainElement(pick, elementName) {
		explain = pick.footballer.rawData.details.explain[0].explain[elementName];
		if (explain && explain.value > 0) {
			return explain;
		}
		return null;
	}
	
	function readTeamData(teamId, gameweek) {
		var link = getMatchInfoUrl(teamId, gameweek);
		return $.ajax({
			url: link,
			type: "GET",
			dataType: "json",
			success: function (data) {
				processMatchInfo(data);
			}
		});		
	}
	
	function getPhotoId(team, footballerId) {
		for (var i in team.picks) {
			if (team.picks[i].footballer.rawData.footballer.id == footballerId) {
				return team.picks[i].footballer.rawData.footballer.photo;
			}
		}
		return null;
	}
	
	function getMatchInfoUrl(teamId, gameweek) {
		return `https://s3.amazonaws.com/fantasyeplmatchtracker/data/${leagueId}/${teamId}/${gameweek}/MatchInfo`
	}
	
	function getParameterByName(name, url) {
	    if (!url)
	    	url = window.location.href;
	    
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
	    
	    if (!results)
	    	return null;
	    
	    if (!results[2])
	    	return '';
	    
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
});
