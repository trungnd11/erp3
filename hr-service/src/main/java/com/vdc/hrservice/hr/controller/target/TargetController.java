package com.vdc.hrservice.hr.controller.target;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.target.Target;
import com.vdc.hrservice.hr.dto.department.DepartmentDto;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.hr.dto.targetDto.TargetDto;
import com.vdc.hrservice.hr.service.department.interfaceService.DepartmentService;
import com.vdc.hrservice.hr.service.employee.EmployeeService;
import com.vdc.hrservice.hr.service.target.TargetService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/target")
public class TargetController {
    @Autowired
    private TargetService targetService;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getTargetById(@PathVariable("id") String id){
        try {
            
            TargetDto responseDto = targetService.findTargetById(Long.parseLong(id), Constants.ALIVE);
            Map<String, Object> response = new HashMap<>();
            response.put("id", responseDto.getId());
            response.put("targetName", responseDto.getTargetName());
            if(responseDto.getDepartmentId() != null){
                DepartmentDto departmentDto = departmentService.getDepartmentById(responseDto.getDepartmentId());
               response.put("department", departmentDto.getName());
            }else{
                response.put("department", null);
            }

            if (responseDto.getEmployeeId() != null) {
                EmployeeDto emplDto = employeeService.findEmployeeById(responseDto.getEmployeeId(), Constants.ALIVE);
                response.put("employee", emplDto.getFullName());
            } else {
                response.put("employee", null);
            }
            
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/department/{departmentId}/{year}")
    public ResponseEntity<?> getAllTargetDepartment(@PathVariable("departmentId") Long departmentId, @PathVariable("year") String year){
    	try {
			List<TargetDto> lstTargetDto = targetService.findTargetByDepartmentId(departmentId,null, year, Constants.ALIVE);
			return new ResponseEntity<List<TargetDto>>(lstTargetDto, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getAllTargetEmloyee(@PathVariable("employeeId") Long employeeId){
        try {
            String year = DateUtils.getStrCurrentYear();
            List<TargetDto> lstTarget = targetService.findTargetByEmployeeId(employeeId, null, year, Constants.ALIVE);
            return new ResponseEntity<>(lstTarget, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listSubtarget/{parrent}")
	public ResponseEntity<?> getListSubTargetByParrent(@PathVariable("parrent") Long parrent){
		try {
            String year = DateUtils.getStrCurrentYear();
			List<TargetDto> lstTarget = targetService.findBySubTarget(parrent, year, Constants.ALIVE);	
            return new ResponseEntity<List<TargetDto>>(lstTarget, HttpStatus.OK);			
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

    @PostMapping("/create")
    public ResponseEntity<?> createTarget(@RequestBody TargetDto dto){
        try {
            Target responseTarget = targetService.saveOrUpdate(dto);
            TargetDto reponseTargetDto = targetService.convertDto(responseTarget);
            return new ResponseEntity<>(reponseTargetDto, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/createSubTarget")
    public ResponseEntity<?> createSubTarget(@RequestBody TargetDto dto){
        try {
            Target responseTarget = targetService.saveOrUpdate(dto);
            TargetDto reponseTargetDto = targetService.convertDto(responseTarget);
            return new ResponseEntity<>(reponseTargetDto, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
