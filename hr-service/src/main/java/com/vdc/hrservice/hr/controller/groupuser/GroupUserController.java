package com.vdc.hrservice.hr.controller.groupuser;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.dto.groupuser.GroupUserDto;
import com.vdc.hrservice.hr.service.groupuser.interfaceService.GroupuserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/v1/groupuser")
public class GroupUserController {

  @Autowired
  private GroupuserService groupuserService;

  // GET
  @GetMapping("")
  public ResponseEntity<?> getGroupusers() {
    try {
      return new ResponseEntity<>(groupuserService.getGroupusers(), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // GET
  @GetMapping("/grp")
  public ResponseEntity<?> getGroupusersWithPage(
      @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
      @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
      @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort) {

    try {
      Pageable pageable = PageRequest.of(page, size);
      Page<GroupUserDto> grp = groupuserService.getGroupusersWithPage(Constants.DELFLG_ZERO, pageable);
      return new ResponseEntity<>(grp, HttpStatus.OK);
    } catch (Exception e) {
      // TODO: handle exception
      return new ResponseEntity<String>("Không có dữ liệu", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // POST
  @PostMapping("")
  public ResponseEntity<?> createGroupuser(@RequestBody GroupUserDto newPart) {
    try {
      return new ResponseEntity<>(groupuserService.createGroupuser(newPart), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("")
  public ResponseEntity<?> updateGroupuser(@RequestBody GroupUserDto newPart) {
    try {
      return new ResponseEntity<>(groupuserService.updateGroupuser(newPart), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // DELETE
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteGroupuser(@PathVariable Long id) {

    try {
      return new ResponseEntity<>(groupuserService.deleteGroupuser(id), HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
