package com.example.demo.repository;

import com.example.demo.model.Backup;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BackUpRepository {

    void BackUpDataRepository() throws Exception;
    List<Backup> findAllBackUpRepository();
    void downloadDatabaseRepository()throws Exception;
    void saveRestoreRepository(MultipartFile file) throws Exception;
    void RestoreSQlRepository() throws Exception;
}
