var photoRoot = 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/p';

$(document).ready(function() {
	var leagueId = 31187;
	var bucket = "fantasyeplmatchtracker";
	var matchInfoRoot = "data/${leagueId}";
	
	var teamId = getParameterByName('team');
	var gameweek = getParameterByName('gameweek');
	readTeamData(teamId, gameweek);

	var teamPicks = [new PickList(1, "team1-table"), new PickList(2, "team2-table")];
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
		teamPicks[teamNum-1].addPicks(team.picks);		
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
