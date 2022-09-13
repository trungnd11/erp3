package com.vdc.hrservice.office.service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.office.domain.AttachFile;
import com.vdc.hrservice.office.domain.HashTag;
import com.vdc.hrservice.office.domain.Project;
import com.vdc.hrservice.office.domain.Sprint;
import com.vdc.hrservice.office.domain.Status;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.dto.HashTagDto;
import com.vdc.hrservice.office.dto.ProjectDto;
import com.vdc.hrservice.office.dto.StatusDto;
import com.vdc.hrservice.office.dto.ProjectDto.BasicProjectDto;
import com.vdc.hrservice.office.dto.StatusDto.BasicStatusDto;
import com.vdc.hrservice.office.repository.HashTagRepository;
import com.vdc.hrservice.office.repository.ProjectRepository;
import com.vdc.hrservice.office.repository.StatusRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private HashTagRepository hashTagRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private EntityManager entityManager;

    public List<ProjectDto> findAllProject(Long employeeId) {
        List<Project> lstProject = projectRepository.findAllProjectByEmployeeId(employeeId);
        return lstProject.stream().map(project -> {
            ProjectDto dto = ProjectDto.of(project);
            int totalTask = getTotalTasks(project.getTasks());
            int totalTaskComplete = getTotalTasksComplete(project.getTasks());
            dto.setTotalTask(totalTask);
            dto.setTotalTaskComplete(totalTaskComplete);

            return dto;
        }).collect(Collectors.toList());
    }

    public Page<ProjectDto> getListProject(Boolean delFlg, Pageable page) {
        Page<Project> lstProject = projectRepository.findByDelFlg(delFlg, page);
        return lstProject.map(project -> {
            ProjectDto dto = ProjectDto.of(project);
            int totalTask = getTotalTasks(project.getTasks());
            int totalTaskComplete = getTotalTasksComplete(project.getTasks());
            dto.setTotalTask(totalTask);
            dto.setTotalTaskComplete(totalTaskComplete);

            return dto;
        });
    }

    public Page<ProjectDto> findProjectByProjectName(String projectName, Boolean delFlg, Pageable page) {
        Page<Project> lstProject = projectRepository.findProjectByProjectNameAndDelFlg(projectName, delFlg, page);
        return lstProject.map(project -> {
            ProjectDto dto = ProjectDto.of(project);
            int totalTask = getTotalTasks(project.getTasks());
            int totalTaskComplete = getTotalTasksComplete(project.getTasks());
            dto.setTotalTask(totalTask);
            dto.setTotalTaskComplete(totalTaskComplete);

            return dto;
        });
    }

    public Page<ProjectDto> findProjectByDeadLine(String day, Boolean delFlg, Pageable page) {
        ZonedDateTime deadLine = DateUtils.convertShort2Zone(day);
        Page<Project> lstProject = projectRepository.findByDeadLineAndDelFlg(deadLine, delFlg, page);
        return lstProject.map(project -> {
            ProjectDto dto = ProjectDto.of(project);
            int totalTask = getTotalTasks(project.getTasks());
            int totalTaskComplete = getTotalTasksComplete(project.getTasks());
            dto.setTotalTask(totalTask);
            dto.setTotalTaskComplete(totalTaskComplete);

            return dto;
        });
    }

    public Page<ProjectDto> findProjectByDeadLine(ZonedDateTime deadLine, Boolean delFlg, Pageable page) {
        Page<Project> lstProject = projectRepository.findProjectByDeadLineAndDelFlg(deadLine, delFlg, page);
        return lstProject.map(project -> {
            ProjectDto dto = ProjectDto.of(project);
            int totalTask = getTotalTasks(project.getTasks());
            int totalTaskComplete = getTotalTasksComplete(project.getTasks());
            dto.setTotalTask(totalTask);
            dto.setTotalTaskComplete(totalTaskComplete);

            return dto;
        });
    }

    public Page<ProjectDto> findProjectByProjectNameAndDeadLine(String projectName, String day, Boolean delFlg,
            Pageable page) {
        ZonedDateTime startDay = DateUtils.convertShort2Zone(day);
        Page<Project> lstProject = projectRepository.findProjectByProjectNameAndDeadLineAndDelFlg(projectName, startDay,
                delFlg, page);
        return lstProject.map(project -> {
            ProjectDto dto = ProjectDto.of(project);
            int totalTask = getTotalTasks(project.getTasks());
            int totalTaskComplete = getTotalTasksComplete(project.getTasks());
            dto.setTotalTask(totalTask);
            dto.setTotalTaskComplete(totalTaskComplete);

            return dto;
        });
    }

    public Page<ProjectDto> findProjectByDeadLineBetween(String start, String end, Boolean delFlg, Pageable page) {
        ZonedDateTime startDay = DateUtils.convertShort2Zone(start);
        ZonedDateTime endDay = DateUtils.convertShort2Zone(end);
        Page<Project> projects = projectRepository.findProjectByDeadLineBetWeen(startDay, endDay, delFlg, page);
        return projects.map(project -> {
            ProjectDto dto = ProjectDto.of(project);
            int totalTask = getTotalTasks(project.getTasks());
            int totalTaskComplete = getTotalTasksComplete(project.getTasks());
            dto.setTotalTask(totalTask);
            dto.setTotalTaskComplete(totalTaskComplete);

            return dto;
        });
    }

    public List<Project> findProjectByEmployeeIdAndPrivacy(Long employeeId, String privacy, Boolean delFlg) {
        List<Project> pageProjects = projectRepository.findProjectByEmployeeIdAndPrivacyAndDelFlg(employeeId, privacy,
                delFlg);
        return pageProjects;
    }

    public List<Project> findProjectByPrivacy(String privacy, Boolean delFlg) {
        List<Project> pageProjects = projectRepository.findByPrivacyAndDelFlg(privacy, delFlg);
        return pageProjects;
    }

    public ProjectDto findProjectById(Long id, Boolean delFlg) {
        Project project = projectRepository.findByIdAndDelFlg(id, delFlg)
                .orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        ProjectDto dto = ProjectDto.of(project);
        int totalTask = getTotalTasks(project.getTasks());
        int totalTaskComplete = getTotalTasksComplete(project.getTasks());
        dto.setTotalTask(totalTask);
        dto.setTotalTaskComplete(totalTaskComplete);
        return dto;
    }

    public Project createProject(ProjectDto dto) {
        Project project = new Project();
        project.setProjectName(dto.getProjectName());
        project.setDescription(dto.getDescription());
        if (dto.getPrivacy() == null) {
            project.setPrivacy(Constants.PRIVACY.PUBLIC);
        } else {
            project.setPrivacy(dto.getPrivacy());
        }

        project.setYear(DateUtils.getStrCurrentYear());

        project.setDeadLine(DateUtils.convertShort2Zone(dto.getDeadLine()));
        // project.setProjectStatus(Constants.PROJECT_STATUS.INPROGRESS);
        project.setLstMember(dto.getLstMember().stream().map(Employee::convert).collect(Collectors.toList()));

        if (dto.getThumnailImage() != null) {
            project.setThumnailImage(AttachFile.of(dto.getThumnailImage()));
        }

        if (dto.getTasks() != null) {
            project.setTasks(dto.getTasks().stream().map(Task::of).collect(Collectors.toList()));
        }

        if (dto.getSprints() != null) {
            project.setSprints(dto.getSprints().stream().map(Sprint::of).collect(Collectors.toList()));
        }

        project.setTeamLead(Employee.convert(dto.getTeamLead()));

        if (dto.getTags() != null) {
            List<HashTagDto> hashTagNoIds = dto.getTags().stream().filter(tag -> tag.getId() == null)
                    .collect(Collectors.toList());
            List<HashTag> convertDto = hashTagNoIds.stream().map(HashTag::of).collect(Collectors.toList());
            List<HashTag> saveHashTags = hashTagRepository.saveAll(convertDto);

            List<HashTagDto> hashTagDto = dto.getTags().stream().filter(tag -> tag.getId() != null)
                    .collect(Collectors.toList());
            List<HashTag> newHashTags = Stream
                    .of(saveHashTags, hashTagDto.stream().map(HashTag::of).collect(Collectors.toList()))
                    .flatMap(Collection::stream)
                    .collect(Collectors.toList());
            project.setTags(newHashTags);
        }

        if (dto.getStatus() != null) {
            List<Status> lstStatus = dto.getStatus().stream().map(Status::convert).collect(Collectors.toList());
            for (Status status : lstStatus) {
                status.setProject(project);
            }
            project.setStatus(lstStatus);
        }
        project.setDelFlg(Constants.ALIVE);
        projectRepository.save(project);

        return project;
    }

    @Transactional
    public Project updateProject(ProjectDto dto) {
        Project project = projectRepository.findByIdAndDelFlg(dto.getId(), Constants.ALIVE).get();
        project.setProjectName(dto.getProjectName());
        project.setDescription(dto.getDescription());
        project.setPrivacy(dto.getPrivacy());
        project.setDeadLine(DateUtils.convertShort2Zone(dto.getDeadLine()));
        project.setTeamLead(Employee.convert(dto.getTeamLead()));
        project.setLstMember(dto.getLstMember().stream().map(Employee::convert).collect(Collectors.toList()));
        if (dto.getThumnailImage() != null) {
            project.setThumnailImage(AttachFile.of(dto.getThumnailImage()));
        }
        if (dto.getStatus() != null) {
            List<BasicStatusDto> statusNoIds = dto.getStatus().stream().filter(status -> status.getId() == null)
                    .collect(Collectors.toList());
            List<Status> convertDto = statusNoIds.stream().map(Status::convert).collect(Collectors.toList());
            // List<Status> saveStatus = statusRepository.saveAll(convertDto);
            for (Status status : convertDto) {
                status.setProject(project);
            }
            List<BasicStatusDto> lstStatus = dto.getStatus().stream().filter(status -> status.getId() != null)
                    .collect(Collectors.toList());
            List<Status> newStatus = Stream
                    .of(convertDto, lstStatus.stream().map(Status::convert).collect(Collectors.toList()))
                    .flatMap(Collection::stream)
                    .collect(Collectors.toList());
            project.setStatus(newStatus);
        }

        if (dto.getTags() != null) {
            List<HashTagDto> hashTagNoIds = dto.getTags().stream().filter(tag -> tag.getId() == null)
                    .collect(Collectors.toList());
            List<HashTag> convertDto = hashTagNoIds.stream().map(HashTag::of).collect(Collectors.toList());
            List<HashTag> saveHashTags = hashTagRepository.saveAll(convertDto);

            List<HashTagDto> hashTagDto = dto.getTags().stream().filter(tag -> tag.getId() != null)
                    .collect(Collectors.toList());
            List<HashTag> newHashTags = Stream
                    .of(saveHashTags, hashTagDto.stream().map(HashTag::of).collect(Collectors.toList()))
                    .flatMap(Collection::stream)
                    .collect(Collectors.toList());
            project.setTags(newHashTags);
        }
        if (dto.getSprints() != null) {
            project.setSprints(dto.getSprints().stream().map(Sprint::of).collect(Collectors.toList()));
        }
        projectRepository.save(project);
        return project;
    }

    public Project deleteProject(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) {
            Project updateProject = project.get();
            updateProject.setDelFlg(Constants.NON_ALIVE);
            projectRepository.save(updateProject);

            return updateProject;
        } else {
            return null;
        }
    }

    public int getTotalTasks(List<Task> tasks) {
        return tasks.size();
    }

    public int getTotalTasksComplete(List<Task> tasks) {
        if (tasks.size() > 0) {
            List<Task> newTasks = new ArrayList<Task>();
            for (Task task : tasks) {
                if (task.getFinishDay() != null) {
                    newTasks.add(task);
                }
            }
            return newTasks.size();
        }
        return 0;
    }

    public Page<BasicProjectDto> getProjectUser(Long userId, String name, String startDay, String endDay, Pageable page) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT p.*");
        sql.append(" FROM");
        sql.append(" office_project as p");
        sql.append(" JOIN");
        sql.append(" office_project_employee as pe");
        sql.append(" ON");
        sql.append(" p.id = pe.project_id");
        boolean hasWhere = false;
        // sql.append(" ");
        if(userId != null) {
            sql.append(" WHERE (pe.employee_id=:userId OR p.employee_id=:userId)");
            hasWhere = true;
        }
        if(name != null) {
            if(hasWhere) {
                sql.append(" AND p.project_name like UPPER(CONCAT('%',:name,'%'))");
            }
            else {
                sql.append(" WHERE p.project_name like UPPER(CONCAT('%',:name,'%'))");
                hasWhere = true;
            }
        }
        if(startDay != null) {
            if(hasWhere) {
                sql.append(" AND :startDay <= p.dead_line");
            }
            else {
                sql.append(" WHERE :startDay <= p.dead_line");
                hasWhere = true;
            }
        }
        if(endDay != null) {
            if(hasWhere) {
                sql.append(" AND p.dead_line <= :endDay");
            }
            else {
                sql.append(" WHERE p.dead_line <= :endDay");
            }
        }
        sql.append(" GROUP BY p.id");
        try {
            Query query = entityManager.createNativeQuery(sql.toString(), Project.class);
            if(userId != null) {
                query.setParameter("userId", userId);
            }
            if(name != null) {
                query.setParameter("name", name);
            }
            if(startDay != null) {
                query.setParameter("startDay", startDay);
            }
            if(endDay != null) {
                query.setParameter("endDay", endDay);
            }

            List<Project> listProject = query.getResultList();
            int start = Math.min((int) page.getOffset(), listProject.size());
            int end = Math.min((start + page.getPageSize()), listProject.size());
            Page<Project> pageE = new PageImpl<>(listProject.subList(start, end), page, listProject.size());
            System.out.println(pageE);
            return pageE.map(BasicProjectDto::of);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
    }
}
