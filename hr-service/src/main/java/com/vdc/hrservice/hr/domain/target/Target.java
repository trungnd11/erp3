package com.vdc.hrservice.hr.domain.target;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.domain.department.Department;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.jobLabel.GroupJobLabel;
import com.vdc.hrservice.hr.dto.targetDto.TargetDto;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.modelmapper.ModelMapper;

import lombok.Data;

@Data
@Entity
@Table(name = "target")
public class Target extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

	//Tên mục tiêu
	@Column(name="target_name", nullable = false)
	private String targetName;
	//Mô tả
	@Lob
	@Column(name="target_description", length = 512, nullable = false)
	private String targetDescription;
	
	//Trọng số
	@Column(name="weight", nullable = false)
	private Float weight;
	
	//Mức độ chia sẻ
	@Column(name="share_level", nullable = false)
	private String shareLevel;
	
	//Loại mục tiêu
    @Column(name = "target_types", nullable = false)
	private Integer targetTypes;
	
	//Nhóm mục tiêu
	@Column(name="target_group", nullable = false)
	private Integer targetGroup;
	
	//Ngày bắt đầu
	@Column(name="start_day", nullable = false)
	private ZonedDateTime startDay;
	
	//Ngày hoàn thành
	@Column(name="finish_day", nullable = false)
	private ZonedDateTime finishDay;
	
	//Tiến độ
	@Column(name="progress", nullable = false)
	private Double progress;	
	
	//trạng thái
	@Column(name="status", nullable = false)
	private Character status; 
	
    //Phương thức
	@Column(name="method", nullable = false)
	private String method;
	
    //Cha
	@Column(name="parrent", nullable = true)
	private Long parrent;
	
    //Năm
	@Column(name = "year", nullable = true)
	private String year;
	
	@Column(name = "has_child", nullable = true)
	private Boolean hasChild;
	
    //Cách tính
	@Column(name="calculation", nullable = true)
	private Integer calculation;
	
    //Tổng số mục tiêu
	@Column(name = "total_sub_target", nullable = true)
	private Integer totalSubTarget;
	
    //Tổng số mục tiêu con hoàn thành
	@Column(name = "total_sub_target_complete", nullable = true)
	private Integer totalSubTargetComplete;
	
    //Tổng số công việc
	@Column(name = "total_jobs",nullable = true )
	private Integer totalJobs;
	
    //Tổng số công việc hoàn thành
	@Column(name = "total_jobs_completed", nullable = true )
	private Integer totalJobComplete;
	
    //Tổng số feedback
	@Column(name = "total_feedBack", nullable = true )
	private Integer totalFeedBack; 

    //Cấp
	@Column(name = "level", nullable = true)
	private Integer level;

	@ManyToOne(cascade = CascadeType.MERGE)
	@NotFound(action = NotFoundAction.IGNORE)
	@JoinColumn(name = "target_library_id")
	private TargetLibrary targetLibrary;

	@ManyToOne(cascade = CascadeType.MERGE)
	@NotFound(action = NotFoundAction.IGNORE)
	@JoinColumn(name = "employee_id")
	private Employee employee;

	@ManyToOne(cascade = CascadeType.MERGE)
	@NotFound(action = NotFoundAction.IGNORE)
	@JoinColumn(name = "department_id")
	private Department department;
	
	@OneToOne
	@NotFound(action = NotFoundAction.IGNORE)
	@JoinColumn(name="group_job_label_id")
	private GroupJobLabel groupJobLabel;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "target_id")
	@JsonIgnore
	private List<ResultTarget> resultTargetList = new ArrayList<ResultTarget>();

    public static Target of(TargetDto dto){
        ModelMapper mapper = new ModelMapper();
		System.out.println(dto);
        return mapper.map(dto, Target.class);
    }
}
