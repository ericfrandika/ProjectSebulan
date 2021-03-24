package com.example.demo.service;

import com.example.demo.model.Backup;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BackUpService {
    void BackUpDataService();
    List<Backup> findAllBackUpService();
    void downloadDatabaseService();
    void saveRestoreService(MultipartFile file) throws Exception;
    void RestoreSQlService();
    void DeletedDatabaseService() throws Exception;
    void CreatedDatabaseService() throws Exception;
}
