package com.example.demo.repository;

import com.example.demo.model.Principal;

import java.util.List;

public interface PrincipalRepository {
List<Principal> findAllPrincipalRepository();
void savePrincipalRepository(Principal principal);
void updatePrincipalRepository(Principal principal);
int deleteByIdPrincipalRepository(String prinId);
List<Principal> findByNamePrincipalRepository(String prinName) ;
Principal findByIdPrincipalRepository(String prinId);
Principal findByPhonePrincipalRepository(String prinPhone);
Principal findByFaxPrincipalRepository(String prinFax);
Principal findByConPhonePrincipalRepository(String prinConPhone);

}
//    INSERT Principal  oke 1
//    Find By id        oke 2
//    Find by Name      oke 3
//    find by Phone     oke 4
//    find by Fax       oke 5
//    find by ConPhone  oke 6
//    update            oke 7
//    find ALL          oke 8
//    delete Id         oke 9