package com.example.demo.service;

import com.example.demo.model.Distributor;
import com.example.demo.repository.DistributorRepository;
import com.example.demo.repository.PrincipalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("PrincipalService")
public class DistributorServiceImpl implements DistributorService {
    @Autowired
    DistributorRepository distributorRepository;

    @Override
    public void saveDistributorService(Distributor distributor) {
        synchronized (this) {
            distributorRepository.saveDistributorRepository(distributor);
        }
    }
}
