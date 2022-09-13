package com.vdc.hrservice.common;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.vdc.hrservice.office.domain.AttachFile;
import com.vdc.hrservice.office.dto.AttachFileDto.AttachFileDetailDto;
import com.vdc.hrservice.office.service.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/api/common")
public class CommonController {

    @Autowired
    private FileService fileService;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @PostMapping("/files/{subDir}")
    public ResponseEntity<?> uploadFile(@RequestParam(name = "file") MultipartFile file, @PathVariable String subDir) {
        try {
            String fileName = fileService.saveLocalFile(file, subDir, System.currentTimeMillis());
            String fileDownloadUri = contextPath + "/api/common/files/" + subDir + "/" + fileName;

            AttachFileDetailDto dto = fileService.saveFileDto(fileDownloadUri, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(new HttpResponse<>(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

    @CrossOrigin
    @GetMapping("/files/{subDir}/{fileName:.+}")
    public ResponseEntity<?> downloadFile(@PathVariable String fileName, @PathVariable String subDir,
            HttpServletRequest request) {
        String uri = request.getRequestURI();
        Resource resource;
        try {
            resource = fileService.loadFileAsResource(fileName, subDir);
            if (resource.exists()) {
                String contentType = null;
                contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                String filename = resource.getFilename();
                Optional<AttachFile> fileOpt = fileService.getFile(uri);
                if (fileOpt.isPresent()) {
                    filename = fileOpt.get().getOriginalName();
                }

                return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    
}
