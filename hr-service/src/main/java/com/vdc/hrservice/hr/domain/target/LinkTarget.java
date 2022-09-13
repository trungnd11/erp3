package com.vdc.hrservice.hr.domain.target;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.targetDto.LinkTargetDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Data
@Entity
@Table(name = "link_target")
public class LinkTarget extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="root_target", nullable = false)
	private Long rootTargetId; 
	
	@Column(name="link_target", nullable = false)
	private Long linkTargetId;

    public static LinkTarget of(LinkTargetDto dto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, LinkTarget.class);
    }
}
