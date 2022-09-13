package com.vdc.hrservice.hr.service.department;

import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.department.DepartmentLocation;
import com.vdc.hrservice.hr.dto.department.DepartmentLocationDto;
import com.vdc.hrservice.hr.repository.department.LocationRepository;
import com.vdc.hrservice.hr.service.department.interfaceService.LocationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationServiceImpl implements LocationService {

  @Autowired
  LocationRepository locationRepo;

  @Override
  public DepartmentLocationDto createLocation(DepartmentLocationDto locationDto) {
    DepartmentLocation location = new DepartmentLocation();
    location.setCode(locationDto.getCode());
    location.setLocation(locationDto.getLocation());
    locationRepo.save(location);
    return locationDto;
  }

  @Override
  public List<DepartmentLocationDto> getLocationsByName(String name) {
    List<DepartmentLocation> locations = locationRepo.findByLocationName(name);
    return locations.stream().map(DepartmentLocationDto::of).collect(Collectors.toList());
  }

  @Override
  public int deleteLocation(Long id) {
    DepartmentLocation location = locationRepo.getById(id);
    location.setDelFlg(Constants.DELFLG_ONE);
    locationRepo.save(location);
    return 1;
  }

  @Override
  public List<DepartmentLocationDto> getLocations() {
    List<DepartmentLocation> locations = locationRepo.findByDelFlg(Constants.DELFLG_ZERO);
    return locations.stream().map(DepartmentLocationDto::of).collect(Collectors.toList());
  }

  @Override
  public DepartmentLocationDto updateLocation(DepartmentLocationDto locationDto) {
    DepartmentLocation location = locationRepo.getById(locationDto.getId());
    location.setCode(locationDto.getCode());
    location.setLocation(locationDto.getLocation());
    locationRepo.save(location);
    return locationDto;
  }

}
