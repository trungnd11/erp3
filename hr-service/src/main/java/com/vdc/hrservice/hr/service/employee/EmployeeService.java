package com.vdc.hrservice.hr.service.employee;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.FlushModeType;
import javax.persistence.LockModeType;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import com.netflix.appinfo.InstanceInfo;
import com.netflix.discovery.EurekaClient;
import com.vdc.hrservice.auth.domain.AppUser;

import com.vdc.hrservice.auth.dto.AppUserDto;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.config.Constants.MODE;
import com.vdc.hrservice.hr.domain.department.Department;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.auth.dto.AppUserDto.UserDto;
import com.vdc.hrservice.auth.repository.AppUserRepository;
import com.vdc.hrservice.hr.domain.employee.Position;
import com.vdc.hrservice.hr.dto.department.DepartmentDto;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.hr.dto.employee.EmployeeExtraDto;
import com.vdc.hrservice.hr.dto.employee.RequestPw;
import com.vdc.hrservice.hr.dto.employee.RequestUser;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto.BasicEmployeeDto;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto.EmployeeAccountDto;
import com.vdc.hrservice.hr.repository.auth.UserRepository;
import com.vdc.hrservice.hr.repository.department.DepartmentRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.repository.employee.PositionRepository;
import com.vdc.hrservice.hr.service.auth.UserService;
import com.vdc.hrservice.hr.utils.DateUtils;
import com.vdc.hrservice.hr.utils.StringFormatUtils;

import org.apache.poi.ss.formula.eval.ConcatEval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.xssf.usermodel.*;

@Service
public class EmployeeService {

  @Autowired
  private RestTemplateBuilder restTemplateBuilder;

  @Autowired
  private EurekaClient client;

  @Autowired
  private DepartmentRepository departmentRepo;

  @Autowired
  private EntityManagerFactory emf;

  @Autowired
  private EntityManager entityManager;

  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  private AppUserRepository appUserRepo;

  @Autowired
  private UserService userService;

  @Autowired
  private PositionRepository positionRepo;

  public List<EmployeeDto> findAllEmployee() {
    List<Employee> lstEmpl = employeeRepository.findByDelFlg(Constants.ALIVE);
    return lstEmpl.stream().map(EmployeeDto::of).collect(Collectors.toList());
  }

  public Employee saveOrUpdate(EmployeeDto empModelDto) {
    EntityManager em = emf.createEntityManager();
    em.setFlushMode(FlushModeType.COMMIT);
    EntityTransaction entityTransaction = em.getTransaction();

    Employee entity = null;

    try {
      entityTransaction.begin();
      if (empModelDto.getId() == null || empModelDto.getId() == 0) {
        entity = new Employee();
        this.transferOn(entity, empModelDto, MODE.CREATE);
        // em.persist(entity);

      } else {
        entity = em.find(Employee.class, empModelDto.getId(), LockModeType.READ);
        this.transferOn(entity, empModelDto, MODE.UPDATE);
        em.merge(entity);

      }
      entityTransaction.commit();
    } catch (Exception ex) {
      ex.printStackTrace();
      // TODO: handle exception
      if (entityTransaction.isActive()) {
        entityTransaction.rollback();
      }
      // throw new Exception("Lưu dữ liệu thất bại." +
      // HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      em.close();
    }
    return entity;

  }

  private void transferOn(Employee entity, EmployeeDto empModelDto, Constants.MODE mode) {
    if (mode == MODE.CREATE || mode == MODE.UPDATE) {
      Department department = departmentRepo.getById(empModelDto.getEmpDepartmentID());
      // EmployeePosition emplPosition =
      // employeePositionService.getEmployeePositionById(empModelDto.getEmpPosition());
      entity.setEmployeeNumb(empModelDto.getEmployeeNumb());
      entity.setFullName(empModelDto.getFullName());
      entity.setGender(empModelDto.getGender());
      entity.setBirthday(DateUtils.convertShort2Zone(empModelDto.getBirthday()));
      entity.setPhoneNumber(empModelDto.getPhoneNumber());
      entity.setEmail(empModelDto.getEmail());
      entity.setEmpDepartment(department);
      // entity.setEmpPosition(emplPosition);
      entity.setDescJob(empModelDto.getDescJob());
      entity.setEmpUrID(empModelDto.getEmpUrID());
      entity.setEmpHrID(empModelDto.getEmpHrID());

    } else if (mode == Constants.MODE.DELETE) {
      entity.setLogicDeletedAt();
    }
  }

  public Page<EmployeeDto> getListEmployeeByDelFlg(Boolean delFlg, Pageable page) {
    // System.out.println(employeeRepository.findByDelFlg(delFlg, page));
    Page<Employee> employeeList = employeeRepository.findByDelFlg(delFlg, page);
    return employeeList.map(EmployeeDto::of);
  }

  public Page<EmployeeExtraDto> getLstEmplBySearch(Pageable page, String keyTxtSearch, Long keyPosition,
      Long keyDepartment, List<String> keyGroup) throws Exception {

    StringBuilder sql = new StringBuilder();
    String varr = new String();
    sql.append(" SELECT e ");
    sql.append(" FROM " + Employee.class.getName() + " e");
    sql.append(" WHERE ");
    sql.append("  (full_name like UPPER(CONCAT('%',:keyTxtSearch,'%')) ");
    sql.append("  or employee_numb like UPPER(CONCAT('%',:keyTxtSearch,'%'))) ");
    if (keyPosition != null) {
      sql.append("  AND employee_position_id= :keyPosition");
    }
    ;

    if (keyDepartment != null) {
      sql.append("  AND department_id= :keyDepartment");
    }
    ;

    if (keyGroup.size() > 0) {

      sql.append("  AND id in(:keyGroup) ");
    }
    ;

    sql.append("  AND del_flg = 0 ");

    try {
      System.out.println(sql.toString());
      Query query = entityManager.createQuery(sql.toString(), Employee.class);
      query.setParameter("keyTxtSearch", keyTxtSearch);

      if (keyPosition != null) {
        query.setParameter("keyPosition", keyPosition);
      }
      ;

      if (keyDepartment != null) {
        query.setParameter("keyDepartment", keyDepartment);
      }
      ;

      if (keyGroup.size() > 0) {
        List<Long> varrr = new ArrayList<>();
        for (String str : keyGroup) {
          varrr.add(Long.parseLong(str));
        }
        query.setParameter("keyGroup", varrr);
      }
      ;

      List<Employee> lstEmpl = query.getResultList();
      int start = Math.min((int) page.getOffset(), lstEmpl.size());
      int end = Math.min((start + page.getPageSize()), lstEmpl.size());
      Page<Employee> pageE = new PageImpl<>(lstEmpl.subList(start, end), page, lstEmpl.size());
      return pageE.map(EmployeeExtraDto::of);
    } catch (Exception e) {
      e.printStackTrace();
      throw new Exception(e.getMessage());
    }
  }

  public Page<EmployeeAccountDto> findFilterByKeyTextSearch(String key, Pageable page) {
    // System.out.println(employeeRepository.findByDelFlg(delFlg, page));
    Page<Employee> employeeList = employeeRepository.findFilterByKeyTextSearch(key, page);
    return employeeList.map(EmployeeAccountDto::of);
  }

  public Integer deletEmployee(Long id) {
    employeeRepository.deleteEmployee(id);
    return 1;
  }

  public List<EmployeeDto> findEmpHrID(Long idDepartment, Long idPosition) {
    List<Employee> lstEmp = employeeRepository.findEmpHrID(idDepartment, idPosition);
    return lstEmp.stream().map(EmployeeDto::of).collect(Collectors.toList());
  }

  public List<EmployeeDto> findEmpHrIDall(Long idPosition) {
    List<Employee> lstEmp = employeeRepository.findEmpHrIDall(idPosition);
    return lstEmp.stream().map(EmployeeDto::of).collect(Collectors.toList());
  }

  public Employee getLastRecord() {
    String sql = "select e from " + Employee.class.getName() + " e order by e.id desc ";//

    Query query = entityManager.createQuery(sql, Employee.class);
    query.setMaxResults(1);

    Employee emp = null;

    try {
      emp = (Employee) query.getSingleResult();
    } catch (NoResultException e) {
      // TODO write log
    } catch (Exception e) {
      // TODO write log
    }

    return emp;
  }

  public EmployeeDto createNewEmployee(EmployeeDto dto, ServletRequest request) throws Exception {
    Employee employee = new Employee();
    AppUser appUser = new AppUser();

    String txtCode = StringFormatUtils
        .getEmployeeOf(getLastRecord() == null ? "E0000" : getLastRecord().getEmployeeNumb());

    if (dto.getEmpDepartmentID() != null) {
      Department department = departmentRepo.findById(dto.getEmpDepartmentID()).get();
      employee.setEmpDepartment(department);
    }

    if (dto.getEmpPositionID() != null) {
      Position position = positionRepo.findById(dto.getEmpPositionID()).get();
      employee.setEmpPosition(position);
    }

    // appUser.setUsername(dto.getPhoneNumber());
    // appUser.setPassword(dto.getPhoneNumber());
    // employee.setEmployeeNumb(dto.getEmployeeNumb());
    employee.setEmployeeNumb(txtCode);
    employee.setFullName(dto.getFullName());
    employee.setGender(dto.getGender());
    employee.setPhoneNumber(dto.getPhoneNumber());
    employee.setEmail(dto.getEmail());

    employee.setDescJob(dto.getDescJob());
    employee.setEmpWpID(dto.getEmpWpID());
    employee.setEmpUrID(dto.getEmpUrID());
    employee.setEmpHrID(dto.getEmpHrID());
    employee.setBirthday(DateUtils.convertShort2Zone(dto.getBirthday()));
    employee.setAvatarPic(dto.getAvatarPic());

    InstanceInfo instanceInfo = client.getNextServerFromEureka("auth", false);
    // we'll check later
    // String url = instanceInfo.getHomePageUrl() + "auth/api/v1/account/create";
    // String url = "http://localhost:9000/auth/api/v1/account/create";
    String url = "http://" + instanceInfo.getIPAddr() + ":" + instanceInfo.getPort() + "/auth/api/v1/account/create";

    HttpServletRequest httpRequest = (HttpServletRequest) request;
    String token = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);

    RequestUser requestUser = new RequestUser(dto.getFullName(), dto.getEmpPositionID());
    HttpEntity requestPayload = new HttpEntity(requestUser);
    RestTemplate restTemplate = restTemplateBuilder.defaultHeader(HttpHeaders.AUTHORIZATION, token).build();
    ResponseEntity response = restTemplate.exchange(url, HttpMethod.POST, requestPayload, Map.class);

    Map<String, Map<String, Object>> responseData = (Map) response.getBody();

    Map<String, Object> data = responseData.get("data");
    Long userId = Long.parseLong(String.valueOf(data.get("id")));

    AppUser user = appUserRepo.findById(userId).orElseThrow(() -> new Exception("User not exist"));
    employee.setUser(user);
    // appUser = appUserRepo.save(appUser);
    employee = employeeRepository.save(employee);
    return EmployeeDto.of(employee);
  }

  public Boolean requestChangePass(String username, RequestPw data, ServletRequest request) {
    InstanceInfo instanceInfo = client.getNextServerFromEureka("auth", false);
    String url = "http://" + instanceInfo.getIPAddr() + ":" + instanceInfo.getPort()
        + "/auth/api/v1/account/change-password/" + username;
    HttpServletRequest httpRequest = (HttpServletRequest) request;
    String token = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);
    HttpEntity requestPayload = new HttpEntity(data);
    RestTemplate restTemplate = restTemplateBuilder.defaultHeader(HttpHeaders.AUTHORIZATION, token).build();
    ResponseEntity response = restTemplate.exchange(url, HttpMethod.PUT, requestPayload, Map.class);

    if (response.getStatusCode() == HttpStatus.OK) {
      return true;
    }
    return false;
  }

  public Boolean requestChangePassword2Default(String username, ServletRequest request) {
    InstanceInfo instanceInfo = client.getNextServerFromEureka("auth", false);
    String url = "http://" + instanceInfo.getIPAddr() + ":" + instanceInfo.getPort()
        + "/auth/api/v1/account/reset-password/" + username;
    HttpServletRequest httpRequest = (HttpServletRequest) request;
    String token = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);
    HttpEntity requestPayload = null;
    RestTemplate restTemplate = restTemplateBuilder.defaultHeader(HttpHeaders.AUTHORIZATION, token).build();
    ResponseEntity response = restTemplate.exchange(url, HttpMethod.PUT, requestPayload, Map.class);

    if (response.getStatusCode() == HttpStatus.OK) {
      return true;
    }
    return false;
  }

  // public Boolean requestCreateUser(EmployeeDto data, ServletRequest request) {
  // InstanceInfo instanceInfo = client.getNextServerFromEureka("auth", false);
  // String url = instanceInfo.getHomePageUrl() + "auth/api/v1/account";
  // HttpServletRequest httpRequest = (HttpServletRequest) request;
  // String token = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);
  // HttpEntity requestPayload = new HttpEntity(data);
  // RestTemplate restTemplate =
  // restTemplateBuilder.defaultHeader(HttpHeaders.AUTHORIZATION, token).build();
  // ResponseEntity response = restTemplate.exchange(url, HttpMethod.PUT,
  // requestPayload, Map.class);

  // if (response.getStatusCode() == HttpStatus.OK) {
  // return true;
  // }
  // return false;
  // }

  // public static String usernameGenerator(String fullName) {
  // // Replace Normalized
  // String nfdNormalizedString = Normalizer.normalize(fullName,
  // Normalizer.Form.NFD);
  // Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
  // String normalized =
  // pattern.matcher(nfdNormalizedString).replaceAll("").replaceAll("đ",
  // "d").replaceAll("Đ", "D");

  // String words[] = normalized.trim().replaceAll("[^a-zA-Z ]+",
  // Constant.EMPLTY_STRING).trim().replaceAll(Constant.TWO_SPACES,
  // Constant.SPACE)
  // .split(Constant.SPACE);
  // StringBuilder username = new StringBuilder(words[words.length - 1]);

  // for (int i = 0; i < words.length; i++) {
  // if (i < words.length - 1) {
  // username.append(words[i].substring(0, 1));
  // }
  // }

  // return username.toString().toLowerCase();
  // }

  public List<EmployeeAccountDto> findEmployeeWithKey(String key) {
    List<Employee> employees = employeeRepository
        .findFirst15ByFullNameContainingIgnoreCaseAndDelFlgIsFalseOrEmployeeNumbContainingIgnoreCaseAndDelFlgIsFalse(
            key, key);
    return employees.stream().map(EmployeeAccountDto::of).collect(Collectors.toList());
  }

  public List<EmployeeAccountDto> findEmployeeWithKeyv1(String key) {
    List<Employee> employees = employeeRepository
        .findAllByFullNameContainingIgnoreCaseAndDelFlgIsFalseOrEmployeeNumbContainingIgnoreCaseAndDelFlgIsFalse(
            key, key);
    return employees.stream().map(EmployeeAccountDto::of).collect(Collectors.toList());
  }

  public EmployeeDto getCurrentEmployee() throws Exception {
    Optional<AppUserDto> user = userService.getCurrentLogginUser();
    EmployeeDto dto = user.get().getEmployee();
    return dto;
  }

  public EmployeeExtraDto updateEmployeev1(EmployeeExtraDto dto) {
    Employee emplo = employeeRepository.getById(dto.getId());
    if (dto.getEmpDepartmentID() != null) {
      Department department = departmentRepo.findById(dto.getEmpDepartmentID()).get();
      emplo.setEmpDepartment(department);
    } else {
      emplo.setEmpDepartment(null);
    }

    if (dto.getEmpPositionID() != null) {
      Position empPosition = positionRepo.findById(dto.getEmpPositionID()).get();
      emplo.setEmpPosition(empPosition);
    } else {
      emplo.setEmpPosition(null);
    }

    emplo.setEmployeeNumb(dto.getEmployeeNumb());
    emplo.setFullName(dto.getFullName());
    emplo.setGender(dto.getGender());
    emplo.setPhoneNumber(dto.getPhoneNumber());
    emplo.setEmail(dto.getEmail());
    emplo.setDescJob(dto.getDescJob());
    emplo.setEmpUrID(dto.getEmpUrID());
    emplo.setEmpHrID(dto.getEmpHrID());
    emplo.setEmployeeNumb(dto.getEmployeeNumb());
    emplo.setBirthday(DateUtils.convertShort2Zone(dto.getBirthday()));
    // extra in4
    emplo.setNumbID(dto.getNumbID());
    emplo.setIdReleaseDate(DateUtils.convertShort2Zone(dto.getIdReleaseDate()));
    emplo.setIdReleasePlace(dto.getIdReleasePlace());
    emplo.setTaxCode(dto.getTaxCode());
    emplo.setIdPlace(dto.getIdPlace());
    emplo.setCurretPlace(dto.getCurretPlace());
    emplo.setHomeMobile(dto.getHomeMobile());
    emplo.setBirthPlace(dto.getBirthPlace());
    emplo.setReligion(dto.getReligion());
    emplo.setCountry(dto.getCountry());
    emplo.setMaritalStatus(dto.getMaritalStatus());
    emplo.setSocialInsuranceId(dto.getSocialInsuranceId());
    emplo.setBankAccount(dto.getBankAccount());
    emplo.setAvatarPic(dto.getAvatarPic());
    emplo.setHomeMobile(dto.getHomeMobile());
    emplo.setEmpWpID(dto.getEmpWP());

    Employee saveEmployee = employeeRepository.save(emplo);
    EmployeeExtraDto empXtraResp = EmployeeExtraDto.of(saveEmployee);
    return empXtraResp;
  }

  // tiennm add findEmployeeById
  public EmployeeDto findEmployeeById(Long employeeId, Boolean delFlg) {
    Employee employee = employeeRepository.findByIdAndDelFlg(employeeId, delFlg).get();
    EmployeeDto dto = EmployeeDto.of(employee);
    return dto;
  }

  // tiennm convert entity to dto
  public EmployeeDto convertDto(Employee entity) {
    EmployeeDto emplDto = new EmployeeDto();
    emplDto.setId(entity.getId());
    if (entity.getEmpDepartment() != null) {
      emplDto.setEmpDepartmentID(entity.getEmpDepartment().getId());
    }
    if (entity.getEmpPosition() != null) {
      emplDto.setEmpPositionID(entity.getEmpPosition().getId());
      emplDto.setEmpPositionName(entity.getEmpPosition().getName());
    }
    emplDto.setEmployeeNumb(entity.getEmployeeNumb());
    emplDto.setFullName(entity.getFullName());
    emplDto.setGender(entity.getGender());
    emplDto.setPhoneNumber(entity.getPhoneNumber());
    emplDto.setEmail(entity.getEmail());
    emplDto.setEmpUrID(entity.getEmpHrID());
    emplDto.setEmpHrID(entity.getEmpHrID());
    emplDto.setDescJob(entity.getDescJob());
    emplDto.setBirthday(DateUtils.format(entity.getBirthday(), "dd/MM/YYYY"));
    emplDto.setAvatarPic(entity.getAvatarPic());
    return emplDto;

  }

  public EmployeeExtraDto.EmployeeDto getById(Long id) {
    Employee employee = employeeRepository.findByIdAndDelFlg(id, false).get();
    return EmployeeExtraDto.EmployeeDto.of(employee);
  }

  // public Byte[] store(Long id, MultipartFile file) throws IOException {

  // return null;
  // }

  // public EmployeeExtraDto UpdateEmployee(EmployeeExtraDto dto){
  // Department department =
  // departmentRepo.findById(dto.getEmpDepartmentID()).get();
  // Employee employee = employeeRepository.getById(dto.getId());
  // employee.setEmployeeNumb(dto.getEmployeeNumb());
  // employee.setFullName(dto.getFullName());
  // employee.setGender(dto.getGender());
  // employee.setPhoneNumber(dto.getPhoneNumber());
  // employee.setEmail(dto.getEmail());
  // employee.setEmpDepartment(department);
  // employee.setDescJob(dto.getDescJob());
  // employee.setEmpUrID(dto.getEmpUrID());
  // employee.setEmpHrID(dto.getEmpHrID());
  // employee.setEmployeeNumb(dto.getEmployeeNumb());
  // employee.setBirthday(DateUtils.convertShort2Zone(dto.getBirthday()));
  // //extra in4
  // employee.setNumbID(dto.getNumbID());
  // employee.setIdReleaseDate(DateUtils.convertShort2Zone(dto.getIdReleaseDate()));
  // employee.setIdReleasePlace(dto.getIdReleasePlace());
  // employee.setTaxCode(dto.getTaxCode());
  // employee.setIdPlace(dto.getIdPlace());
  // employee.setCurretPlace(dto.getCurretPlace());
  // employee.setHomeMobile(dto.getHomeMobile());
  // employee.setBirthPlace(dto.getBirthPlace());
  // employee.setReligion(dto.getReligion());
  // employee.setCountry(dto.getCountry());
  // employee.setMaritalStatus(dto.getMaritalStatus());
  // employee.setSocialInsuranceId(dto.getSocialInsuranceId());
  // employee.setBankAccount(dto.getBankAccount());

  // employee = employeeRepository.save(employee);
  // // EmployeeDto employeeDto= EmployeeDto.of(saveEmployee);
  // // employeeDto.setBirthday(DateUtils.format(saveEmployee.getBirthday(),
  // "dd/MM/yyyy"));
  // return EmployeeExtraDto.of(employee);
  // }

  public Integer importEmployeeExcel(MultipartFile files) throws IOException {
    List<Employee> employeeList = new ArrayList<>();

    XSSFWorkbook workbook = new XSSFWorkbook(files.getInputStream());
    XSSFSheet worksheet = workbook.getSheetAt(0);
    workbook.close();

    for (int index = 1; index < worksheet.getPhysicalNumberOfRows(); index++) {
      Employee employee = new Employee();
      XSSFRow row = worksheet.getRow(index);

      employee.setEmployeeNumb(row.getCell(0).getStringCellValue());
      employee.setFullName(row.getCell(1).getStringCellValue());
      employee.setPhoneNumber(row.getCell(2).getStringCellValue());
      employee.setEmail(row.getCell(3).getStringCellValue());

      employeeList.add(employee);
      employeeRepository.save(employee);
    }
    return employeeList.size();
  }

  public List<EmployeeDto> getEmployeesByDepartment(Long departmentId) {
    List<Employee> employees = employeeRepository.getEmployeeByDepartment(departmentId);
    return employees.stream().map(EmployeeDto::of).collect(Collectors.toList());
  }

  public EmployeeAccountDto getEmployeeWithRole(Long id) throws Exception {

    Employee emp = employeeRepository.findById(id).orElseThrow(()-> new Exception("User not found"));
    return EmployeeAccountDto.of(emp);
  }

  public List<BasicEmployeeDto> setDepartmentForEmployee(List<BasicEmployeeDto> employees, Long departmentId) {
    Department department = departmentRepo.getById(departmentId);
    for (BasicEmployeeDto basicEmployeeDto : employees) {
      Employee employee = employeeRepository.getById(basicEmployeeDto.getId());
      employee.setEmpDepartment(department);
      employeeRepository.save(employee);
    }
    return employees;
  }

  public BasicEmployeeDto deleteDepartmentForEmployee(Long employeeId) {
    Employee employee = employeeRepository.getById(employeeId);
    employee.setEmpDepartment(null);
    employeeRepository.save(employee);
    return BasicEmployeeDto.of(employee);
  }

}