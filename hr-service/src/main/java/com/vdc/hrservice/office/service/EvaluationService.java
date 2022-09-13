package com.vdc.hrservice.office.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Evaluation;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.dto.EvaluationDto;
import com.vdc.hrservice.office.repository.EvaluationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EvaluationService {
    @Autowired
    private EvaluationRepository evaluationRepository;

    public List<EvaluationDto> findAllEvaluation(Boolean delFlg){
        List<Evaluation> lstEvaluation = evaluationRepository.findByDelFlg(delFlg);
        return lstEvaluation.stream().map(EvaluationDto::of).collect(Collectors.toList());
    }

    public EvaluationDto findEvaluationById(Long id, Boolean delFlg){
        Evaluation evaluation = evaluationRepository.findByIdAndDelFlg(id, delFlg)
                                                    .orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        return EvaluationDto.of(evaluation);
    }

    public Evaluation createNewEvaluation(EvaluationDto dto){
        Evaluation evaluation = new Evaluation();
        evaluation.setPercentComplete(dto.getPercentComplete());
        evaluation.setQuality(dto.getQuality());
        evaluation.setTimeComplete(DateUtils.convertShort2Zone(dto.getTimeComplete()));
        Task task = Task.of(dto.getTask());
        evaluation.setTask(task);
        evaluation.setDelFlg(Constants.ALIVE);
        evaluationRepository.save(evaluation);
        return evaluation;

    }

    public Evaluation updateEvaluation(EvaluationDto dto){
        Evaluation evaluation = evaluationRepository.findByIdAndDelFlg(dto.getId(), Constants.ALIVE).get();
        evaluation.setPercentComplete(dto.getPercentComplete());
        evaluation.setQuality(dto.getQuality());
        evaluation.setTimeComplete(DateUtils.convertShort2Zone(dto.getTimeComplete()));
        Task task = Task.of(dto.getTask());
        evaluation.setTask(task);
        evaluation.setDelFlg(Constants.ALIVE);
        evaluationRepository.save(evaluation);
        return evaluation;
    }

    public void deleteEvaluationById(Long id) throws Exception{
        Optional<Evaluation> evaluation = evaluationRepository.findById(id);
        if (evaluation.isPresent()) {
            evaluation.get().setDelFlg(Constants.NON_ALIVE);
        } else {
            throw new Exception(String.format("Project with ID = %d not found", id));
        }
    }
}
