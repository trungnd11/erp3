package com.vdc.hrservice.hr.repository.department;

import java.util.List;

import com.vdc.hrservice.hr.domain.department.DepartmentLocation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LocationRepository extends JpaRepository<DepartmentLocation, Long> {

  // list locations by delFlg
  List<DepartmentLocation> findByDelFlg(Boolean delFlg);

  DepartmentLocation findByCodeAndLocation(String code, String name);
  
  @Query(value = "SELECT * FROM locations WHERE location like %:name%", nativeQuery = true)
  List<DepartmentLocation> findByLocationName(@Param("name") String name);
  
}
