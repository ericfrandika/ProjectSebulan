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
    public void BackUpDataService() throws Exception {
        synchronized (this) {
            backUpRepository.BackUpDataRepository();        }
    }

    @Override
    public List<Backup> findAllBackUpService() {
        List<Backup>backupList =backUpRepository.findAllBackUpRepository();
        return backupList;
    }

    @Override
    public void downloadDatabaseService()throws Exception {
            backUpRepository.downloadDatabaseRepository();
    }

    @Override
    public void saveRestoreService(MultipartFile file) throws Exception {

            backUpRepository.saveRestoreRepository(file);

    }

    @Override
    public void RestoreSQlService()throws Exception {

         backUpRepository.RestoreSQlRepository();

    }

}
