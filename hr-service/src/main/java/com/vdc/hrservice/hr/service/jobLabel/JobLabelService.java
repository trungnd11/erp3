package com.vdc.hrservice.hr.service.jobLabel;

import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.jobLabel.GroupJobLabel;
import com.vdc.hrservice.hr.domain.jobLabel.JobLabel;
import com.vdc.hrservice.hr.dto.jobLabelDto.GroupJobLabelDto;
import com.vdc.hrservice.hr.dto.jobLabelDto.JobLabelDto;
import com.vdc.hrservice.hr.repository.jobLabel.GroupJobLabelRepository;
import com.vdc.hrservice.hr.repository.jobLabel.JobLabelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobLabelService {
    @Autowired
    JobLabelRepository jobLabelRepository;

    @Autowired
    GroupJobLabelRepository groupJobLabelRepository;

    public List<JobLabelDto> findAllJobLabel(){
        List<JobLabel> lstJobLabel = jobLabelRepository.findByDelFlg(Constants.ALIVE);
        return lstJobLabel.stream().map(JobLabelDto::of).collect(Collectors.toList());
    }

    public List<JobLabelDto> findJobLabelByGroupJobLabelId(Long groupJobLabelId){
        List<JobLabel> lstJobLabel = jobLabelRepository.findByGroupJobLabelIdAndDelFlg( groupJobLabelId, Constants.ALIVE);
        List<JobLabelDto> lstJobLabelDto = lstJobLabel.stream().map(JobLabelDto::of).collect(Collectors.toList());
        return lstJobLabelDto;
    }

    public JobLabelDto addJobLabel(JobLabelDto dto){
        JobLabel jobLabel = new JobLabel();
        jobLabel.setColorCode(dto.getColorCode());
        jobLabel.setLabelName(dto.getLabelName());
        GroupJobLabel groupJobLabel = groupJobLabelRepository.findByIdAndDelFlg(dto.getGroupJobLabelId(), Constants.ALIVE).get();
        jobLabel.setDelFlg(Constants.ALIVE);
        jobLabel.setGroupJobLabel(groupJobLabel);
        JobLabel saveJobLabel = jobLabelRepository.save(jobLabel);
        JobLabelDto response = JobLabelDto.of(saveJobLabel);
        return response;
    }

    public JobLabelDto updateJobLabel(Long id, JobLabelDto dto){
        JobLabel requestJobLabel = jobLabelRepository.findByIdAndDelFlg(id, Constants.ALIVE)
                                                     .orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        requestJobLabel.setLabelName(dto.getLabelName());
        requestJobLabel.setColorCode(dto.getColorCode());
        JobLabel saveJobLabel = jobLabelRepository.save(requestJobLabel);
        return JobLabelDto.of(saveJobLabel);
    }

    public Integer deleteJobLabel(Long id){
        JobLabel jobLabel = jobLabelRepository.findByIdAndDelFlg(id, Constants.ALIVE).get();
        if (jobLabel != null) {
            jobLabel.setLogicDeletedAt();
            return 1;
        } else {
            return 0;
        }                                      
    }   
}
