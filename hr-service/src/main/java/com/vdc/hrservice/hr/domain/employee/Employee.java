package com.vdc.hrservice.hr.domain.employee;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.sql.DataSourceDefinition;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import com.vdc.hrservice.auth.domain.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.domain.department.Department;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto.BasicEmployeeDto;
import com.vdc.hrservice.hr.org_team.domain.TeamMember;
import com.vdc.hrservice.office.domain.Project;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.domain.notice.Notice;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "employee")
public class Employee extends AbstractAuditingEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "employee_Numb", length = 50, unique = true, nullable = false)
	private String employeeNumb;

	@Column(name = "full_Name", length = 50, nullable = true)
	private String fullName;

	@Column(name = "gender", nullable = true, length = 20)
	private String gender;

	@Column(name = "birthday", nullable = true)
	private ZonedDateTime birthday;

	@Column(name = "phone_number", length = 11, nullable = true)
	private String phoneNumber;

	@Column(name = "email", nullable = true, length = 255)
	@Email
	private String email;

	@ManyToOne
	@JsonIgnore
	@ToString.Exclude
	@JoinColumn(name = "employee_position_id")
	private Position empPosition;

	@Lob
	@Column(name = "desc_Job", nullable = true, length = 1000)
	private String descJob;

	@ManyToOne
	@JoinColumn(name = "department_id")
	@ToString.Exclude
	private Department empDepartment;

	@Column(name = "employee_workplace_id", nullable = true)
	private Long empWpID;

	@Column(name = "employee_UrID", nullable = true)
	private Long empUrID;

	@Column(name = "employee_HrID", nullable = true)
	private Long empHrID;

	// @ManyToOne(cascade = CascadeType.MERGE)
	// @JoinColumn(name = "target_id")
	// private Target target;

	// @JsonIgnore
	// @OneToMany(mappedBy = "employee")
	// private List<EmployeeFamilyV2> familyMenbers;

	////////////////////////////////
	// Part2, add more info

	@Column(name = "numb_ID", length = 11, nullable = true)
	private String numbID;

	@Column(name = "idRealease_date", nullable = true)
	private ZonedDateTime idReleaseDate;

	@Column(name = "idRealease_place", nullable = true)
	private String idReleasePlace;

	@Column(name = "tax_code", nullable = true)
	private String taxCode;

	@Column(name = "id_place", nullable = true)
	private String idPlace;

	@Column(name = "current_place", nullable = true, length = 255)
	private String curretPlace;

	@Column(name = "home_mobile", length = 20, nullable = true)
	private String homeMobile;

	@Column(name = "birth_Place", nullable = true)
	private String birthPlace;

	@Column(name = "religion", nullable = true, length = 255)
	private String religion;

	@Column(name = "country", nullable = true)
	private String country;

	@Column(name = "marital_status", nullable = true)
	private String maritalStatus;

	@Column(name = "social_Insurance_Id", nullable = true)
	private String socialInsuranceId;

	@Column(name = "bank_account", nullable = true)
	private String bankAccount;

	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnore
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	@ToString.Exclude
	private AppUser user;

	@Lob
	@Column(name = "avatar_pic", nullable = true)
	private String avatarPic;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<EmployeeEducation> education;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<EmployeeCertificate> certificate;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<EmployeeTraining> trainings;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<EmployeeForeignLanguage> languages;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<EmployeeProjectExperience> projects;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<EmployeeWorking> working;

	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<EmployeeSpecialize> specializes;

	@ManyToMany(mappedBy = "lstMember", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Project> lstProject;

	@ManyToMany(mappedBy = "lstAssignee", fetch = FetchType.LAZY)
	@ToString.Exclude
	private List<Task> taskAssignees;

	@ManyToMany(mappedBy = "lstWatcher", fetch = FetchType.LAZY)
	@ToString.Exclude
	private List<Task> taskWatchers;

	@OneToMany(mappedBy = "employee",cascade = CascadeType.ALL)
	private List<Notice> notice;

	public static Employee of(EmployeeDto dto) {
		ModelMapper mapper = new ModelMapper();
		return mapper.map(dto, Employee.class);
	}

	public static Employee convert(BasicEmployeeDto dto) {
		ModelMapper mapper = new ModelMapper();
		return mapper.map(dto, Employee.class);
	}

}
