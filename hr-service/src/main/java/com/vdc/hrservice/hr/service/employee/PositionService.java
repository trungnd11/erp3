package com.vdc.hrservice.hr.service.employee;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.Position;
import com.vdc.hrservice.hr.dto.employee.PositionDto;
import com.vdc.hrservice.hr.repository.employee.PositionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PositionService {

    @Autowired
    private PositionRepository positionRepository;

    public PositionDto savePosition(PositionDto positionDto) {
        Position position = Position.of(positionDto);
        position = positionRepository.save(position);
        return PositionDto.of(position);
    }

    public Optional<PositionDto> getPositionById(Long id) {
        Optional<Position> position = positionRepository.findById(id);
        return position.map(PositionDto::of);
    }

    public void deletePostion(Long id) throws Exception {
        Optional<Position> position = positionRepository.findById(id);
        if (position.isPresent()) {
            Position updatedPosition = position.get();
            updatedPosition.setDelFlg(true);
            positionRepository.save(updatedPosition);
        } else {
            throw new Exception(String.format("Postion with ID = %d not found", id));
        }
    }
    
    public Page<PositionDto> findPostion(String key, Pageable pageable) {
        Page<Position> page = positionRepository.findPositionByKey(key, pageable);
        return page.map(PositionDto::of);
    }

    public PositionDto updatePosition(Long id, PositionDto dto) {
        Position position = Position.of(dto);
        position = positionRepository.save(position);
        return PositionDto.of(position);
    }

    public List<PositionDto> getAll(){
        return positionRepository.findAll().stream().map(PositionDto::of).collect(Collectors.toList());
    }
}
