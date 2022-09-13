package com.vdc.hrservice.hr.dto.targetDto;

import com.vdc.hrservice.hr.domain.target.LinkTarget;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LinkTargetDto {
    private Long rootTargetId;

    private Long linkTargetId;

    public static LinkTargetDto of(LinkTarget linkTarget){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(linkTarget, LinkTargetDto.class);
    }
}
