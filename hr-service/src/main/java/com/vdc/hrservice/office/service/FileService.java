package com.vdc.hrservice.office.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.vdc.hrservice.config.FileConfig;
import com.vdc.hrservice.office.domain.AttachFile;
import com.vdc.hrservice.office.dto.AttachFileDto.AttachFileDetailDto;
import com.vdc.hrservice.office.repository.AttachFileRepository;


@Service
public class FileService {

    private String mainDir = "file_blog";
    private AttachFileRepository fileRepository;
    private final Path fileLocation;

    @Autowired
    public FileService(FileConfig fileConfig, AttachFileRepository repository) {
        this.fileLocation = Paths.get(fileConfig.getLocation()).toAbsolutePath().normalize();
        this.fileRepository = repository;
    }

    @Transactional(rollbackFor = Exception.class)
    public AttachFileDetailDto saveFileDto(String downloadUri, MultipartFile files) {
        String fileName = files.getOriginalFilename();

        if (fileName.contains("/") || fileName.contains("\\"))
            fileName = cleanFilename(fileName);

        AttachFile attachFile = AttachFile.builder().downloadUri(downloadUri).originalName(fileName)
                .fileSize(files.getSize()).type(files.getContentType()).build();

        attachFile = fileRepository.save(attachFile);
        return AttachFileDetailDto.of(attachFile);
    }

    public Optional<AttachFile> getFile(String uri) {
        return fileRepository.findByDownloadUriAndDelFlgIsFalse(uri);
    }

    public String saveLocalFile(MultipartFile files, String subDir, Long requestSrl) throws FileUploadException {
        String fileName = StringUtils.cleanPath(files.getOriginalFilename());

        try {
            Path subFileLocation = Paths.get(String.format("%s/%s/%s", this.fileLocation.toString(), mainDir, subDir))
                    .toAbsolutePath().normalize();
            Files.createDirectories(subFileLocation);

            // check filename
            if (fileName.contains(".."))
                throw new Exception("Filename is invalid: " + fileName);

            String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
            String newFileName = subDir + "_" + requestSrl + "_" + System.currentTimeMillis() + "." + fileExt;

            Path targetLocation = subFileLocation.resolve(newFileName);
            Files.copy(files.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return newFileName;

        } catch (Exception e) {
            throw new FileUploadException("[" + fileName + "] upload error", e);
        }
    }

    public void deleteFile(AttachFile file) throws IOException {

        deleteLocalFile(file.getDownloadUri());
        fileRepository.delete(file);
    }

    public void deleteLocalFile(String fileUri) throws IOException {
        Resource resource = getResource(fileUri);
        if (resource.exists()) {
            try {
                Files.delete(resource.getFile().toPath());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public Resource loadFileAsResource(String fileName, String subDir) throws IOException {
        Path subFileLocation = Paths.get(String.format("%s/%s/%s", this.fileLocation.toString(), mainDir, subDir));
        Path filePath = subFileLocation.resolve(fileName).normalize();
        return new UrlResource(filePath.toUri());
    }

    public Resource getResource(String filePath) throws IOException {
        String[] paths = filePath.split("/");
        String fileName = paths[paths.length - 1];
        String subDir = paths[paths.length - 2];

        return loadFileAsResource(fileName, subDir);
    }

    private String cleanFilename(String fileName) {
        final String regex = ".*[\\\\/](.+)";
        final Pattern pattern = Pattern.compile(regex);
        final Matcher matcher = pattern.matcher(fileName);

        if (matcher.matches())
            return matcher.group(1);

        return fileName;
    }
}
 