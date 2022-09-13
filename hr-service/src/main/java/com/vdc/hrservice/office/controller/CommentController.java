package com.vdc.hrservice.office.controller;

import java.util.List;

import com.vdc.hrservice.common.HttpResponse;
import com.vdc.hrservice.office.dto.CommentDto;
import com.vdc.hrservice.office.service.CommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping(path = "/api/v1/comment")
public class CommentController {
    
    @Autowired
    private CommentService commentService;

    @GetMapping(path = "")
    public ResponseEntity<?> getComments(@RequestParam(name="task") Long taskId, Pageable pageable) {
        try {
            Page<CommentDto> listComment = commentService.getCommentsTask(taskId, pageable);
            return ResponseEntity.ok().body(new HttpResponse<>(listComment));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createComment(@RequestParam(name = "task") Long taskId ,@RequestBody CommentDto commentDto) {
        try {
            CommentDto dto = commentService.createComment(taskId, commentDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new HttpResponse<>(dto));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }
    
    @PostMapping("/{id}")
    public ResponseEntity<?> replyComment(@PathVariable(name = "id") Long parentId,
            @RequestBody CommentDto commentDto) {
        try {
            CommentDto dto = commentService.replyComment(parentId, commentDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new HttpResponse<>(dto));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(@PathVariable(name="id") Long id, @RequestBody CommentDto commentDto) {
        try {
            CommentDto dto = commentService.updateComment(id, commentDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new HttpResponse<>(dto));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }
}
