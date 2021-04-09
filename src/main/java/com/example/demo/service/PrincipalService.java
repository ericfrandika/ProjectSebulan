package com.example.demo.service;

import com.example.demo.model.Principal;

import java.util.List;
import java.util.Map;

public interface  PrincipalService {

    List<Principal> findAllPrincipalService();

    void savePrincipalService(Principal principal);

    void updatePrincipalService(Principal principal);

    Principal findByIdPrincipalService(String prinId);

    void deletePrincipalServicebyId(String prinId);

    Map<String, Object>  findByNamePrincipalService(String prinName, int page , int limit);

    Principal findByPhonePrincipalService(String prinPhone);

    Principal findByFaxPrincipalService(String prinFax);

    Principal findByConPhonePrincipalService(String prinConPhone);

    Principal findByNameObjPrincipalService(String prinName);


    boolean isPrincipalNameExist(Principal principal);
    Map<String, Object> findAllPrincipalWithPagingService(int page, int limit);

}
