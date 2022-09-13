package com.vdc.hrservice.hr.domain.target;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.targetDto.TargetLibrarytDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Data
@Entity
@Table(name = "target_library")
public class TargetLibrary extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    //Tên thư viện
	@Column(name = "library_name", nullable = false, length = 100) 
	private String libraryTargetName;

    @OneToMany(mappedBy = "targetLibrary",cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    List<Target> lstTarget = new ArrayList<Target>();

    public static TargetLibrary of(TargetLibrarytDto dto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, TargetLibrary.class);
    }
}
