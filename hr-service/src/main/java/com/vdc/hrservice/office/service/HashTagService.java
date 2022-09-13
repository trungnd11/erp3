package com.vdc.hrservice.office.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.HashTag;
import com.vdc.hrservice.office.dto.HashTagDto;
import com.vdc.hrservice.office.repository.HashTagRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HashTagService {
    @Autowired
    private HashTagRepository hashTagRepository;

    public List<HashTagDto> findHashTagByProjectIdAndDelFlg(Long projectId, Boolean delFlg){
        List<HashTag> hashTags = hashTagRepository.findHashTagByProjectIdAndDelFlg(projectId, delFlg);
        return hashTags.stream().map(HashTagDto::of).collect(Collectors.toList());
    }

    public List<HashTagDto> findAllByDelFlg(Boolean delFlg){
        List<HashTag> hashTags = hashTagRepository.findByDelFlg(delFlg);
        return hashTags.stream().map(HashTagDto::of).collect(Collectors.toList());
    }

    public HashTagDto findHashtagById(Long id, Boolean delFlg){
        HashTag hashTag = hashTagRepository.findByIdAndDelFlg(id, delFlg).orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        return HashTagDto.of(hashTag);
    }

    public HashTagDto createNewHashTag(HashTagDto dto){
        HashTag hashTag = new HashTag();
        hashTag.setName(dto.getName());
        hashTag.setDelFlg(Constants.ALIVE);
        hashTagRepository.save(hashTag);
        return HashTagDto.of(hashTag);
    }

    public HashTagDto updateHashTag(HashTagDto dto){
        HashTag hashTag = hashTagRepository.findByIdAndDelFlg(dto.getId(), Constants.ALIVE).get();
        hashTag.setName(dto.getName());
        hashTagRepository.save(hashTag);
        return HashTagDto.of(hashTag);
    }

    public void deleteHashTag(Long id) throws Exception{
        Optional<HashTag> hashTag = hashTagRepository.findById(id);
       if (hashTag.isPresent()) {
           hashTag.get().setDelFlg(Constants.NON_ALIVE);
           hashTagRepository.save(hashTag.get());
       } else {
        throw new Exception(String.format("Project with ID = %d not found", id));
       }
    }
}
