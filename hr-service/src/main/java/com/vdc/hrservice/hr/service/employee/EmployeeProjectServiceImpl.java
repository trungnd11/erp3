package com.vdc.hrservice.hr.service.employee;

import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.EmployeeProjectExperience;
import com.vdc.hrservice.hr.dto.employee.EmployeeProjectExperienceDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeProjectRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeProjectServiceImpl implements EmployeeProjectService {

  @Autowired
  EmployeeProjectRepository projectRepo;

  @Autowired
  EmployeeRepository employeeRepo;

  @Override
  public EmployeeProjectExperienceDto createEmployeeProjetc(EmployeeProjectExperienceDto projectDto) {
    EmployeeProjectExperience project = new EmployeeProjectExperience();
    project.setName(projectDto.getName());
    project.setDescription(projectDto.getDescription());
    project.setStartYear(projectDto.getStartYear());
    project.setProjectTime(projectDto.getProjectTime());
    project.setNumberPeople(projectDto.getNumberPeople());
    project.setPosition(projectDto.getPosition());
    project.setJobDescription(projectDto.getJobDescription());
    project.setTechnologyUsed(projectDto.getTechnologyUsed());
    project.setImplementationCompany(projectDto.getImplementationCompany());
    project.setCustomer(projectDto.getCustomer());
    project.setEmployee(employeeRepo.getById(projectDto.getEmployeeId()));
    projectRepo.save(project);
    return projectDto;
  }

  @Override
  public int deleteEmployeeProjetcs(Long id) {
    EmployeeProjectExperience project = projectRepo.getById(id);
    project.setDelFlg(Constants.DELFLG_ONE);
    projectRepo.save(project);
    return 1;
  }

  @Override 
  public List<EmployeeProjectExperienceDto> getEmployeeProjetcs() {
    List<EmployeeProjectExperience> projects = projectRepo.findByDelFlg(Constants.DELFLG_ZERO);
    return projects.stream().map(EmployeeProjectExperienceDto::of).collect(Collectors.toList());
  }

  @Override
  public List<EmployeeProjectExperienceDto> getEmployeeProjetcsById(Long id) {
    List<EmployeeProjectExperience> projects = projectRepo.findByEmployeeIdAndDelFlg(id, Constants.DELFLG_ZERO);
    return projects.stream().map(EmployeeProjectExperienceDto::of).collect(Collectors.toList());
  }

  @Override
  public EmployeeProjectExperienceDto updateEmployeeProjetc(EmployeeProjectExperienceDto projectDto) {
    EmployeeProjectExperience project = projectRepo.getById(projectDto.getId());
    project.setName(projectDto.getName());
    project.setDescription(projectDto.getDescription());
    project.setStartYear(projectDto.getStartYear());
    project.setProjectTime(projectDto.getProjectTime());
    project.setNumberPeople(projectDto.getNumberPeople());
    project.setPosition(projectDto.getPosition());
    project.setJobDescription(projectDto.getJobDescription());
    project.setTechnologyUsed(projectDto.getTechnologyUsed());
    project.setImplementationCompany(projectDto.getImplementationCompany());
    project.setCustomer(projectDto.getCustomer());
    projectRepo.save(project);
    return projectDto;
  }
  
}
