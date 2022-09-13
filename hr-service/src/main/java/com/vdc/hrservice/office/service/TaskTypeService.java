package com.vdc.hrservice.office.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.TaskType;
import com.vdc.hrservice.office.dto.TaskTypeDto;
import com.vdc.hrservice.office.repository.TaskTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskTypeService {
    @Autowired
    private TaskTypeRepository taskTypeRepository;

    public List<TaskTypeDto> findAllTaskType(Boolean delFlg){
        List<TaskType> lstTaskType = taskTypeRepository.findByDelFlg(delFlg);
        return lstTaskType.stream().map(TaskTypeDto::of).collect(Collectors.toList());
    }


    public TaskTypeDto findTaskTypeById(Long id, Boolean delFlg){
        TaskType taskType = taskTypeRepository.findByIdAndDelFlg(id, delFlg).orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        return TaskTypeDto.of(taskType);
    }

    public TaskType createNewTaskType(TaskTypeDto dto){
        TaskType newTaskType = new TaskType();
        newTaskType.setName(dto.getName());
        newTaskType.setDelFlg(Constants.ALIVE);
        taskTypeRepository.save(newTaskType);
        return newTaskType;
    }

    public TaskType updateTaskType(TaskTypeDto dto){
        TaskType taskType = taskTypeRepository.findByIdAndDelFlg(dto.getId(), Constants.ALIVE).get();
        taskType.setName(dto.getName());
        taskTypeRepository.save(taskType);
        return taskType;
    }

    public void deleteTaskType(Long id) throws Exception{
        Optional<TaskType> taskType = taskTypeRepository.findById(id);
        if (taskType.isPresent()) {
            taskType.get().setDelFlg(Constants.NON_ALIVE);
            taskTypeRepository.save(taskType.get());
        } else {
            throw new Exception(String.format("Project with ID = %d not found", id));
        }
    }
}
