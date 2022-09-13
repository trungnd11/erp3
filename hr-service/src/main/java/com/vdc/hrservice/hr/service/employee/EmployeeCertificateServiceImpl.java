package com.vdc.hrservice.hr.service.employee;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeCertificate;
import com.vdc.hrservice.hr.dto.employee.EmployeeCertificateDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeCertificateRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeCertificateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeCertificateServiceImpl implements EmployeeCertificateService {
  @Autowired
  EmployeeCertificateRepository certificateRepo;

  @Autowired
  EmployeeRepository employeeRepo;

  @Override
  public EmployeeCertificateDto createCertificate(EmployeeCertificateDto certificateDto) {
    EmployeeCertificate certificate = new EmployeeCertificate();
    Employee employee = employeeRepo.getById(certificateDto.getEmployeeId());
    certificate.setName(certificateDto.getName());
    certificate.setDegreeUnit(certificateDto.getDegreeUnit());
    certificate.setYearCompleted(certificateDto.getYearCompleted());
    certificate.setNote(certificateDto.getNote());
    certificate.setEmployee(employee);
    certificateRepo.save(certificate);
    return certificateDto;
  }

  @Override
  public int deleteCertificate(Long id) {
    EmployeeCertificate certificate = certificateRepo.getById(id);
    certificate.setDelFlg(Constants.DELFLG_ONE);
    certificateRepo.save(certificate);
    return 1;
  }

  @Override
  public List<EmployeeCertificateDto> getCertificates() {
    List<EmployeeCertificate> certificates = certificateRepo.findByDelFlg(Constants.DELFLG_ZERO);
    List<EmployeeCertificateDto> certificateDtos = certificates.stream().map(EmployeeCertificateDto::of).collect(Collectors.toList());
    return certificateDtos;
  }

  @Override
  public List<EmployeeCertificateDto> getCertificatesByEmployeeId(Long id) {
    List<EmployeeCertificate> certificates = certificateRepo.findByEmployeeIdAndDelFlg(id, Constants.DELFLG_ZERO);
    List<EmployeeCertificateDto> certificateDtos = certificates.stream().map(EmployeeCertificateDto::of).collect(Collectors.toList());
    return certificateDtos;
  }

  @Override
  public EmployeeCertificateDto updateCertificate(EmployeeCertificateDto certificateDto) {
    EmployeeCertificate certificate = certificateRepo.getById(certificateDto.getId());
    certificate.setName(certificateDto.getName());
    certificate.setDegreeUnit(certificateDto.getDegreeUnit());
    certificate.setYearCompleted(certificateDto.getYearCompleted());
    certificate.setNote(certificateDto.getNote());
    certificateRepo.save(certificate);
    return certificateDto;
  }

}
