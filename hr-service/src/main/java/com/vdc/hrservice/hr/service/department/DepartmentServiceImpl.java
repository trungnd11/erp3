package com.vdc.hrservice.hr.service.department;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.hr.domain.department.Department;
import com.vdc.hrservice.hr.domain.department.DepartmentLocation;
import com.vdc.hrservice.hr.dto.department.DepartmentDto;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.hr.repository.department.DepartmentRepository;
import com.vdc.hrservice.hr.repository.department.LocationRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.service.department.interfaceService.DepartmentService;
import com.vdc.hrservice.hr.service.employee.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentServiceImpl implements DepartmentService {

  @Autowired
  DepartmentRepository partRepo;

  @Autowired
  LocationRepository locationRepo;

  @Autowired
  EmployeeRepository employeeRepo;

  @Autowired
  EmployeeService employeeService;

  @Override
  public List<DepartmentDto> getDepartments() {
    List<Department> departments = partRepo.listDepartment();
    List<DepartmentDto> departmentsDto = new ArrayList<>();
    for (Department department : departments) {
      DepartmentDto departmentDto = convertDto(department);
      departmentsDto.add(departmentDto);
    }
    return departmentsDto;
  }

  @Override
  public DepartmentDto createDepartment(DepartmentDto part) {
    Department newPart = new Department();
    List<DepartmentLocation> locations = new ArrayList<>();
    List<Long> locationsId = part.getLocationsId();
    for (Long locationId : locationsId) {
      DepartmentLocation location = locationRepo.getById(locationId);
      locations.add(location);
    }
    newPart.setCode(part.getCode());
    newPart.setName(part.getName());
    newPart.setLocations(locations);
    newPart.setBudget(part.getBudget());
    newPart.setManager(part.getManagerCode());
    newPart.setParent(part.getParentCode());
    newPart.setPosition(part.getPosition());
    newPart.setDescriptions(part.getDescriptions());
    newPart.setLevel(part.getLevel());
    partRepo.save(newPart);
    return part;
  }

  @Override
  public DepartmentDto updateDepartment(DepartmentDto part) {
    Department updatePart = partRepo.getById(part.getId());
    List<DepartmentLocation> locations = new ArrayList<>();
    List<Long> locationsId = part.getLocationsId();
    for (Long locationId : locationsId) {
      DepartmentLocation location = locationRepo.getById(locationId);
      locations.add(location);
    }
    List<DepartmentLocation> uniqueLocation = locations.stream().distinct().collect(Collectors.toList());
    updatePart.setParent(part.getParentCode());
    updatePart.setManager(part.getManagerCode());
    updatePart.setCode(part.getCode());
    updatePart.setName(part.getName());
    updatePart.setLocations(uniqueLocation);
    updatePart.setBudget(part.getBudget());
    updatePart.setDescriptions(part.getDescriptions());
    partRepo.save(updatePart);
    return part;
  }

  @Override
  public int deleteDepartment(Long departmentId) {
    Department deletePart = partRepo.getById(departmentId);
    deletePart.setDelFlg(true);
    partRepo.save(deletePart);
    return 1;
  }

  @Override
  public int deleteLocationByDepartment(DepartmentDto departmentDto) {
    Department deletePart = partRepo.getById(departmentDto.getId());
    List<DepartmentLocation> locations = deletePart.getLocations().stream()
        .filter(item -> item.getId() != departmentDto.getLocation()).collect(Collectors.toList());
    deletePart.setLocations(locations);
    partRepo.save(deletePart);
    return 1;
  }

  @Override
  public int updatePosition(DepartmentDto partDTO) {
    Department updatePart = partRepo.findById(partDTO.getId()).get();
    updatePart.setParent(partDTO.getParentCode());
    updatePart.setPosition(partDTO.getPosition());
    partRepo.save(updatePart);
    return 1;
  }

  @Override
  public DepartmentDto getCurrentDepartment() throws Exception {
    EmployeeDto currentEmpl = employeeService.getCurrentEmployee();
    Department department = partRepo.findById(currentEmpl.getEmpDepartmentID())
        .orElseThrow(() -> new IllegalArgumentException("can not found id:" + currentEmpl.getEmpDepartmentID()));
    DepartmentDto dto = convertDto(department);
    return dto;
  }

  @Override
  public DepartmentDto updateManager(DepartmentDto part) {
    Department partUpdate = partRepo.getById(part.getId());
    partUpdate.setManager(part.getManagerCode());
    partRepo.save(partUpdate);
    DepartmentDto partDto = convertDto(partUpdate);
    return partDto;
  }

  @Override
  public DepartmentDto getDepartmentById(Long departmentId) {
    Department department = partRepo.findById(departmentId).get();
    DepartmentDto dto = convertDto(department);
    return dto;
  }

  // tiennm update convertDto
  public DepartmentDto convertDto(Department department) {
    DepartmentDto departmentDto = new DepartmentDto();
    departmentDto.setId(department.getId());
    departmentDto.setCode(department.getCode());
    departmentDto.setName(department.getName());
    departmentDto.setBudget(department.getBudget());
    departmentDto.setLocations(department.getLocations());
    departmentDto.setPosition(department.getPosition());
    departmentDto.setDescriptions(department.getDescriptions());
    departmentDto.setLevel(department.getLevel());
    departmentDto.setParentCode(department.getParent());
    departmentDto.setParent(DepartmentDto.of(partRepo.getById(department.getParent())));
    departmentDto.setManagerCode(department.getManager());
    departmentDto.setManager(EmployeeDto.of(employeeRepo.getById(department.getManager())));
    departmentDto.setEmployeeNumber(employeeRepo.getEmployeeByDepartment(department.getId()).size());
    return departmentDto;
  }

  @Override
  public List<DepartmentDto> findDepartmentByKey(String key) {
    List<Department> departmentDtos = partRepo.findDistinctByNameContainingAndLocations_locationContaining(key,
        key);
    return departmentDtos.stream().map(DepartmentDto::of).collect(Collectors.toList());
  }

  @Override
  public List<DepartmentDto> findDepartmentByName(String name) {
    List<Department> departments = partRepo.findByDepartmentName(name);
    return departments.stream().map(DepartmentDto::of).collect(Collectors.toList());
  }

}
