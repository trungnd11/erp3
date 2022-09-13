package com.vdc.hrservice.hr.service.target;

import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.target.Target;
import com.vdc.hrservice.hr.domain.target.TargetLibrary;
import com.vdc.hrservice.hr.dto.targetDto.TargetDto;
import com.vdc.hrservice.hr.dto.targetDto.TargetLibrarytDto;
import com.vdc.hrservice.hr.repository.target.TargetLibraryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TargetLibraryService {

    @Autowired
    private TargetLibraryRepository targetLibraryRepo;

    public List<TargetLibrarytDto> getListTargetLibrary(Boolean delFlg){
        List<TargetLibrary> lstTargetLibrary = targetLibraryRepo.findByDelFlg(delFlg);
        List<TargetLibrarytDto> lstTargetLibrartDto = lstTargetLibrary.stream().map(TargetLibrarytDto::of).collect(Collectors.toList());
        return lstTargetLibrartDto;
    }

    public TargetLibrarytDto getTargetLibraryById(Long id, Boolean delFlg){
        TargetLibrary targetLibrary = targetLibraryRepo.findByIdAndDelFlg(id, delFlg).orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        TargetLibrarytDto targetLibrarytDto = TargetLibrarytDto.of(targetLibrary);
        return targetLibrarytDto;
    }

    public TargetLibrarytDto createTargetLibrary(TargetLibrarytDto dto){
        TargetLibrary targetLibrary = new TargetLibrary();
        targetLibrary.setLibraryTargetName(dto.getLibraryTargetName());
        List<Target> lstTarget = dto.getListTarget().stream().map(Target::of).collect(Collectors.toList());
        targetLibrary.setLstTarget(lstTarget);
        TargetLibrary saveTargetLibrary = targetLibraryRepo.save(targetLibrary);
        return TargetLibrarytDto.of(saveTargetLibrary);
    }

    public TargetLibrarytDto updateTargetLibrary(Long id, TargetLibrarytDto dto){
        TargetLibrary targetLibrary = targetLibraryRepo.findByIdAndDelFlg(id, Constants.ALIVE).orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        targetLibrary.setLibraryTargetName(dto.getLibraryTargetName());
        TargetLibrary saveTargetLibrary = targetLibraryRepo.save(targetLibrary);
        TargetLibrarytDto targetLibrarytDtoResponse = TargetLibrarytDto.of(saveTargetLibrary);
        return targetLibrarytDtoResponse;
    }

    public Boolean deleteTargetLibrary(Long id, TargetLibrarytDto dto){
        TargetLibrary targetLibrary = targetLibraryRepo.findByIdAndDelFlg(id, Constants.ALIVE).orElseThrow(() -> new IllegalArgumentException("can not found id:" + id));
        targetLibrary.setDelFlg(Constants.NON_ALIVE);
        targetLibraryRepo.save(targetLibrary);
        return Boolean.TRUE;
    }
    
 
}
