package com.example.demo.service;

import com.example.demo.model.Principal;
import com.example.demo.repository.PrincipalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("PrincipalService")
public class PrincipalServiceImpl implements PrincipalService {
    @Autowired
    PrincipalRepository principalRepository;

    @Override
    public List<Principal> findAllPrincipalService() {
        List<Principal>principalList=principalRepository.findAllPrincipalRepository();
        return principalList;
    }

    @Override
    public void savePrincipalService(Principal principal) {
        synchronized (this) {
            principalRepository.savePrincipalRepository(principal);
        }
    }

    @Override
    public void updatePrincipalService(Principal principal) {
        synchronized (this){
            principalRepository.updatePrincipalRepository(principal);
        }
    }

    @Override
    public Principal findByIdPrincipalService(String prinId) {
        Principal obj;
        try {
            obj = principalRepository.findByIdPrincipalRepository(prinId);
        }
        catch (EmptyResultDataAccessException e){
            System.out.println(e);
            obj = null;
        }
        return  obj;
    }

}
