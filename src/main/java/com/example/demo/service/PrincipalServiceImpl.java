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

    @Override
    public void deletePrincipalServicebyId(String prinId) {
        synchronized (this){
            principalRepository.deleteByIdPrincipalRepository(prinId);
        }
    }

    @Override
    public List<Principal> findByNamePrincipalService(String prinName) {
        List<Principal>principalList = principalRepository.findByNamePrincipalRepository(prinName);
        return principalList;
    }

    @Override
    public Principal findByPhonePrincipalService(String prinPhone) {
        Principal obj;
        try {
            obj = principalRepository.findByPhonePrincipalRepository(prinPhone);
        }
        catch (EmptyResultDataAccessException e){
            System.out.println(e);
            obj = null;
        }
        return  obj;
    }

    @Override
    public Principal findByFaxPrincipalService(String prinFax) {
        Principal prinFx;
        try {
            prinFx = principalRepository.findByFaxPrincipalRepository(prinFax);
        }
        catch (EmptyResultDataAccessException e){
            System.out.println(e);
            prinFx = null;
        }
        return  prinFx;
    }

    @Override
    public Principal findByConPhonePrincipalService(String prinConPhone) {
        Principal prinCon;
        try {
            prinCon = principalRepository.findByConPhonePrincipalRepository(prinConPhone);
        }
        catch (EmptyResultDataAccessException e){
            System.out.println(e);
            prinCon = null;
        }
        return  prinCon;
    }

    @Override
    public boolean isPrincipalNameExist(Principal principal) {
        return findByNamePrincipalService(principal.getPrinName()) .size() != 0;
    }

    @Override
    public List<Principal> findAllPrincipalWithPagingService(int page, int limit) {
        return principalRepository.findAllPrincipalWithPaging(page, limit);
    }

    @Override
    public int findAllCountService() {
        return principalRepository.findAllCountRepository();
    }

}
