package com.vdc.hrservice.hr.service.employee.interfaceService;

import java.util.List;

import com.vdc.hrservice.hr.dto.employee.EmployeeForeignLanguageDto;

public interface EmployeeLanguageService {
  public abstract List<EmployeeForeignLanguageDto> getForeignLanguages();
  public abstract List<EmployeeForeignLanguageDto> getForeignLanguagesById(Long id);
  public abstract EmployeeForeignLanguageDto createForeignLanguage(EmployeeForeignLanguageDto languageDto);
  public abstract EmployeeForeignLanguageDto updateForeignLanguage(EmployeeForeignLanguageDto languageDto);
  public abstract int deleteForeignLanguage(Long id);
}
