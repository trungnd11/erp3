package com.vdc.hrservice.hr.domain.target;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.targetDto.ResultTargetDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Data
@Entity
@Table(name = "result_target")
public class ResultTarget extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "result", nullable = false)
	private Double result;

    @Column(name = "month_year", nullable = false)
	private String monthYear;

    @Column(name="deparment_id", nullable = true)
	private Long departmentId;
	
	@Column(name="employee_id", nullable = true)
	private Long employeeId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "target_id")
    private Target target;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ResultTarget)) {
            return false;
        }
        return monthYear != null && monthYear.equals(((ResultTarget) o).monthYear);
    }

    public static ResultTarget of(ResultTargetDto dto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, ResultTarget.class);
    }

}
