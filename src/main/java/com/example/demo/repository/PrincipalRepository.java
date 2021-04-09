package com.example.demo.repository;

import com.example.demo.model.Principal;

import java.util.List;
import java.util.Map;

public interface PrincipalRepository {

List<Principal> findAllPrincipalRepository();

void savePrincipalRepository(Principal principal);
void updatePrincipalRepository(Principal principal);
int deleteByIdPrincipalRepository(String prinId);
Map<String, Object>findByNamePrincipalRepository(String prinName, int page ,int limit) ;
Principal findByIdPrincipalRepository(String prinId);
Principal findByPhonePrincipalRepository(String prinPhone);
Principal findByFaxPrincipalRepository(String prinFax);
Principal findByConPhonePrincipalRepository(String prinConPhone);
Map<String, Object> findAllPrincipalWithPaging(int page, int limit);

Principal findByNameObjPrincipalRepository(String prinName);

}
