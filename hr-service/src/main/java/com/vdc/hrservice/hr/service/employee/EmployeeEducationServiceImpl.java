package com.vdc.hrservice.hr.service.employee;

import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeEducation;
import com.vdc.hrservice.hr.dto.employee.EmployeeEducationDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeEducationRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeEducationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeEducationServiceImpl implements EmployeeEducationService {

  @Autowired
  EmployeeEducationRepository educatioRepo;

  @Autowired
  EmployeeRepository emplRepo;

  @Override
  public EmployeeEducationDto createEmployeeEducation(EmployeeEducationDto education) {
    Employee employee = emplRepo.getById(education.getEmployeeId());
    EmployeeEducation newEducation = new EmployeeEducation();
    newEducation.setEmployee(employee);
    newEducation.setDegree(education.getDegree());
    newEducation.setCourse(education.getCourse());
    newEducation.setSchoolName(education.getSchoolName());
    newEducation.setFaculty(education.getFaculty());
    newEducation.setSpecialized(education.getSpecialized());
    newEducation.setClassification(education.getClassification());
    educatioRepo.save(newEducation);
    return education;
  }

  @Override
  public int deleteEmployeeEducation(Long id) {
    EmployeeEducation education = educatioRepo.getById(id);
    education.setDelFlg(Constants.DELFLG_ONE);
    educatioRepo.save(education);
    return 1;
  }

  @Override
  public List<EmployeeEducationDto> getEmployeeEducations() {
    List<EmployeeEducation> educations = educatioRepo.findByDelFlg(Constants.DELFLG_ZERO);
    List<EmployeeEducationDto> educationsDto = educations.stream().map(EmployeeEducationDto::of)
        .collect(Collectors.toList());
    return educationsDto;
  }

  @Override
  public List<EmployeeEducationDto> getEmployeeEducationsById(Long id) {
    List<EmployeeEducation> educations = educatioRepo.findByEmployeeIdAndDelFlg(id, Constants.DELFLG_ZERO);
    List<EmployeeEducationDto> educationsDto = educations.stream().map(EmployeeEducationDto::of)
        .collect(Collectors.toList());
    return educationsDto;
  }

  @Override
  public EmployeeEducationDto updateEmployeeEducation(EmployeeEducationDto education) {
    EmployeeEducation updateEducation = educatioRepo.getById(education.getId());
    updateEducation.setDegree(education.getDegree());
    updateEducation.setCourse(education.getCourse());
    updateEducation.setSchoolName(education.getSchoolName());
    updateEducation.setFaculty(education.getFaculty());
    updateEducation.setSpecialized(education.getSpecialized());
    updateEducation.setClassification(education.getClassification());
    educatioRepo.save(updateEducation);
    return education;
  }
}
