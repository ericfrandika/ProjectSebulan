package com.example.demo.service;

import com.example.demo.model.Principal;

import java.util.List;

public interface PrincipalService {
    List<Principal> findAllPrincipalService();
    void savePrincipalService(Principal principal);
    void updatePrincipalService(Principal principal);
    Principal findByIdPrincipalService(String prinId);

}
