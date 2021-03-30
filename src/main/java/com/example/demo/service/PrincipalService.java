package com.example.demo.service;

import com.example.demo.model.Principal;

import java.util.List;

public interface  PrincipalService {

    List<Principal> findAllPrincipalService();

    void savePrincipalService(Principal principal);

    void updatePrincipalService(Principal principal);

    Principal findByIdPrincipalService(String prinId);

    void deletePrincipalServicebyId(String prinId);

    List<Principal> findByNamePrincipalService(String prinName, int page , int limit);

    Principal findByPhonePrincipalService(String prinPhone);

    Principal findByFaxPrincipalService(String prinFax);

    Principal findByConPhonePrincipalService(String prinConPhone);

    Principal findByNameObjPrincipalService(String prinName);


    boolean isPrincipalNameExist(Principal principal);
    List<Principal> findAllPrincipalWithPagingService(int page, int limit);
    int findAllCountService();
    int findAllCountNameService(String prinName);

}
