package com.vdc.hrservice.office.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Project;
import com.vdc.hrservice.office.domain.Sprint;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.dto.SprintDto;
import com.vdc.hrservice.office.repository.ProjectRepository;
import com.vdc.hrservice.office.repository.SprintRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SprintService {

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<SprintDto> findAllByProjectId(Long projectId, Boolean delFlg){
        List<Sprint> sprints = sprintRepository.findByProjectIdAndDelFlg(projectId, delFlg);
        return sprints.stream().map(SprintDto::of).collect(Collectors.toList());
    }

    public SprintDto findSprintById(Long id, Boolean delFlg){
        Sprint sprint = sprintRepository.findByIdAndDelFlg(id, delFlg).orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        return SprintDto.of(sprint);
    }

    public Sprint createNewSprinnt(Long projectId, SprintDto dto){
        Sprint newSprint = new Sprint();
        newSprint.setSprintName(dto.getSprintName());
        newSprint.setStartDay(DateUtils.convertShort2Zone(dto.getStartDay()));
        newSprint.setFinishDay(DateUtils.convertShort2Zone(dto.getFinishDay()));
        Project project = projectRepository.findByIdAndDelFlg(projectId, Constants.ALIVE).get();
        newSprint.setProject(project);
        newSprint.setTypeSprint(Constants.TYPE_SPRINT.LIST);
        if(dto.getTasks() != null){
            newSprint.setTasks(dto.getTasks().stream().map(Task::convert).collect(Collectors.toList()));
        }
        newSprint.setDelFlg(Constants.ALIVE);
        sprintRepository.save(newSprint);
        return newSprint;
    }

    public Sprint updateSprint(Long projectId, SprintDto dto){
        Sprint sprint = sprintRepository.findByIdAndDelFlg(dto.getId(), Constants.ALIVE).orElseThrow(() -> new IllegalArgumentException("can not found id:" + dto.getId()));
        sprint.setSprintName(dto.getSprintName());
        sprint.setStartDay(DateUtils.convertShort2Zone(dto.getStartDay()));
        sprint.setFinishDay(DateUtils.convertShort2Zone(dto.getFinishDay()));
        sprint.setTypeSprint(dto.getTypeSprint());
        Project project = projectRepository.findById(projectId).get();
        sprint.setProject(project);
        sprintRepository.save(sprint);
        return sprint;
    }

    public void deleteSprintById(Long id) throws Exception{
        Optional<Sprint> sprint = sprintRepository.findByIdAndDelFlg(id, Constants.ALIVE);
        if (sprint.isPresent()) {
            sprint.get().setDelFlg(Constants.NON_ALIVE);
            sprintRepository.save(sprint.get());
        } else {
            throw new Exception(String.format("Sprint with ID = %d not found", id));
        }
    }
 }
