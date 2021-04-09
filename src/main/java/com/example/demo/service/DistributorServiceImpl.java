package com.example.demo.service;

import com.example.demo.model.Distributor;
import com.example.demo.model.Principal;
import com.example.demo.repository.DistributorRepository;
import com.example.demo.repository.PrincipalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("DistributorService")
public class DistributorServiceImpl implements DistributorService {
    @Autowired
    DistributorRepository distributorRepository;

    @Override
    public void saveDistributorService(Distributor distributor) {
        synchronized (this) {
            distributorRepository.saveDistributorRepository(distributor);
        }
    }

    @Override
    public List<Distributor> findAllDistributorService() {
        List<Distributor>distributorList = distributorRepository.findAllDistributorRepository();
        return distributorList;
    }

    @Override
    public Distributor findByIdDistributorService(String disId) {
        Distributor obj;
        try {
            obj = distributorRepository.findByIdDistributorRepository(disId);
        }
        catch (EmptyResultDataAccessException e){
            System.out.println(e);
            obj = null;
        }
        return  obj;
    }

    @Override
    public Map<String, Object>  findByNameDistributorService(String disName , int page , int limit) {
         return distributorRepository.findByNameDistributorRepository(disName, page , limit);
    }



    @Override
    public Distributor findByEmailDistributorService(String disEmail) {
        Distributor obj;
        try {
            obj = distributorRepository.findByEmailDistributorRepository(disEmail);
        }
        catch (EmptyResultDataAccessException e){
            System.out.println(e);
            obj = null;
        }
        return  obj;
    }

    @Override
    public Distributor findByPhoneDistributorService(String disPhone) {
        Distributor obj;
        try {
            obj = distributorRepository.findByPhoneDistributorRepository(disPhone);
        }
        catch (EmptyResultDataAccessException e){
            System.out.println(e);
            obj = null;
        }
        return  obj;
    }

    @Override
    public Distributor findByNameObjDistributorService(String disName) {
        Distributor obj;
        try {
            obj = distributorRepository.findByNameObjDistributorRepository(disName);
        }
        catch (EmptyResultDataAccessException e){
            System.out.println(e);
            obj = null;
        }
        return  obj;
    }

    @Override
    public void deleteDistributorServicebyId(String disId) {
        synchronized (this){
            distributorRepository.deleteByIdDistributorRepository(disId);
        }
    }

    @Override
    public void updateDistributorService(Distributor distributor) {
        synchronized (this){
            distributorRepository.updateDistributorRepository(distributor);
        }
    }



    @Override
    public Map<String, Object> findAllDistributorWithPagingService(int page, int limit) {
        return distributorRepository.findAllDistributorWithPaging(page, limit);
    }
}
