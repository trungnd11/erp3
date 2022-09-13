package com.vdc.hrservice.office.dto;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.office.domain.Comment;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CommentDto {
    
    private Long id;
    private String content;
    private List<CommentDto> childrens;
    private Instant createdDate;
    private Instant lastModifiedDate;
    @JsonProperty("user")
    private String userUsername;
    @JsonProperty("commentator_name")
    private String userEmployeeFullname;
    @JsonProperty("commentator_avatar")
    private String userEmployeeAvatarPic;

    public static CommentDto of(Comment comment) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(comment, CommentDto.class);
    }
}
