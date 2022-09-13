package com.vdc.hrservice.office.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.office.domain.AttachFile;
import com.vdc.hrservice.office.domain.HashTag;
import com.vdc.hrservice.office.domain.Label;
import com.vdc.hrservice.office.domain.Priority;
import com.vdc.hrservice.office.domain.Project;
import com.vdc.hrservice.office.domain.Sprint;
import com.vdc.hrservice.office.domain.Status;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.domain.TaskType;
import com.vdc.hrservice.office.domain.Work;
import com.vdc.hrservice.office.dto.HashTagDto;
import com.vdc.hrservice.office.dto.ProjectDto;
import com.vdc.hrservice.office.dto.SprintDto;
import com.vdc.hrservice.office.dto.StatusDto;
import com.vdc.hrservice.office.dto.TaskDto;
import com.vdc.hrservice.office.dto.WorkDto;
import com.vdc.hrservice.office.dto.TaskDto.BasicTaskDto;
import com.vdc.hrservice.office.repository.HashTagRepository;
import com.vdc.hrservice.office.repository.LabelRepository;
import com.vdc.hrservice.office.repository.PriorityRepository;
import com.vdc.hrservice.office.repository.SprintRepository;
import com.vdc.hrservice.office.repository.StatusRepository;
import com.vdc.hrservice.office.repository.TaskRepository;
import com.vdc.hrservice.office.repository.TaskTypeRepository;
import com.vdc.hrservice.office.repository.WorkRepository;

import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private PriorityRepository priorityRepository;

    @Autowired
    private LabelRepository labelRepository;

    @Autowired
    private TaskTypeRepository taskTypeRepository;

    @Autowired
    private HashTagRepository hashTagRepository;

    public Page<TaskDto> findAllTaskByProjectId(Long projectId, Boolean delFlg, Pageable page) {
        Page<Task> lstTask = taskRepository.findByProjectIdAndDelFlg(projectId, delFlg, page);
        return lstTask.map(TaskDto::of);
    }

    public List<TaskDto> findTaskByStatusId(Long statusId, Boolean delFlg) {
        List<Task> lstTask = taskRepository.findByStatusIdAndDelFlg(statusId, delFlg);
        return lstTask.stream().map(TaskDto::of).collect(Collectors.toList());
    }

    public List<BasicTaskDto> findTaskByProjectId(Long projectId, Boolean delFlg) {
        List<Task> lstTask = taskRepository.findByProjectIdAndDelFlg(projectId, delFlg);
        return lstTask.stream().map(BasicTaskDto::of).collect(Collectors.toList());
    }

    public List<TaskDto> findTaskByProjectIdAndDelFlg(Long projectId, Boolean delFlg) {
        List<Task> task = taskRepository.findTaskByProjectIdAndSprintIdIsNullAndDelFlg(projectId, delFlg);
        return task.stream().map(TaskDto::of).collect(Collectors.toList());
    }

    public Page<TaskDto> findTasksBySprintIdAndDelFlg(Long sprintId, Boolean delFlg, Pageable page) {
        Page<Task> tasks = taskRepository.findBySprintIdAndDelFlg(sprintId, delFlg, page);
        return tasks.map(TaskDto::of);
    }

    public Page<TaskDto> findTaskByTaskName(String taskName, Boolean delFlg, Pageable page) {
        Page<Task> lstTask = taskRepository.findByTaskNameContainingAndDelFlg(taskName, delFlg, page);
        return lstTask.map(TaskDto::of);
    }

    public Page<TaskDto> findTaskByTaskNo(String taskNo, Boolean delFlg, Pageable page) {
        Page<Task> lstTask = taskRepository.findByTaskNoContainingAndDelFlg(taskNo, delFlg, page);
        return lstTask.map(TaskDto::of);
    }

    public Page<TaskDto> findTasksByFullNameOrTaskNameOrTaskNoAndDelFlg(String search, Boolean delFlg, Pageable page) {
        Page<Task> lstTask = taskRepository.findTasksByFullNameOrTaskNameOrTaskNoAndDelFlg(search, delFlg, page);
        return lstTask.map(TaskDto::of);
    }

    public List<TaskDto> findAllTaskByParrent(Long parrent, Boolean delFlg) {
        List<Task> lstTask = taskRepository.findByParrentAndDelFlg(parrent, delFlg);
        return lstTask.stream().map(TaskDto::of).collect(Collectors.toList());
    }

    public List<TaskDto> findTasksBySprintIdAndStatusId(Long sprintId, Long statusId, Boolean delFlg) {
        List<Task> tasks = taskRepository.findBySprintIdAndStatusIdAndDelFlg(sprintId, statusId, delFlg);
        return tasks.stream().map(TaskDto::of).collect(Collectors.toList());
    }

    public TaskDto findTaskById(Long id, Boolean delFlg) {
        Task task = taskRepository.findByIdAndDelFlg(id, delFlg)
                .orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        return TaskDto.of(task);
    }

    public List<TaskDto> findTasksByProjectIdAndSprintId(Long projectId, Long sprintId, Boolean delFlg) {
        List<Task> tasks = taskRepository.findByProjectIdAndSprintIdAndDelFlg(projectId, sprintId, delFlg);
        return tasks.stream().map(TaskDto::of).collect(Collectors.toList());
    }

    public Task createNewTaskByProjectId(Long projectId, Long sprintId, Long statusId, TaskDto dto) {
        Task task = new Task();
        task.setTaskName(dto.getTaskName());
        task.setDescription(dto.getDescription());
        task.setExpectedStart(DateUtils.convertDatetime(dto.getExpectedStart()));
        task.setExpectedEnding(DateUtils.convertDatetime(dto.getExpectedEnding()));
        task.setParrent(dto.getParrent());
        task.setProgress(0.0);
        task.setCalculationMethod(dto.getCalculationMethod());
        task.setWeight(dto.getWeight());
        if (dto.getTaskNo() == null) {
            task.setTaskNo(randomString());
        }
        task.setTypeDuration(Constants.TYPE_DURATION.DATE);
        if (dto.getReporter() != null) {
            task.setReporter(Employee.convert(dto.getReporter()));
        }
        ProjectDto project = projectService.findProjectById(projectId, Constants.ALIVE);
        task.setProject(Project.of(project));
        if (sprintId != null) {
            Sprint sprint = sprintRepository.findByIdAndDelFlg(sprintId, Constants.ALIVE).get();
            task.setSprint(sprint);
        }

        if (statusId != null) {
            Status status = statusRepository.findByIdAndDelFlg(statusId, Constants.ALIVE).get();
            task.setStatus(status);
        }

        if (dto.getLstWatcher() != null) {
            task.setLstWatcher(dto.getLstWatcher().stream().map(Employee::convert).collect(Collectors.toList()));
        }
        if (dto.getLstAssignee() != null) {
            task.setLstAssignee(dto.getLstAssignee().stream().map(Employee::convert).collect(Collectors.toList()));
        }
        if (dto.getFiles() != null) {
            task.setFiles(dto.getFiles().stream().map(AttachFile::of).collect(Collectors.toList()));
        }
        if (dto.getPriorityId() != null) {
            Priority priority = priorityRepository.findByIdAndDelFlg(dto.getPriorityId(), Constants.ALIVE).get();
            task.setPriority(priority);
        }

        if (dto.getLabelId() != null) {
            Label label = labelRepository.findByIdAndDelFlg(dto.getLabelId(), Constants.ALIVE).get();
            task.setLabel(label);
        }

        if (dto.getTaskTypeId() != null) {
            TaskType taskType = taskTypeRepository.findByIdAndDelFlg(dto.getTaskTypeId(), Constants.ALIVE).get();
            task.setTaskType(taskType);
        }

        if (dto.getLstWorks() != null) {
            for (Work work : dto.getLstWorks().stream().map(Work::of).collect(Collectors.toList())) {
                work.setTask(task);
            }
            task.setLstWorks(dto.getLstWorks().stream().map(Work::of).collect(Collectors.toList()));
        }

        if(dto.getTags() != null){
            List<HashTagDto> hashTagNoIds = dto.getTags().stream().filter(tag -> tag.getId() == null).collect(Collectors.toList());
            List<HashTag> convertDto = hashTagNoIds.stream().map(HashTag::of).collect(Collectors.toList());
            List<HashTag> saveHashTags = hashTagRepository.saveAll(convertDto);

            List<HashTagDto> hashTagDto = dto.getTags().stream().filter(tag -> tag.getId() != null).collect(Collectors.toList());
            List<HashTag> newHashTags = Stream.of(saveHashTags, hashTagDto.stream().map(HashTag::of).collect(Collectors.toList()))
                                              .flatMap(Collection::stream)
                                              .collect(Collectors.toList());
            task.setTags(newHashTags);
        }

        task.setDelFlg(Constants.ALIVE);
        taskRepository.save(task);
        return task;
    }

    public String randomString() {
        String rootString = "#AC";
        String randomStr = RandomStringUtils.randomNumeric(5);
        return rootString.concat(randomStr);
    }

    @Transactional
    public Task updateTask(Long sprintId, Long statusId, TaskDto dto) {
        Task task = taskRepository.findByIdAndDelFlg(dto.getId(), Constants.ALIVE).get();
        task.setTaskName(dto.getTaskName());
        task.setDescription(dto.getDescription());
        task.setWeight(dto.getWeight());
        if (dto.getStartDay() != null) {
            task.setStartDay(DateUtils.convertDatetime(dto.getStartDay()));
        }
        if (dto.getFinishDay() != null) {
            task.setFinishDay(DateUtils.convertDatetime(dto.getFinishDay()));
        }
        if (dto.getLstWatcher() != null) {
            task.setLstWatcher(dto.getLstWatcher().stream().map(Employee::convert).collect(Collectors.toList()));
        }
        if (dto.getLstAssignee() != null) {
            task.setLstAssignee(dto.getLstAssignee().stream().map(Employee::convert).collect(Collectors.toList()));
        }
        if (dto.getFiles() != null) {
            task.setFiles(dto.getFiles().stream().map(AttachFile::of).collect(Collectors.toList()));
        }
        if (dto.getPriorityId() != null) {
            Priority priority = priorityRepository.findByIdAndDelFlg(dto.getPriorityId(), Constants.ALIVE).get();
            task.setPriority(priority);
        }

        if (dto.getLabelId() != null) {
            Label label = labelRepository.findByIdAndDelFlg(dto.getLabelId(), Constants.ALIVE).get();
            task.setLabel(label);
        }

        if (dto.getTaskTypeId() != null) {
            TaskType taskType = taskTypeRepository.findByIdAndDelFlg(dto.getTaskTypeId(), Constants.ALIVE).get();
            task.setTaskType(taskType);
        }

        if (sprintId != null) {
            Sprint sprint = sprintRepository.findByIdAndDelFlg(sprintId, Constants.ALIVE).get();
            task.setSprint(sprint);
        }

        if (statusId != null) {
            Status status = statusRepository.findByIdAndDelFlg(statusId, Constants.ALIVE).get();
            task.setStatus(status);
        }
        if (dto.getLstWorks() != null) {
            List<WorkDto> lstWorkNoIds = dto.getLstWorks().stream().filter(work -> work.getId() == null)
                    .collect(Collectors.toList());
            List<Work> convertDto = lstWorkNoIds.stream().map(Work::of).collect(Collectors.toList());
            for (Work work : convertDto) {
                work.setTask(task);
            }
            List<WorkDto> lstWork = dto.getLstWorks().stream().filter(work -> work.getId() != null)
                    .collect(Collectors.toList());
            List<Work> newWorks = Stream.of(convertDto, lstWork.stream().map(Work::of).collect(Collectors.toList()))
                    .flatMap(Collection::stream)
                    .collect(Collectors.toList());
            task.setLstWorks(newWorks);
        }
        
        if(dto.getTags() != null){
            List<HashTagDto> hashTagNoIds = dto.getTags().stream().filter(tag -> tag.getId() == null).collect(Collectors.toList());
            List<HashTag> convertDto = hashTagNoIds.stream().map(HashTag::of).collect(Collectors.toList());
            List<HashTag> saveHashTags = hashTagRepository.saveAll(convertDto);

            List<HashTagDto> hashTagDto = dto.getTags().stream().filter(tag -> tag.getId() != null).collect(Collectors.toList());
            List<HashTag> newHashTags = Stream.of(saveHashTags, hashTagDto.stream().map(HashTag::of).collect(Collectors.toList()))
                                              .flatMap(Collection::stream)
                                              .collect(Collectors.toList());
            task.setTags(newHashTags);
        } 

        // switch (task.getCalculationMethod()) {
        //     case Constants.CACULATE_METHOD.AUTO_USER_UPDATE:
        //         task.setProgress(dto.getProgress());
        //         break;
        //     case Constants.CACULATE_METHOD.RATIO_SUBTASK_COMPLETE:
        //         List<Task> lstSubTask = taskRepository.findByParrentAndDelFlg(dto.getParrent(), Constants.ALIVE);
        //         Integer totalWeight = 0;
        //         Double totalProgressAndWeight = 0.0;

        //         for (Task subTask : lstSubTask) {
        //             totalWeight += subTask.getWeight();
        //             Double progressAndWeight = subTask.getProgress() * subTask.getWeight();
        //             totalProgressAndWeight += progressAndWeight;
        //         }
        //         Double result = totalProgressAndWeight / totalWeight;
        //         task.setProgress(Math.ceil(result));
        //         break;
        //     case Constants.CACULATE_METHOD.RATIO_WORK_COMPLETE:
        //         Double lstWorksComlete = (double) workRepository.findByTaskIdAndWorkStatusAndDelFlg(dto.getId(),
        //                 Constants.TASK_STATUS.FINISHED, Constants.ALIVE).size();
        //         Double totalWork = (double) workRepository.findByTaskIdAndDelFlg(dto.getId(), Constants.ALIVE).size();
        //         Double resultComplete = (lstWorksComlete / totalWork) * 100;
        //         task.setProgress(Math.ceil(resultComplete));
        //         break;
        //     default:
        //         break;
        // }
        taskRepository.save(task);
        return task;
    }

    public void deleteTask(Long id) throws Exception {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            task.get().setDelFlg(Constants.NON_ALIVE);
            taskRepository.save(task.get());
        } else {
            throw new Exception(String.format("Project with ID = %d not found", id));
        }
    }

    public TaskDto updateStatus(Long taskId, Long statusId) throws Exception {
        Optional<Task> taskOpt = taskRepository.findByIdAndDelFlg(taskId, false);
        Task task = taskOpt.orElseThrow(()-> new Exception("task not exist"));
        if(statusId > -1){
            Optional<Status> statusOpt = statusRepository.findByIdAndDelFlg(statusId, false);
            Status status = statusOpt.orElseThrow(() -> new Exception("Status is not exist"));
            task.setStatus(status);
        }
        else{
            task.setStatus(null);
        }
        task = taskRepository.save(task);
        return TaskDto.of(task);
    }

    public int updateTaskBySprint(Task entity){
        entity.setSprint(null);
        taskRepository.save(entity);
        return 0;
    }
}
