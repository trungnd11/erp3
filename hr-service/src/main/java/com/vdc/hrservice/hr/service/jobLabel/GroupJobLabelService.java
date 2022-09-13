package com.vdc.hrservice.hr.service.jobLabel;

import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.jobLabel.GroupJobLabel;
import com.vdc.hrservice.hr.domain.jobLabel.JobLabel;
import com.vdc.hrservice.hr.dto.jobLabelDto.GroupJobLabelDto;
import com.vdc.hrservice.hr.repository.jobLabel.GroupJobLabelRepository;
import com.vdc.hrservice.hr.repository.jobLabel.JobLabelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupJobLabelService {
    
    @Autowired
    private GroupJobLabelRepository groupJobLabelRepo;

    @Autowired
    private JobLabelRepository jobLabelRepository;
 
    public List<GroupJobLabelDto> findAllGroupJobLabel(){
        List<GroupJobLabel> lstGroupJobLabel = groupJobLabelRepo.findByDelFlg(Constants.ALIVE);
        List<GroupJobLabelDto> lstGroupJobLabelDtos = lstGroupJobLabel.stream().map(GroupJobLabelDto::of).collect(Collectors.toList());
        return lstGroupJobLabelDtos;
    }

    public GroupJobLabelDto findGroupJobLabelById(Long id){
        GroupJobLabel groupJobLabel = groupJobLabelRepo.findByIdAndDelFlg(id, Constants.ALIVE).orElseThrow(() -> new IllegalAccessError("can not found id:" + id));
        GroupJobLabelDto groupJobLabelDto = GroupJobLabelDto.of(groupJobLabel);
        return groupJobLabelDto;
    }

    public GroupJobLabelDto createGroupJobLabel(GroupJobLabelDto dto){
        GroupJobLabel groupJobLabel = new GroupJobLabel();
        groupJobLabel.setGroupName(dto.getGroupName());
        groupJobLabel.setGroupLabelLibrary(dto.getGroupLabelLibrary());
        dto.getLstJobLabel().stream().forEach((e) ->{
            JobLabel jobLabel = new JobLabel();
            jobLabel.setLabelName(e.getLabelName());
            jobLabel.setColorCode(e.getColorCode());
            jobLabelRepository.save(jobLabel);
            groupJobLabel.getLstJobLabel().add(jobLabel);
        });
        groupJobLabel.setDelFlg(Constants.ALIVE);
        GroupJobLabel saveGroupJobLabel = groupJobLabelRepo.save(groupJobLabel);
        GroupJobLabelDto groupJobLabelDtoResponse = GroupJobLabelDto.of(saveGroupJobLabel);
        return groupJobLabelDtoResponse;
    }

    public GroupJobLabelDto updateGroupJobLabel(Long id, GroupJobLabelDto dto){
        GroupJobLabel groupJobLabel = groupJobLabelRepo.findByIdAndDelFlg(id, Constants.ALIVE).orElseThrow(() -> new IllegalAccessError("can not found id:" + id));
        groupJobLabel.setGroupName(dto.getGroupName());
        groupJobLabel.setGroupLabelLibrary(dto.getGroupLabelLibrary());
        dto.getLstJobLabel().stream().forEach((e) ->{
            JobLabel jobLabel = new JobLabel();
            jobLabel.setLabelName(e.getLabelName());
            jobLabel.setColorCode(e.getColorCode());
            jobLabelRepository.save(jobLabel);
            groupJobLabel.getLstJobLabel().add(jobLabel);
        });
        groupJobLabel.setDelFlg(Constants.ALIVE);
        GroupJobLabelDto groupJobLabelDtoResponse = GroupJobLabelDto.of(groupJobLabel);
        return groupJobLabelDtoResponse;
    }

    public Boolean deleteGroupJobLabel(Long id){
        GroupJobLabel groupJobLabel = groupJobLabelRepo.findByIdAndDelFlg(id, Constants.ALIVE).orElseThrow(() -> new IllegalAccessError("can not found id:" + id));
        groupJobLabel.setDelFlg(Constants.NON_ALIVE);
        groupJobLabelRepo.save(groupJobLabel);
        return Boolean.TRUE;
    }

    public List<GroupJobLabelDto> getListGroupJobLabels(Boolean groupLabelLibrary,Boolean delFlg){
		List<GroupJobLabel> groupJobLabel = groupJobLabelRepo.findByGroupLabelLibraryAndDelFlg(groupLabelLibrary , delFlg);
        List<GroupJobLabelDto>  groupJobLabelDto = groupJobLabel.stream().map(GroupJobLabelDto::of).collect(Collectors.toList());
        return groupJobLabelDto;
	} 

}
