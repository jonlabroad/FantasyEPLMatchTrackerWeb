package com.jdl.fplmatchtracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdl.fplmatchtracker.persistance.S3JsonReader;

import data.MatchInfo;

@RestController
public class TeamController {
    @RequestMapping("/team")
    public String greeting(@RequestParam(value="id", required=false, defaultValue="2365803") Integer id, Model model) {
        model.addAttribute("id", id);
        return "team";
    }
    
    @GetMapping("/info")
    public MatchInfo info(@RequestParam(value="id", required=true) Integer id, Model model) {
    	S3JsonReader reader = new S3JsonReader();
    	MatchInfo info = reader.read(String.format("data/31187/%d/16/MatchInfo", id), MatchInfo.class);
    	return info;
    }
}
