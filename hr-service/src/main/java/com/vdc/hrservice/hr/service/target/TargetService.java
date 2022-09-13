package com.vdc.hrservice.hr.service.target;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.FlushModeType;
import javax.persistence.LockModeType;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.config.Constants.MODE;
import com.vdc.hrservice.hr.domain.department.Department;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeAuthorization;
import com.vdc.hrservice.hr.domain.jobLabel.GroupJobLabel;
import com.vdc.hrservice.hr.domain.target.LinkTarget;
import com.vdc.hrservice.hr.domain.target.ResultTarget;
import com.vdc.hrservice.hr.domain.target.Target;
import com.vdc.hrservice.hr.domain.target.TargetLibrary;
import com.vdc.hrservice.hr.dto.employee.EmployeeAuthorizationDto;
import com.vdc.hrservice.hr.dto.targetDto.LinkTargetDto;
import com.vdc.hrservice.hr.dto.targetDto.TargetDto;
import com.vdc.hrservice.hr.exception.ResponseStatusHttps;
import com.vdc.hrservice.hr.repository.department.DepartmentRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.repository.jobLabel.GroupJobLabelRepository;
import com.vdc.hrservice.hr.repository.target.TargetLibraryRepository;
import com.vdc.hrservice.hr.repository.target.TargetRepository;
import com.vdc.hrservice.hr.service.employee.EmployeeAuthorizationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class TargetService {

    @Autowired
	private EntityManagerFactory emf;

    @Autowired
    private TargetRepository targetRepo;

    @Autowired 
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired 
    private TargetLibraryRepository targetLibraryRepository;

    @Autowired 
    private GroupJobLabelRepository groupJobLabelRepository;

    @Autowired
    private LinkTargetService linkTargetService;

    @Autowired
    private ResultTargetService resultTargetService;

    @Autowired
    private EmployeeAuthorizationService employeeAuthorizationService;

    public List<TargetDto> findTargetByDepartmentId(Long departmentId , Long parrent,  String year , Boolean delFLg){
        List<Target> lstTarget = targetRepo.findByDepartmentIdAndParrentAndYearAndDelFlgOrderByFinishDayAsc(departmentId,parrent, year, delFLg);
        List<TargetDto> lstTargetDto = new ArrayList<TargetDto>();
        for (Target target : lstTarget) {
			TargetDto dto = convertDto(target);
			lstTargetDto.add(dto);
		}
        return lstTargetDto;
    } 

	public List<TargetDto> findTargetByEmployeeId(Long employeeId, Long parrent, String year, Boolean delFlg){
		List<Target> lstTarget = targetRepo.findByEmployeeIdAndParrentAndYearAndDelFlg(employeeId,parrent, year, delFlg);
		List<TargetDto> lstTargetDto = new ArrayList<TargetDto>();
        for (Target target : lstTarget) {
			TargetDto dto = convertDto(target);
			lstTargetDto.add(dto);
		}
        return lstTargetDto;
	}

	public TargetDto findTargetById(Long targetId, Boolean delFlg){
		Target target = targetRepo.findByIdAndDelFlg(targetId, delFlg).get();
		TargetDto dto = convertDto(target);
		return dto;
	}

	public List<TargetDto> findBySubTarget(Long parrent ,String year, Boolean delFlg){
		List<Target> lstTarget = targetRepo.findByParrentAndYearAndDelFlg(parrent,year, delFlg);
		List<TargetDto> lstTargetDto = new ArrayList<TargetDto>();
		for (Target target : lstTarget) {
			TargetDto dto = convertDto(target);
			lstTargetDto.add(dto);
		}
        return lstTargetDto;
	}

    public Target saveOrUpdate(TargetDto dto ) throws ResponseStatusHttps{
		EntityManager em = emf.createEntityManager();
		em.setFlushMode(FlushModeType.COMMIT);
		EntityTransaction entityTransaction = em.getTransaction();
		Target entity = null;

		try {
			entityTransaction.begin();
			if(dto.getId() == null || dto.getId() == 0) {
				entity = new Target();
				this.transferOn(entity, dto, MODE.CREATE);

				em.persist(entity);
				afterSave(entity,dto ,Constants.MODE.CREATE,em);
			}else {
				entity = em.find(Target.class, dto.getId(), LockModeType.READ);
				this.transferOn(entity, dto, MODE.UPDATE);
				em.merge(entity);
				afterSave(entity,dto ,Constants.MODE.UPDATE,em);
			}
			entityTransaction.commit();
		} catch (Exception ex) {
			// TODO: handle exception
			ex.printStackTrace();
			if (entityTransaction.isActive()) {
				entityTransaction.rollback();
			}
			throw new ResponseStatusHttps("Lưu dữ liệu thất bại.", HttpStatus.INTERNAL_SERVER_ERROR);
		}finally {
			em.close();
		}
		return entity;
	}

    private void transferOn(Target entity, TargetDto model, MODE mode) {
        if (mode == Constants.MODE.CREATE ) {
            entity.setParrent(model.getParrent());
 			if (model.getParrent() != null) {
				addSubTarget(entity,model);
 				
			}else {
                createNewTarget(entity,model);
             }
        }
    }

	private void addSubTarget(Target entity, TargetDto model){
		Target rootTarget = targetRepo.findByIdAndDelFlg(model.getParrent(), Constants.ALIVE).get();
		entity.setTargetName(model.getTargetName());
		entity.setWeight(model.getWeight());
		entity.setTargetDescription(model.getTargetDescription());
		entity.setStartDay(DateUtils.convertShort2Zone(model.getStartDay()));
		entity.setFinishDay(DateUtils.convertShort2Zone(model.getFinishDay()));
		if (model.getProgress() == null) {
			entity.setProgress(0.0);
		}else {
			entity.setProgress(model.getProgress());
		}
		entity.setParrent(model.getParrent());
		entity.setGroupJobLabel(rootTarget.getGroupJobLabel());
		entity.setTargetGroup(rootTarget.getTargetGroup());
		entity.setTargetTypes(rootTarget.getTargetTypes());
		entity.setDepartment(rootTarget.getDepartment());
		entity.setEmployee(rootTarget.getEmployee());
		entity.setTargetLibrary(rootTarget.getTargetLibrary());
		entity.setStatus(Constants.TARGET_STATUS.UNFINISHED);
		entity.setMethod(rootTarget.getMethod());
		entity.setLevel(rootTarget.getLevel() + 1);
		entity.setShareLevel(rootTarget.getShareLevel());
		entity.setYear(DateUtils.getStrCurrentYear());
		entity.setHasChild(Boolean.FALSE);
		entity.setTotalFeedBack(0);
		entity.setTotalJobComplete(0);
		entity.setTotalJobs(0);
		entity.setTotalSubTarget(0);
		entity.setTotalSubTargetComplete(0);
		entity.setDelFlg(Constants.ALIVE);
		entity.setHasChild(Boolean.FALSE);
		entity.setCalculation(rootTarget.getCalculation());
	}

	private void createNewTarget(Target entity, TargetDto model){
		if(model.getTargetLibraryId() != null){
			TargetLibrary targetLibrary = targetLibraryRepository.findByIdAndDelFlg(model.getTargetLibraryId(), Constants.ALIVE).orElseThrow(() -> new IllegalArgumentException("can not found id:" + model.getTargetLibraryId()));
			entity.setTargetLibrary(targetLibrary);
		}
		if(model.getDepartmentId() != null){
			Department department = departmentRepository.findById(model.getDepartmentId()).orElseThrow(() -> new IllegalArgumentException("can not found id:" + model.getDepartmentId()));
			entity.setDepartment(department);
		}
		if(model.getEmployeeId() != null){
			Employee employee = employeeRepository.findByIdAndDelFlg(model.getEmployeeId(), Constants.ALIVE).orElseThrow(() -> new IllegalArgumentException("can not found id:" + model.getEmployeeId()));
			entity.setEmployee(employee);
		}
		if(model.getGroupJobLabelId() != null){
			GroupJobLabel groupJobLabel = groupJobLabelRepository.findByIdAndDelFlg(model.getGroupJobLabelId(), Constants.ALIVE).orElseThrow(() -> new IllegalArgumentException("can not found id:" + model.getGroupJobLabelId()));
			entity.setGroupJobLabel(groupJobLabel);
		}
		
		entity.setWeight(model.getWeight());
		entity.setTargetGroup(model.getTargetGroup());
		entity.setShareLevel(model.getShareLevel());
		entity.setTargetDescription(model.getTargetDescription());
		entity.setTargetName(model.getTargetName());
		entity.setTargetTypes(model.getTargetTypes());
		entity.setProgress(0.0);		
	    entity.setStatus(Constants.TARGET_STATUS.UNFINISHED);							
		entity.setMethod(model.getMethod());
		entity.setStartDay(DateUtils.convertShort2Zone(model.getStartDay()));
		entity.setFinishDay(DateUtils.convertShort2Zone(model.getFinishDay()));
				
		entity.setYear(DateUtils.getStrCurrentYear());
		entity.setHasChild(Boolean.FALSE);
		
		entity.setTotalFeedBack(0);
		entity.setTotalJobComplete(0);
		entity.setTotalJobs(0);
		entity.setTotalSubTarget(0);
		entity.setTotalSubTargetComplete(0);
		entity.setDelFlg(Constants.DELFLG_ZERO);
		entity.setCalculation(Constants.TARGET_CALCULATION.AUTO);
		entity.setLevel(0);
	}

    private void afterSave(Target entity, TargetDto model , Constants.MODE mode ,EntityManager em)throws Exception{
        switch (mode) {
            case CREATE:{
                List<LinkTargetDto> lstLinkTargetDto= model.getLstLinkTargetDto();
                if (!lstLinkTargetDto.isEmpty()) {
                     List<LinkTarget> lstLinkTarget = lstLinkTargetDto.stream().map(LinkTarget::of).collect(Collectors.toList());
                     int sizeLink = lstLinkTarget.size(); 
                     for (int i = 0; i < sizeLink; i++) {
                        LinkTarget linkTarget = linkTargetService.createLinkTarget(lstLinkTarget.get(i));
                        em.persist(linkTarget);
                    }   
                }		
                ResultTarget resultTarget = resultTargetService.createResultTarget(entity);
                em.persist(resultTarget);
                if(entity.getEmployee() != null) {
                    EmployeeAuthorization emplAuth = employeeAuthorizationService.createMainEmployeeAuthorization(entity);
                    em.persist(emplAuth);                  
                }
				if(entity.getParrent() == null){
					List<EmployeeAuthorizationDto> lstEmpl = model.getLstEmployeeAuthorizationDto();
                    int size = lstEmpl.size();
                    for (int index = 0; index < size; index++) {				
                        EmployeeAuthorization newEmpl = employeeAuthorizationService.createEmployeeAuthorization(lstEmpl.get(index) , entity);
                        em.persist(newEmpl);
                    }
					break;
				} else{
                    Target rootTarget = targetRepo.findByIdAndDelFlg(model.getParrent(), Constants.ALIVE).get();
                    Integer total = rootTarget.getTotalSubTarget();
                    rootTarget.setTotalSubTarget(total + 1);
                    rootTarget.setHasChild(Boolean.TRUE);
                    targetRepo.save(rootTarget);
                    List<EmployeeAuthorization> lstEmplAuth = employeeAuthorizationService.findEmployeeAuthorizationByTargetIdAndDelflg(rootTarget.getId(), Constants.ALIVE);
                    List<EmployeeAuthorization> lstNewEmplAuth = lstEmplAuth.stream()
                                                                            .filter((e) -> e.getRoleWriteTarget() == true)
                                                                            .collect(Collectors.toList());
                    int size = lstNewEmplAuth.size();
                    for (int i = 0; i < size; i++) {
                        EmployeeAuthorization newEmplAuth = employeeAuthorizationService.cloneEmployeeAuthorization(lstNewEmplAuth.get(i), entity);
                        em.persist(newEmplAuth);				
                    }
                    break;
                }                              
            }
            
            default:
                break;
        }  
    
    }
    
    public TargetDto convertDto(Target target) {
    	TargetDto dto = new TargetDto();
    	 List<EmployeeAuthorization> lstEmplAuth = employeeAuthorizationService.findEmployeeAuthorizationByTargetIdAndDelflg(target.getId(), Constants.ALIVE);
    	 List<EmployeeAuthorizationDto> lstEmplAuthDto = lstEmplAuth.stream().map(EmployeeAuthorizationDto::of).collect(Collectors.toList());
    	 List<LinkTargetDto> lstLinkTarget = linkTargetService.findLinkTargetByRootTargetId(target.getId(), Constants.ALIVE);
    	 dto.setId(target.getId());
    	dto.setTargetName(target.getTargetName());
    	dto.setTargetDescription(target.getTargetDescription());
    	dto.setWeight(target.getWeight());
    	dto.setShareLevel(target.getShareLevel());
    	dto.setTargetTypes(target.getTargetTypes());
    	dto.setTargetGroup(target.getTargetGroup());
    	dto.setStartDay(DateUtils.format(target.getStartDay(), "dd/MM/yyyy"));
    	dto.setFinishDay(DateUtils.format(target.getFinishDay(), "dd/MM/yyyy"));
    	dto.setParrent(target.getParrent());
    	dto.setProgress(target.getProgress());
    	dto.setCalculation(target.getCalculation());
    	if(target.getDepartment() != null) {
    		dto.setDepartmentId(target.getDepartment().getId());
    	}
    	
    	if(target.getEmployee() != null) {
    		dto.setEmployeeId(target.getEmployee().getId());
    	}
    	
    	if(target.getGroupJobLabel() != null) {
    		dto.setGroupJobLabelId(target.getGroupJobLabel().getId());
    	}   
    	
    	if(target.getTargetLibrary() != null) {
    		dto.setTargetLibraryId(target.getTargetLibrary().getId());
    	}
    	
    	dto.setMethod(target.getMethod());
    	dto.setStatus(target.getStatus());
		dto.setParrent(target.getParrent());
		dto.setHasChild(target.getHasChild());
		if(target.getHasChild() == Boolean.TRUE){			
			List<TargetDto> targetChild = getChild(target.getId());
			dto.setTargetChild(targetChild);
		}		
		dto.setHasChild(target.getHasChild());
    	
    	dto.setTotalFeedBack(target.getTotalFeedBack());
    	dto.setTotalJobComplete(target.getTotalJobComplete());
    	dto.setTotalJobs(target.getTotalJobs());
    	dto.setTotalSubTarget(target.getTotalSubTarget());
    	dto.setTotalSubTargetComplete(target.getTotalSubTargetComplete());
    	dto.setLstEmployeeAuthorizationDto(lstEmplAuthDto);
    	dto.setLstLinkTargetDto(lstLinkTarget);
    	return dto;
    }

	public List<TargetDto> getChild(Long id){
		List<Target> lstTarget = targetRepo.findByParrentAndYearAndDelFlg(id,DateUtils.getStrCurrentYear(), Constants.ALIVE);
		List<TargetDto> lstTargetDto = new ArrayList<TargetDto>();
        for (Target target : lstTarget) {
			TargetDto dto = convertDto(target);
			lstTargetDto.add(dto);
		}
        return lstTargetDto;
	}

	public List<Target> findTargetByDepartmentIdAndParrentAndYearAndDelFlg(Long departmentId,Long parrent,String year , Boolean delFlg){
		List<Target> lstTarget = targetRepo.findByDepartmentIdAndParrentAndYearAndDelFlgOrderByFinishDayAsc(departmentId, parrent, year, delFlg);
        return lstTarget;
	}

	
}

