package com.vdc.hrservice.hr.service.employee.interfaceService;

import java.util.List;

import com.vdc.hrservice.hr.dto.employee.EmployeeCertificateDto;

public interface EmployeeCertificateService {
  public abstract List<EmployeeCertificateDto> getCertificates();
  public abstract List<EmployeeCertificateDto> getCertificatesByEmployeeId(Long id);
  public abstract EmployeeCertificateDto createCertificate(EmployeeCertificateDto certificateDto);
  public abstract EmployeeCertificateDto updateCertificate(EmployeeCertificateDto certificateDto);
  public abstract int deleteCertificate(Long id);
}
