package com.vdc.hrservice.office.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Priority;
import com.vdc.hrservice.office.dto.PriorityDto;
import com.vdc.hrservice.office.repository.PriorityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PriorityService {
    @Autowired
    private PriorityRepository priorityRepository;

    public List<PriorityDto> findAllPriority(Boolean delFlg){
        List<Priority> lstPriority = priorityRepository.findByDelFlg(delFlg);
        return lstPriority.stream().map(PriorityDto::of).collect(Collectors.toList());
    }

    public PriorityDto findPriorityById(Long id, Boolean delFlg){
        Priority priority = priorityRepository.findByIdAndDelFlg(id, delFlg).orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        return PriorityDto.of(priority);
    }

    public Priority createNewPriority(PriorityDto dto){
        Priority newPriority = new Priority();
        newPriority.setName(dto.getName());
        newPriority.setColor(dto.getColor());
        newPriority.setDelFlg(Constants.ALIVE);
        priorityRepository.save(newPriority);
        return newPriority;
    }

    public Priority updatePriority(PriorityDto dto){
        Priority priority = priorityRepository.findByIdAndDelFlg(dto.getId(), Constants.ALIVE).get();
        priority.setName(dto.getName());
        priority.setColor(dto.getColor());
        priorityRepository.save(priority);
        return priority;
    }

    public void deletePriority(Long id) throws Exception{
        Optional<Priority> priority = priorityRepository.findById(id);
        if (priority.isPresent()) {
            priority.get().setDelFlg(Constants.NON_ALIVE);
            priorityRepository.save(priority.get());
        } else {
            throw new Exception(String.format("Project with ID = %d not found", id));
        }
    }
}
