package com.vdc.hrservice.hr.org_team.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vdc.hrservice.common.HttpResponse;
import com.vdc.hrservice.hr.org_team.dto.TeamDto;
import com.vdc.hrservice.hr.org_team.dto.TeamMemberDto;
import com.vdc.hrservice.hr.org_team.dto.TeamDto.TeamDtoS;
import com.vdc.hrservice.hr.org_team.service.TeamService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(path = "/api/v1/team")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @PostMapping(path = "")
    public ResponseEntity<?> createTeam(@RequestParam(name = "department") Long department,
            @RequestBody TeamDto teamDto) {

        try {
            TeamDto rs = teamService.saveTeam(department, teamDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new HttpResponse<TeamDto>(rs));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

    @GetMapping(path="")
    public ResponseEntity<?> getAllTeam(@RequestParam(name = "department") Long department){

        try {
            List<TeamDtoS> teamDtoSs = teamService.getAllTeam(department);
            return ResponseEntity.ok().body(new HttpResponse<List<TeamDtoS>>(teamDtoSs));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

    @PutMapping(value = "/{id}/member")
    public ResponseEntity<?> updateMember(@PathVariable("id") Long teamId, @RequestBody List<TeamMemberDto> teamMemberDtos) {
        try {
            TeamDto teamDto = teamService.updateTeamMember(teamId, teamMemberDtos);
            // TeamDto teamDto = null;
            return ResponseEntity.ok().body(new HttpResponse<TeamDto>(teamDto));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteTeam(@PathVariable("id") Long teamId){
        try {
            teamService.deleteTeam(teamId);
            return ResponseEntity.ok().body(new HttpResponse<>("Delete successfully!"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

    @PutMapping(path = "/{id}/leader")
    public ResponseEntity<?> setLeader(@PathVariable("id") Long teamId, @RequestParam(name = "member") Long memberId){
        try {
            TeamMemberDto memberDto=  teamService.setLeader(teamId, memberId);
            return ResponseEntity.ok().body(new HttpResponse<>(memberDto));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

}
