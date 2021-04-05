package com.example.demo.service;

import com.example.demo.model.Backup;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BackUpService {
    void BackUpDataService() throws Exception;
    List<Backup> findAllBackUpService();
    void downloadDatabaseService()throws Exception;
    void saveRestoreService(MultipartFile file) throws Exception;
    void RestoreSQlService()throws Exception;

}
