package com.vdc.hrservice.hr.controller.employee;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.vdc.hrservice.common.HttpResponse;
import javax.servlet.ServletRequest;

import com.vdc.hrservice.auth.dto.UserRoleDto;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.dto.department.DepartmentDto;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.hr.dto.employee.EmployeeExtraDto;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto.BasicEmployeeDto;
import com.vdc.hrservice.hr.dto.employee.RequestPw;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto.EmployeeAccountDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.service.auth.UserService;
import com.vdc.hrservice.hr.service.department.interfaceService.DepartmentService;
import com.vdc.hrservice.hr.service.employee.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/api/v1/employee")
public class EmployeeRestController {

  @Autowired
  private EmployeeService employeeService;

  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  private DepartmentService departmentService;

  @Autowired
  private UserService userService;

  @GetMapping("")
  @PreAuthorize("hasRole('ROLE_READ_EMPLOYEE')")
  public ResponseEntity<?> getAllEmployee() {
    return ResponseEntity.ok().body(employeeService.findAllEmployee());
  }

  @GetMapping(value = "/listEmployee")
  // @PreAuthorize("hasRole('ROLE_READ_PRIVILEGE')")
  public ResponseEntity<?> getListEmployee(
      @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
      @RequestParam(name = "size", required = false, defaultValue = "10") Integer size,
      @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort) {

    try {
      Pageable pageable = PageRequest.of(page, size);
      Page<EmployeeDto> lstEmpl = employeeService.getListEmployeeByDelFlg(Constants.DELFLG_ZERO, pageable);
      return new ResponseEntity<>(lstEmpl, HttpStatus.OK);
    } catch (Exception e) {
      // TODO: handle exception
      return new ResponseEntity<String>("Không có dữ liệu", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping(value = "/textSearch")
  public ResponseEntity<?> getListEmpByTS(
      @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
      @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
      @RequestParam(name = "key") String key) {
    try {
      Pageable pageable = PageRequest.of(page, size);
      Page<EmployeeAccountDto> pageE = employeeService.findFilterByKeyTextSearch(key, pageable);
      return ResponseEntity.ok().body(pageE);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
    }
  }

  @GetMapping(value = "/textSearchv2")
  public ResponseEntity<?> getListEmpByTSv2(
      @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
      @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
      @RequestParam(name = "keyTxtSearch") String keyTxtSearch,
      @RequestParam(name = "keyPosition", required = false) Long keyPosition,
      @RequestParam(name = "keyDepartment", required = false) Long keyDepartment,
      @RequestParam(name = "keyGroup", required = false) List<String> keyGroup) {
    try {
      Pageable pageable = PageRequest.of(page, size);
      Page<EmployeeExtraDto> empXtra = employeeService.getLstEmplBySearch(pageable, keyTxtSearch, keyPosition,
          keyDepartment, keyGroup);
      return ResponseEntity.ok().body(empXtra);
    } catch (Exception e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
      return ResponseEntity.badRequest().body(e.getMessage());
    }

  }

  // Tiennm get All Employee
  @GetMapping("/all")
  @PreAuthorize("hasRole('ROLE_READ_EMPLOYEE')")
  public ResponseEntity<?> getAllEmployees() {
    try {
      List<EmployeeDto> lstEmpl = employeeService.findAllEmployee();
      List<Map<String, Object>> lstEmployee = new ArrayList<>();
      for (EmployeeDto employeeDto : lstEmpl) {
        Map<String, Object> response = new HashMap<>();
        DepartmentDto department = departmentService.getDepartmentById(employeeDto.getEmpDepartmentID());
        response.put("id", employeeDto.getId());
        response.put("fullName", employeeDto.getFullName());
        response.put("avatar", employeeDto.getAvatarPic());
        response.put("departmentName", department.getName());
        lstEmployee.add(response);
      }

      return new ResponseEntity<>(lstEmpl, HttpStatus.OK);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @PutMapping("/changePassword/{username}")
  public ResponseEntity<?> requestChangePass(@PathVariable String username, @RequestBody RequestPw data,
      ServletRequest req) {
    try {
      Boolean result = employeeService.requestChangePass(username, data, req);
      if (result) {
        return ResponseEntity.ok().body("Save successfully");
      } else {
        return ResponseEntity.ok().body("Invalid request");
      }
    } catch (Exception e) {
      // TODO: handle exception
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PutMapping("/changePassword2Default/{username}")
  public ResponseEntity<?> requestChangePassword2Default(@PathVariable String username, ServletRequest req) {
    try {
      Boolean result = employeeService.requestChangePassword2Default(username, req);
      if (result) {
        return ResponseEntity.ok().body("Save successfully");
      } else {
        return ResponseEntity.ok().body("Invalid request");
      }
    } catch (Exception e) {
      // TODO: handle exception
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PostMapping(value = "/saveEmployee")
  @PreAuthorize("hasRole('ROLE_CREATE_EMPLOYEE')")
  public ResponseEntity<?> saveEmployeev2(@RequestBody EmployeeDto empModel, ServletRequest request) {
    // Information
    // User loginedUser = (User) ((Authentication) principal).getPrincipal();
    try {
      EmployeeDto empl = employeeService.createNewEmployee(empModel, request);

      return ResponseEntity.status(HttpStatus.CREATED).body(empl);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
  // @PostMapping("/saveUser")
  // public ResponseEntity<?> saveNewUser(ServletRequest request, @RequestBody
  // EmployeeDto empModel) {
  // try {
  // Boolean result = userService.requestCreateUser(empModel, request);
  // if (result) {
  // return ResponseEntity.ok().body("Save successfully");
  // } else {
  // return ResponseEntity.ok().body("Invalid request");
  // }
  // } catch (Exception e) {
  // e.printStackTrace();
  // return ResponseEntity.badRequest().body(e.getMessage());
  // }
  // }

  // @PutMapping(value = "/updateEmployee")
  // @PreAuthorize("hasRole('ROLE_READ_PRIVILEGE')")
  // public ResponseEntity<?> updateEmployee(@Valid @RequestBody EmployeeExtraDto
  // exPart) {
  // try {
  // return new ResponseEntity<>(employeeService.UpdateEmployee(exPart),
  // HttpStatus.CREATED);
  // } catch (Exception e) {
  // //TODO: handle exception
  // return new ResponseEntity<>(e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
  // }
  // }

  @PutMapping("/updateEmployeeV1")
  public ResponseEntity<EmployeeExtraDto> updateEmployeev1(@RequestBody EmployeeExtraDto dto) {
    try {
      EmployeeExtraDto responseEmplXtraDto = employeeService.updateEmployeev1(dto);
      return new ResponseEntity<EmployeeExtraDto>(responseEmplXtraDto, HttpStatus.OK);
    } catch (Exception e) {
      // TODO: handle exception
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @DeleteMapping(value = "/deleteEmp/{id}")
  @PreAuthorize("hasRole('ROLE_REMOVE_EMPLOYEE')")
  public ResponseEntity<?> deleteEmp(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(employeeService.deletEmployee(id), HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      // TODO: handle exception
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/empHrID/{idDepartment}&{idPosition}")
  @PreAuthorize("hasRole('ROLE_READ_EMPLOYEE')")
  public ResponseEntity<Object> getEmpHrID(@PathVariable Long idDepartment, @PathVariable Long idPosition) {

    try {
      List<EmployeeDto> lstEmpl = employeeService.findEmpHrID(idDepartment, idPosition);
      return new ResponseEntity<>(lstEmpl, HttpStatus.OK);
    } catch (Exception e) {
      // TODO: handle exception
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

  }

  @GetMapping("/empHrIDall/{idPosition}")
  @PreAuthorize("hasRole('ROLE_READ_EMPLOYEE')")
  public ResponseEntity<Object> getEmpHrIDall(@PathVariable Long idPosition) {

    try {
      List<EmployeeDto> lstEmpl = employeeService.findEmpHrIDall(idPosition);
      return new ResponseEntity<>(lstEmpl, HttpStatus.OK);
    } catch (Exception e) {
      // TODO: handle exception
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

  }

  @GetMapping("/empID/{id}")
  @PreAuthorize("hasRole('ROLE_READ_EMPLOYEE')")
  public ResponseEntity<Object> getEmpByEmpID(@PathVariable Long id) {

    try {
      EmployeeExtraDto.EmployeeDto empl = employeeService.getById(id);
      return new ResponseEntity<>(empl, HttpStatus.OK);
    } catch (Exception e) {
      // TODO: handle exception
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

  }

  @GetMapping(value = "/search")
  public ResponseEntity<?> findEmployee(@RequestParam(name = "key", required = true) String key) {
    try {
      List<EmployeeAccountDto> employeeDtos = employeeService.findEmployeeWithKey(key);
      return ResponseEntity.ok().body(employeeDtos);
    } catch (Exception e) {
      e.getMessage();
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping(value = "/searchv1")
  public ResponseEntity<?> findEmployeev1(@RequestParam(name = "key", required = true) String key) {
    try {
      List<EmployeeAccountDto> employeeDtos = employeeService.findEmployeeWithKeyv1(key);
      return ResponseEntity.ok().body(employeeDtos);
    } catch (Exception e) {
      e.getMessage();
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/current")
  public ResponseEntity<?> getCurrentEmployee() {
    try {
      EmployeeDto empl = employeeService.getCurrentEmployee();
      return ResponseEntity.ok().body(empl);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
      return ResponseEntity.badRequest().body(e.getCause().getMessage());
    }
  }

  @PutMapping("/permission")
  public ResponseEntity<?> updatePermissionEmployee(ServletRequest request, @RequestBody UserRoleDto userRoleDto) {
    try {
      Boolean result = userService.requestCreateUser(userRoleDto, request);
      if (result) {
        return ResponseEntity.ok().body("Save successfully");
      } else {
        return ResponseEntity.ok().body("Invalid request");
      }
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PostMapping("/import-excel")
  public ResponseEntity<?> importEmployeeExcelFile(@RequestParam("file") MultipartFile files) throws IOException {
    try {
      return new ResponseEntity<>(employeeService.importEmployeeExcel(files), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/department/{id}")
  public ResponseEntity<?> getEmployeeByDepartment(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(employeeService.getEmployeesByDepartment(id), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/department/updateEmployee/{departmentId}")
  public ResponseEntity<?> updateEmployeeForDepartment(@PathVariable Long departmentId,
      @RequestBody List<BasicEmployeeDto> employees) {
    try {
      return new ResponseEntity<>(
          employeeService.setDepartmentForEmployee(employees, departmentId), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/department/deleteEmployee/{employeeId}")
  public ResponseEntity<?> deleteEmployeeForDepartment(@PathVariable Long employeeId) {
    try {
      return new ResponseEntity<>(employeeService.deleteDepartmentForEmployee(employeeId), HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping(path = "/{id}")
  public ResponseEntity<?> getEmployeeWithRole(@PathVariable Long id) {
    try {
      EmployeeAccountDto accountDto = employeeService.getEmployeeWithRole(id);
      return ResponseEntity.ok().body(new HttpResponse<>(accountDto));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
    }
  }
}
