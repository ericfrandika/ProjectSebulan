package com.example.demo.repository;

import com.example.demo.model.Principal;

import java.util.List;

public interface PrincipalRepository {
List<Principal> findAllPrincipalRepository();
void savePrincipalRepository(Principal principal);
void updatePrincipalRepository(Principal principal);
int deleteByIdPrincipalRepository(String prinId);
List<Principal> findByNamePrincipalRepository(String prinName, int page ,int limit) ;
Principal findByIdPrincipalRepository(String prinId);
Principal findByPhonePrincipalRepository(String prinPhone);
Principal findByFaxPrincipalRepository(String prinFax);
Principal findByConPhonePrincipalRepository(String prinConPhone);
List<Principal> findAllPrincipalWithPaging(int page, int limit);
int findAllCountRepository();
int findAllCountNameRepository(String prinName);
Principal findByNameObjPrincipalRepository(String prinName);

}
