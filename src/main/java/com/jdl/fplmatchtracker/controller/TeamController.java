package com.jdl.fplmatchtracker.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import data.MatchInfo;
import data.ProcessedTeam;
import persistance.S3JsonReader;
import processor.TeamProcessor;

@Controller
public class TeamController {
	@RequestMapping("/")
    public String greeting(
    		@RequestParam(value="team", required=false, defaultValue="2365803") Integer team,
    		@RequestParam(value="league", required=false, defaultValue="31187") Integer league,
    		Model model) {
        //List<Integer> teams = new ArrayList<Integer>();
        //teams.add(team);
        //TeamProcessor processor = new TeamProcessor(teams, league, true);
        //Map<Integer, ProcessedTeam> processedTeams = processor.process();
        
        //model.addAttribute("team", team);
        //model.addAttribute("league", league);
        //model.addAttribute("teams", processedTeams);
        
        return "index";
    }
    
    @GetMapping("/info")
    public String info(@RequestParam(value="id", required=true) Integer id, Model model) {
    	S3JsonReader reader = new S3JsonReader();
    	MatchInfo info = reader.read(String.format("data/31187/%d/16/MatchInfo", id), MatchInfo.class);
    	model.addAttribute(info);
    	return "info";
    }
}
