package com.vdc.hrservice.hr.controller.department;

import javax.validation.Valid;

import com.vdc.hrservice.hr.domain.department.DepartmentLocation;
import com.vdc.hrservice.hr.dto.department.DepartmentLocationDto;
import com.vdc.hrservice.hr.repository.department.LocationRepository;
import com.vdc.hrservice.hr.service.department.interfaceService.LocationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/location")
public class LocationController {

  @Autowired
  LocationService locationService;

  @Autowired
  LocationRepository locationRepo;

  @GetMapping("")
  public ResponseEntity<?> getLocations() {
    try {
      return new ResponseEntity<>(locationService.getLocations(), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/findName")
  public ResponseEntity<?> getLocationsByName(@RequestParam("name") String name) {
    try {
      return new ResponseEntity<>(locationService.getLocationsByName(name), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  @PostMapping("")
  public ResponseEntity<?> createLocation(@Valid @RequestBody DepartmentLocationDto locationDto) {
    DepartmentLocation location = locationRepo.findByCodeAndLocation(locationDto.getCode(),
        locationDto.getLocation());
    if (location == null) {
      try {
        return new ResponseEntity<>(locationService.createLocation(locationDto), HttpStatus.CREATED);
      } catch (Exception e) {
        return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      return new ResponseEntity<>("Code or Name already exist", HttpStatus.BAD_REQUEST);
    }
  }

  @PutMapping("")
  public ResponseEntity<?> updateLocation(@Valid @RequestBody DepartmentLocationDto locationDto) {
    try {
      return new ResponseEntity<>(locationService.createLocation(locationDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> updateLocation(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(locationService.deleteLocation(id), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
