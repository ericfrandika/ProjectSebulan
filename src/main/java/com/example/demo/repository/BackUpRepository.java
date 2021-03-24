package com.example.demo.repository;

import com.example.demo.model.Backup;
import com.example.demo.model.Customer;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BackUpRepository {

    void BackUpDataRepository();
    List<Backup> findAllBackUpRepository();
    void downloadDatabaseRepository();
    void saveRestoreRepository(MultipartFile file) throws Exception;
    void RestoreSQlRepository();
    void DeletedDatabaseRepository() throws Exception;
    void CreatedDatabaseRepository() throws Exception;

}
