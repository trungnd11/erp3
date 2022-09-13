package com.vdc.hrservice.hr.service.employee;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.EmployeeForeignLanguage;
import com.vdc.hrservice.hr.dto.employee.EmployeeForeignLanguageDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeLanguageRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeLanguageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeLanguageServiceImpl implements EmployeeLanguageService {

  @Autowired
  EmployeeRepository employeeRepo;

  @Autowired
  EmployeeLanguageRepository languageRepo;

  @Override
  public EmployeeForeignLanguageDto createForeignLanguage(EmployeeForeignLanguageDto languageDto) {
    EmployeeForeignLanguage language = new EmployeeForeignLanguage();
    language.setName(languageDto.getName());
    language.setUseListen(languageDto.getUseListen());
    language.setUseSpeak(languageDto.getUseSpeak());
    language.setUseRead(languageDto.getUseRead());
    language.setUseWrite(languageDto.getUseWrite());
    language.setUnderstand(languageDto.getUnderstand());
    language.setNote(languageDto.getNote());
    language.setEmployee(employeeRepo.getById(languageDto.getEmployeeId()));
    languageRepo.save(language);
    return languageDto;
  }

  @Override
  public int deleteForeignLanguage(Long id) {
    EmployeeForeignLanguage language = languageRepo.getById(id);
    language.setDelFlg(Constants.DELFLG_ONE);
    languageRepo.save(language);
    return 1;
  }

  @Override
  public List<EmployeeForeignLanguageDto> getForeignLanguages() {
    List<EmployeeForeignLanguage> languages = languageRepo.findByDelFlg(Constants.DELFLG_ZERO);
    return languages.stream().map(EmployeeForeignLanguageDto::of).collect(Collectors.toList());
  }

  @Override
  public List<EmployeeForeignLanguageDto> getForeignLanguagesById(Long id) {
    List<EmployeeForeignLanguage> languages = languageRepo.findByEmployeeIdAndDelFlg(id, Constants.DELFLG_ZERO);
    return languages.stream().map(EmployeeForeignLanguageDto::of).collect(Collectors.toList());
  }

  @Override
  public EmployeeForeignLanguageDto updateForeignLanguage(EmployeeForeignLanguageDto languageDto) {
    EmployeeForeignLanguage language = languageRepo.getById(languageDto.getId());
    language.setName(languageDto.getName());
    language.setUseListen(languageDto.getUseListen());
    language.setUseSpeak(languageDto.getUseSpeak());
    language.setUseRead(languageDto.getUseRead());
    language.setUseWrite(languageDto.getUseWrite());
    language.setUnderstand(languageDto.getUnderstand());
    language.setNote(languageDto.getNote());
    languageRepo.save(language);
    return languageDto;
  }
  
}
