package com.vdc.hrservice.hr.service.target;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.target.LinkTarget;
import com.vdc.hrservice.hr.dto.targetDto.LinkTargetDto;
import com.vdc.hrservice.hr.repository.target.LinkTargetRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LinkTargetService {
    @Autowired
    private LinkTargetRepository linkTargetRepository;

    public LinkTarget createLinkTarget(LinkTarget entity) {
		LinkTarget linkTarget = new LinkTarget();
		linkTarget.setRootTargetId(entity.getRootTargetId());
		linkTarget.setLinkTargetId(entity.getLinkTargetId());
		linkTarget.setDelFlg(Constants.ALIVE);
        LinkTarget saveLinkTarget = linkTargetRepository.save(linkTarget);
		return saveLinkTarget;
	}
    
    public List<LinkTargetDto> findLinkTargetByRootTargetId(Long rootTargetId, Boolean delFlg){
    	List<LinkTarget> lstLinkTarget = linkTargetRepository.findByRootTargetIdAndDelFlg(rootTargetId, delFlg);
    	return lstLinkTarget.stream().map(LinkTargetDto::of).collect(Collectors.toList());
    }
}
