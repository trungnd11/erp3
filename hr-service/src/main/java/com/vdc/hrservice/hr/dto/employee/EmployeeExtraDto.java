package com.vdc.hrservice.hr.dto.employee;

import com.vdc.hrservice.auth.dto.AppUserDto.UserDto;

import java.time.ZonedDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
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
public class EmployeeExtraDto {
	private Long id;

	private String employeeNumb;

	private String fullName;

	private String gender;

	// @JsonFormat(pattern = "dd/mm/yyyy")
	private String birthday;

	private String phoneNumber;

	private String email;

	// private String userAcc;

	private Long empPositionID;
	private String empPositionName;

	private String descJob;

	// private Department empDepartment;
	private Long empDepartmentID;
	private String empDepartmentName;

	private Long empUrID;

	private Long empHrID;

	// private Target target;

	// private List<EmployeeFamilyV2> familyMenbers;

	// Part2, add more info

	private String numbID;

	private String idReleaseDate;

	private String idReleasePlace;

	private String taxCode;

	private String idPlace;

	private String curretPlace;

	private String homeMobile;

	private String birthPlace;

	private String religion;

	private String country;

	private String maritalStatus;

	private String socialInsuranceId;

	private String bankAccount;

	private String avatarPic;

	@JsonProperty("account")
	private UserDto user;

	private Long empWP;

	public static EmployeeExtraDto of(Employee employee) {
		ModelMapper mapper = new ModelMapper();
		return mapper.map(employee, EmployeeExtraDto.class);
	}

	// Display In4 in general screen
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class EmployeeDto {
		private Long id;

		private String employeeNumb;

		private String fullName;

		private String gender;

		// @JsonFormat(pattern = "dd/mm/yyyy")
		private ZonedDateTime birthday;

		private String phoneNumber;

		private String email;

		// private String userAcc;

		private Long empPositionID;
		private String empPositionName;

		private String descJob;

		// private Department empDepartment;
		private Long empDepartmentID;
		private String empDepartmentName;

		private Long empUrID;

		private Long empHrID;

		// private Target target;

		// private List<EmployeeFamilyV2> familyMenbers;

		// Part2, add more info

		private String numbID;

		private ZonedDateTime idReleaseDate;

		private String idReleasePlace;

		private String taxCode;

		private String idPlace;

		private String curretPlace;

		private String homeMobile;

		private String birthPlace;

		private String religion;

		private String country;

		private String maritalStatus;

		private String socialInsuranceId;

		private String bankAccount;

		private String avatarPic;

		@JsonProperty("account")
		private UserDto user;

		private Long empWP;

		public static EmployeeDto of(Employee employee) {
			ModelMapper mapper = new ModelMapper();
			return mapper.map(employee, EmployeeDto.class);
		}
	}

}
