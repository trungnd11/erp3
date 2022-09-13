package com.vdc.hrservice.office.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Project;
import com.vdc.hrservice.office.domain.Status;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.dto.StatusDto;
import com.vdc.hrservice.office.repository.ProjectRepository;
import com.vdc.hrservice.office.repository.StatusRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<StatusDto> findAllStattus(){
        List<Status> lstStatus = statusRepository.findByDelFlg(Constants.ALIVE);
        return lstStatus.stream().map(StatusDto::of).collect(Collectors.toList());
    }

    public List<StatusDto> findStatusByProjectId(Long projectId, Boolean delFlg){
        List<Status> lstStatus = statusRepository.findByProjectIdAndDelFlg(projectId, delFlg);
        return lstStatus.stream().map(StatusDto::of).collect(Collectors.toList());
    }

    public List<StatusDto> findAllStattusByDefaultEntity(){
        List<Status> lstStatus = statusRepository.findByDefaultEntityAndDelFlg(Boolean.TRUE, Constants.ALIVE);
        return lstStatus.stream().map(StatusDto::of).collect(Collectors.toList());
    }

    public StatusDto findStatusById(Long id, Boolean delFlg){
        Status status = statusRepository.findByIdAndDelFlg(id, delFlg).orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        return StatusDto.of(status);
    }

    public Status createStatusByProjectId(Long projectId, StatusDto dto){
        Status newStatus = new Status();
        newStatus.setName(dto.getName());
        newStatus.setDefaultEntity(Boolean.FALSE);
        newStatus.setStep(dto.getStep());
        newStatus.setColor(dto.getColor());
        newStatus.setDelFlg(Constants.ALIVE);
        Project project = projectRepository.findById(projectId).get();
        newStatus.setProject(project);
        if(dto.getLstTask() != null){
            newStatus.setLstTask(dto.getLstTask().stream().map(Task::of).collect(Collectors.toList()));
        }
        statusRepository.save(newStatus);
        return newStatus;

    }

    public Status updateStatus(StatusDto dto){
        Status status = statusRepository.findByIdAndDelFlg(dto.getId(), Constants.ALIVE).get();
        status.setName(dto.getName());
        status.setDefaultEntity(Boolean.FALSE);
        status.setStep(dto.getStep());
        status.setColor(dto.getColor());
        Project project = projectRepository.findById(dto.getProjectId()).get();
        status.setProject(project);
        if(dto.getLstTask() != null){
            status.setLstTask(dto.getLstTask().stream().map(Task::of).collect(Collectors.toList()));
        }
        statusRepository.save(status);
        return status;
    }

    public void deleteStattusById(Long id) throws Exception{
        Optional<Status> status = statusRepository.findByIdAndDelFlg(id, Constants.ALIVE);
        if (status.isPresent()) {
            status.get().setDelFlg(Constants.NON_ALIVE);
            statusRepository.save(status.get());
        } else {
            throw new Exception(String.format("Status with ID = %d not found", id));
        }
    }
}