package com.example.demo.service;

import com.example.demo.model.Backup;
import com.example.demo.model.Customer;
import com.example.demo.repository.BackUpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.SynchronousQueue;

@Service("BackUpService")

public class BackUpServiceImpl implements BackUpService {
    @Autowired
    BackUpRepository backUpRepository;

    @Override
    public void BackUpDataService() {
        synchronized (this) {
            backUpRepository.BackUpDataRepository();        }
    }

    @Override
    public List<Backup> findAllBackUpService() {
        List<Backup>backupList =backUpRepository.findAllBackUpRepository();
        return backupList;
    }

    @Override
    public void downloadDatabaseService() {
        synchronized (this){
            backUpRepository.downloadDatabaseRepository();
        }
    }

    @Override
    public void saveRestoreService(MultipartFile file) throws Exception {
        synchronized (this){
            backUpRepository.saveRestoreRepository(file);
        }
    }

    @Override
    public void RestoreSQlService() {
        synchronized (this){
        backUpRepository.RestoreSQlRepository();
        }
    }

    @Override
    public void DeletedDatabaseService() throws Exception {
        synchronized (this){
            backUpRepository.DeletedDatabaseRepository();

        }
    }

    @Override
    public void CreatedDatabaseService() throws Exception {
        synchronized (this){
            backUpRepository.CreatedDatabaseRepository();
        }
    }


}
