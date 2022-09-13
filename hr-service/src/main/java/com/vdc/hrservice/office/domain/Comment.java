package com.vdc.hrservice.office.domain;

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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.vdc.hrservice.auth.domain.AppUser;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.office.dto.CommentDto;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.modelmapper.ModelMapper;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "office_comment")
@Data
@NoArgsConstructor
public class Comment extends AbstractAuditingEntity{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "content")
    @Lob
    private String content;

    @OneToMany(fetch = FetchType.LAZY)
    @Fetch(FetchMode.SUBSELECT)
    @ToString.Exclude
    private List<Comment> childrens;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "task_id")
    private Task task;

    // @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    // @JoinColumn(name = "create_by_id")
    // private Employee createBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private AppUser user;

    public static Comment of(CommentDto commentDto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(commentDto, Comment.class);
    }
}
