package com.vdc.hrservice.office.dto;

import com.vdc.hrservice.office.domain.AttachFile;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttachFileDto {
    private Long id; 
    private String originalName;
    private String type;
    private String downloadUri;
    private Long fileSize;
    // private TaskDto task;

    public static AttachFileDto of(AttachFile entity) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                .setSkipNullEnabled(true);
        AttachFileDto attachFileDto = mapper.map(entity, AttachFileDto.class);
        return attachFileDto;
    }
    
    @NoArgsConstructor
    @Data
    public static class AttachFileDetailDto {
        private Long id;
        private String originalName;
        private String type;
        private String downloadUri;

        public static AttachFileDetailDto of(AttachFile attachFile) {
            ModelMapper mapper = new ModelMapper();
            return mapper.map(attachFile, AttachFileDetailDto.class);
        }
    }
}
