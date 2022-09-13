package com.vdc.hrservice.office.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.AttachFile;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.dto.AttachFileDto;
import com.vdc.hrservice.office.repository.AttachFileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttachFileService {
    @Autowired
    private AttachFileRepository attachFileRepository;

    public List<AttachFileDto> findAllAttachFileByTaskId(Long taskId, Boolean delFlg){
        List<AttachFile> lstAttachFiles = attachFileRepository.findByTaskIdAndDelFlg(taskId, delFlg);
        return lstAttachFiles.stream().map(AttachFileDto::of).collect(Collectors.toList());
    }

    public AttachFileDto findAttachFileById(Long id, Boolean delFlg){
        AttachFile attachFile = attachFileRepository.findByIdAndDelFlg(id, delFlg).orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        return AttachFileDto.of(attachFile);
    }

    public AttachFile createNewAttachFile(AttachFileDto dto){
        AttachFile  attachFile = new AttachFile();
        attachFile.setOriginalName(dto.getOriginalName());
        attachFile.setType(dto.getType());
        attachFile.setDownloadUri(dto.getDownloadUri());
        // Task task = Task.of(dto.getTask());
        // attachFile.setTask(task);
        attachFile.setDelFlg(Constants.ALIVE);
        attachFileRepository.save(attachFile);
        return attachFile;
    }

    public AttachFile updateAttachFile(AttachFileDto dto, Task entity){
        AttachFile attachFile = AttachFile.of(dto);
        attachFile.setTask(entity);
        attachFileRepository.save(attachFile);
        return attachFile;
    }

    public void deleteAttachFile(Long id) throws Exception{
        Optional<AttachFile> attachFile = attachFileRepository.findById(id);
        if (attachFile.isPresent()) {
            AttachFile deleteAttachFile = attachFile.get();
            deleteAttachFile.setDelFlg(Constants.NON_ALIVE);
            attachFileRepository.save(deleteAttachFile);
        } else {
            throw new Exception(String.format("AttachFile with ID = %d not found", id));
        }
    }

}
