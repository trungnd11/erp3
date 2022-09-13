package com.vdc.hrservice.office.service;

import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.domain.Work;
import com.vdc.hrservice.office.dto.TaskDto;
import com.vdc.hrservice.office.dto.WorkDto;
import com.vdc.hrservice.office.repository.TaskRepository;
import com.vdc.hrservice.office.repository.WorkRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkService {
    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private TaskRepository taskRepository;

    public List<WorkDto> findAllWorkByTaskId(Long taskId, Boolean delFlg){
        List<Work> lstWork = workRepository.findByTaskIdAndDelFlg(taskId, delFlg);
        return lstWork.stream().map(WorkDto::of).collect(Collectors.toList());
    } 

    public WorkDto findWorkById(Long id, Boolean delFlg){
        Work work = workRepository.findByIdAndDelFlg(id, delFlg).orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        return WorkDto.of(work);
    }

    public Work createNewWork(Long projectId, WorkDto dto){
        Work newWork = new Work();
        newWork.setName(dto.getName());
        newWork.setWorkStatus(Constants.TASK_STATUS.UNFINISHED);
        Task task = taskRepository.findByIdAndDelFlg(projectId, Constants.ALIVE).get();
        newWork.setTask(task);
        newWork.setDelFlg(Constants.ALIVE);
        workRepository.save(newWork);
        return newWork;
    }

    public Work updateWork(WorkDto dto){
        Work work = workRepository.findByIdAndDelFlg(dto.getId(), Constants.ALIVE).get();
        work.setName(dto.getName());
        work.setWorkStatus(dto.getWorkStatus());
        workRepository.save(work);
        return work;
    }

}
