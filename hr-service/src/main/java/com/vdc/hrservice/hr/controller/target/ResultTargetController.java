package com.vdc.hrservice.hr.controller.target;

import java.util.List;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.target.ResultTarget;
import com.vdc.hrservice.hr.domain.target.Target;
import com.vdc.hrservice.hr.repository.target.ResultTargetRepository;
import com.vdc.hrservice.hr.service.target.ResultTargetService;
import com.vdc.hrservice.hr.service.target.TargetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/resultTarget")
public class ResultTargetController {
    @Autowired
    private ResultTargetService resultTargetService;

    @Autowired
    private ResultTargetRepository resultTargetRepo;

    @Autowired
    private TargetService targetService;

    @GetMapping("/totalCurrent/{departmentId}")
    public ResponseEntity<?> getTotalResultTargetByDepartmentIdAndCurrentMonthYear(@PathVariable("departmentId") Long departmentId){
        try {
            String year = DateUtils.getStrCurrentYear();
            List<Target> lstTarget = targetService.findTargetByDepartmentIdAndParrentAndYearAndDelFlg(departmentId,null,year, Constants.ALIVE);
			String currentMonthYear = DateUtils.getStrCurrentMonthYear();
			double total = 0;
            for (Target target : lstTarget) {
				List<ResultTarget> lstResult = target.getResultTargetList();
				ResultTarget result = new ResultTarget();
				result.setMonthYear(currentMonthYear);
				if (lstResult.contains(result)) {
					total+=lstResult.get(lstResult.indexOf(result)).getResult();					
					
				}else {
					result.setResult(target.getProgress());					
					resultTargetRepo.save(result);
					lstResult.add(result);
					total+=lstResult.get(lstResult.indexOf(result)).getResult();
				}
				
			}
			double resultTotal = total/lstTarget.size();
			double percentResult = Math.round(resultTotal);
			return new ResponseEntity<>(percentResult , HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/total/{departmentId}")
    public ResponseEntity<?> getTotalRersultTargetByDepartmentIdAndMonthYear(@PathVariable("departmentId") Long departmentId , @RequestParam("monthYear") String monthYear){
        try {
            String year = DateUtils.getStrCurrentYear();
            List<Target> lstTarget = targetService.findTargetByDepartmentIdAndParrentAndYearAndDelFlg(departmentId,null,year, Constants.ALIVE);
            double total = 0;
			for (Target target : lstTarget) {
				List<ResultTarget> lstResult = target.getResultTargetList();
				ResultTarget result = new ResultTarget();
				result.setMonthYear(monthYear);
				if (lstResult.contains(result)) {
					total+=lstResult.get(lstResult.indexOf(result)).getResult();					
					
				}else {
					return new ResponseEntity<String>("Update result month" + monthYear,HttpStatus.NOT_ACCEPTABLE);
				}
				
			}
			double resultTotal = total/lstTarget.size();
			double percentResult = Math.round(resultTotal);
			return new ResponseEntity<>(percentResult , HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
