package com.vdc.hrservice.office.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Label;
import com.vdc.hrservice.office.dto.LabelDto;
import com.vdc.hrservice.office.repository.LabelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LabelService {
    @Autowired
    private LabelRepository labelRepository;

    public List<LabelDto> findAllLabel(Boolean delFlg){
        List<Label> lstLabel = labelRepository.findByDelFlg(delFlg);
        return lstLabel.stream().map(LabelDto::of).collect(Collectors.toList());
    }

    public LabelDto findLabelById(Long id, Boolean delFlg){
        Label label = labelRepository.findByIdAndDelFlg(id, delFlg).orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        return LabelDto.of(label);
        
    }

    public Label createNewLabel(LabelDto dto){
        Label newLabel = new Label();
        newLabel.setName(dto.getName());
        newLabel.setColor(dto.getColor());
        newLabel.setDelFlg(Constants.ALIVE);
        labelRepository.save(newLabel);
        return newLabel;
    }

    public Label updateLabelById(LabelDto dto){
        Label label = labelRepository.findByIdAndDelFlg(dto.getId(), Constants.ALIVE).get();
        label.setName(dto.getName());
        label.setColor(dto.getColor());
        labelRepository.save(label);
        return label;
    }

    public void deleteLabel(Long id)throws Exception{
        Optional<Label> label = labelRepository.findById(id);
        if(label.isPresent()){
            Label updateLabel = label.get();
            updateLabel.setDelFlg(Constants.NON_ALIVE);
            labelRepository.save(updateLabel);
        }else{
            throw new Exception(String.format("Label with ID = %d not found", id));
        }
    }
}
