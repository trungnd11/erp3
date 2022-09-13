package com.vdc.hrservice.hr.dto.employee;

import java.time.ZonedDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vdc.hrservice.auth.domain.AppUser;
import com.vdc.hrservice.auth.dto.AppUserDto;
import com.vdc.hrservice.auth.dto.AppUserDto.UserDto;
import com.vdc.hrservice.hr.domain.department.Department;
import com.vdc.hrservice.hr.domain.employee.Employee;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDto {
    private Long id;

    private String employeeNumb;

    private String fullName;

    private String gender;

    private String birthday;

    private String phoneNumber;

    private String email;

    private Long empPositionID;

    private String empPositionName;

    private String descJob;

    private Long empDepartmentID;

    private Long empWpID;

    private Long empUrID;

    private Long empHrID;

    private String avatarPic;

    public EmployeeDto(Long id, String fullName, String avatarPic) {
        this.id = id;
        this.fullName = fullName;
        this.avatarPic = avatarPic;
    }

    public static EmployeeDto of(Employee employee) {
        ModelMapper mapper = new ModelMapper();
        EmployeeDto employeeDto = mapper.map(employee, EmployeeDto.class);
        // employeeDto.setUser(userDto);
        return employeeDto;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EmployeeAccountDto {
        private Long id;

        private String employeeNumb;

        private String fullName;

        private String gender;

        private ZonedDateTime birthday;

        private String phoneNumber;

        private String email;

        private String descJob;

        private Long empDepartmentID;

        @JsonProperty("department")
        private String empDepartmentName;

        private Long empUrID;

        private Long empHrID;

        private String avatarPic;

        private String positionName;

        @JsonProperty("address")
        private String curretPlace;

        @JsonProperty("account")
        private UserDto user;

        public static EmployeeAccountDto of(Employee employee) {
            ModelMapper mapper = new ModelMapper();
            EmployeeAccountDto employeeDto = mapper.map(employee, EmployeeAccountDto.class);
            return employeeDto;
        }
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class BasicEmployeeDto {
        private Long id;
        private String employeeNumb;
        private String fullName;
        private String avatarPic;


        public static BasicEmployeeDto of(Employee employee) {
            ModelMapper mapper = new ModelMapper();
            return mapper.map(employee, BasicEmployeeDto.class);
        }
    }

}
