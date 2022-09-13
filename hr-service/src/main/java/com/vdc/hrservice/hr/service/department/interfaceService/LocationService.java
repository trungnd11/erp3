package com.vdc.hrservice.hr.service.department.interfaceService;

import java.util.List;

import com.vdc.hrservice.hr.dto.department.DepartmentLocationDto;

public interface LocationService {
  public abstract List<DepartmentLocationDto> getLocations();
  public abstract List<DepartmentLocationDto> getLocationsByName(String name);
  public abstract DepartmentLocationDto createLocation(DepartmentLocationDto locationDto);
  public abstract DepartmentLocationDto updateLocation(DepartmentLocationDto locationDto);
  public abstract int deleteLocation(Long id);
}
