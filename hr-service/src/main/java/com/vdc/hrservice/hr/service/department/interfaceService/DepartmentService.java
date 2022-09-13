package com.vdc.hrservice.hr.service.department.interfaceService;

import java.io.IOException;
import java.util.List;
import com.vdc.hrservice.hr.dto.department.DepartmentDto;

import org.springframework.web.multipart.MultipartFile;

public interface DepartmentService {
  public abstract List<DepartmentDto> getDepartments();

  public abstract DepartmentDto getDepartmentById(Long departmentId);

  public abstract DepartmentDto createDepartment(DepartmentDto part);

  public abstract DepartmentDto updateDepartment(DepartmentDto part);

  public abstract int deleteDepartment(Long departmentId);

  public abstract int deleteLocationByDepartment(DepartmentDto part);

  public abstract int updatePosition(DepartmentDto part);

  public abstract DepartmentDto getCurrentDepartment() throws Exception;

  public abstract DepartmentDto updateManager(DepartmentDto part);

  public List<DepartmentDto> findDepartmentByName(String name);

  public List<DepartmentDto> findDepartmentByKey(String key);
}
