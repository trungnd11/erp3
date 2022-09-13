package com.vdc.hrservice.office.service;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.hrservice.auth.domain.AppUser;
import com.vdc.hrservice.auth.repository.AppUserRepository;
import com.vdc.hrservice.common.SecureUlti;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.office.domain.Comment;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.dto.CommentDto;
import com.vdc.hrservice.office.dto.TaskDto;
import com.vdc.hrservice.office.repository.CommentRepository;
import com.vdc.hrservice.office.repository.TaskRepository;
import com.vdc.hrservice.security.SecurityUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentService {
    
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    public Page<CommentDto> getCommentsTask(Long taskId, Pageable pageable) {
        return commentRepository.findByTaskIdAndDelFlgIsFalse(taskId, pageable).map(CommentDto::of);
    }

    public CommentDto createComment(Long taskId, CommentDto commentDto) throws Exception {
        Comment comment = Comment.of(commentDto);
        Optional<TaskDto> task = taskRepository.getTaskById(taskId);
        if (!task.isPresent()) {
            throw new Exception("Task not found");
        }
        Optional<AppUser> employee = appUserRepository.getUser(commentDto.getUserUsername());
        if (!employee.isPresent()) {
            throw new Exception("Employee not found");
        }
        comment.setTask(Task.builder().id(task.get().getId()).build());
        comment.setUser(employee.get());
        comment.setChildrens(new ArrayList());
        comment = commentRepository.save(comment);
        return CommentDto.of(comment);
    }

    @Transactional(rollbackFor = Exception.class)
    public CommentDto replyComment(Long parentId, CommentDto commentDto) throws Exception {
        Comment comment = Comment.of(commentDto);
        Optional<AppUser> employee = appUserRepository.getUser(commentDto.getUserUsername());
        if (!employee.isPresent()) {
            throw new Exception("Employee not found");
        }
        comment.setUser(employee.get());

        Optional<Comment> parent = commentRepository.findByIdAndDelFlgIsFalse(parentId);
        if (!parent.isPresent()) {
            throw new Exception("Comment not found");
        }
        comment.setChildrens(new ArrayList<Comment>());
        comment = commentRepository.save(comment);
        List<Comment> childrens = parent.get().getChildrens();
        childrens.add(comment);

        Comment cmt = parent.get();
        cmt.setChildrens(childrens);
        commentRepository.save(cmt);

        return CommentDto.of(comment);
    }
    
    public CommentDto updateComment(Long id, CommentDto commentDto) throws Exception {
        Optional<Comment> comment = commentRepository.findByIdAndDelFlgIsFalse(id);
        if (!comment.isPresent()) {
            throw new Exception("Comment not found");
        }
        Comment target = comment.get();
        if(SecureUlti.hasEditComment(target, SecurityUtils.getCurrentUserLogin().get())){
            throw new Exception("You're not permission");
        }
        
        target.setContent(commentDto.getContent());
        target = commentRepository.save(target);
        return CommentDto.of(target);
    }
}