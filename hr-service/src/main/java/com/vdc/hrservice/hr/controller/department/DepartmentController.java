package com.vdc.hrservice.hr.controller.department;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.vdc.hrservice.common.HttpResponse;
import com.vdc.hrservice.hr.domain.department.Department;
import com.vdc.hrservice.hr.dto.department.DepartmentDto;
import com.vdc.hrservice.hr.repository.department.DepartmentRepository;
import com.vdc.hrservice.hr.service.department.interfaceService.DepartmentService;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/v1/department")
public class DepartmentController {

  @Autowired
  private DepartmentService partService;

  @Autowired
  private DepartmentRepository partRepo;

  @GetMapping("")
  public ResponseEntity<?> getDepartments() {
    try {
      return new ResponseEntity<>(partService.getDepartments(), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Tiennm update getDepartmentById
  @GetMapping("/{departmentId}")
  public ResponseEntity<?> getDepartmentByDepartmentId(@PathVariable("departmentId") Long departmentId) {
    try {
      DepartmentDto responseDto = partService.getDepartmentById(departmentId);
      return new ResponseEntity<>(responseDto, HttpStatus.OK);
    } catch (Exception e) {
      // TODO: handle exception
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("/current")
  public ResponseEntity<?> getDepartmentCurrent() {
    try {
      DepartmentDto responseDepartment = partService.getCurrentDepartment();
      return ResponseEntity.ok().body(responseDepartment);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
      return ResponseEntity.badRequest().body(e.getCause().getMessage());
    }
  }

  @PostMapping("")
  public ResponseEntity<?> createDePartment(@Valid @RequestBody DepartmentDto newPart) {
    try {
      return new ResponseEntity<>(partService.createDepartment(newPart), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("")
  public ResponseEntity<?> updateDePartment(@Valid @RequestBody DepartmentDto newPart) {
    try {
      return new ResponseEntity<>(partService.updateDepartment(newPart), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteDePartment(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(partService.deleteDepartment(id), HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/updatePosition")
  public ResponseEntity<?> updatePosition(@RequestBody DepartmentDto part) {
    try {
      return ResponseEntity.ok(partService.updatePosition(part));
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/updateManager")
  public ResponseEntity<?> updateManager(@RequestBody DepartmentDto part) {
    try {
      return ResponseEntity.ok(partService.updateManager(part));
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/deletelocation")
  public ResponseEntity<?> deleteLocationByDepartmentId(@RequestBody DepartmentDto departmentDto) {
    try {
      return new ResponseEntity<>(partService.deleteLocationByDepartment(departmentDto), HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/searchName")
  public ResponseEntity<?> findDepartmentByName(@RequestParam("name") String name) {
    try {
      List<DepartmentDto> departmentDtos = partService.findDepartmentByName(name);
      return ResponseEntity.ok().body(new HttpResponse<>(departmentDtos));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping(path = "/search")
  public ResponseEntity<?> findDepartmentByKey(@RequestParam String key) {
    try {
      List<DepartmentDto> departmentDtos = partService.findDepartmentByKey(key);
      return ResponseEntity.ok().body(new HttpResponse<>(departmentDtos));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PostMapping("/import-excel")
  public ResponseEntity<?> importDepartmentExcelFile(@RequestParam("file") MultipartFile files) throws IOException {
    try {
      List<Department> departments = new ArrayList<>();

    XSSFWorkbook workbook = new XSSFWorkbook(files.getInputStream());
    XSSFSheet worksheet = workbook.getSheetAt(0);
    workbook.close();

    for (int index = 1; index < worksheet.getPhysicalNumberOfRows(); index++) {
      Department part = new Department();
      XSSFRow row = worksheet.getRow(index);

      part.setName(row.getCell(0).getStringCellValue());
      part.setCode(row.getCell(1).getStringCellValue());
      Long parentCode = (long) row.getCell(2).getNumericCellValue();
      Long mamagerCode = (long) row.getCell(3).getNumericCellValue();
      part.setParent(parentCode);
      part.setManager(mamagerCode);

      departments.add(part);
      partRepo.save(part);
    }
      return new ResponseEntity<>( departments.size(), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
