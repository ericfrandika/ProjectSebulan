package com.example.demo.repository;


import com.example.demo.model.Distributor;

import java.util.List;

public interface DistributorRepository {
    void saveDistributorRepository(Distributor distributor);
    List<Distributor> findAllDistributorRepository();
    Distributor findByIdDistributorRepository(String disId);
    List<Distributor> findByNameDistributorRepository(String disName, int page ,int limit) ;
    Distributor findByEmailDistributorRepository(String disEmail);
    Distributor findByPhoneDistributorRepository(String disPhone);
    Distributor findByNameObjDistributorRepository(String disName);
    int deleteByIdDistributorRepository(String disId);
    void updateDistributorRepository(Distributor distributor);
    List<Distributor> findAllDistributorWithPaging(int page, int limit);
    int findAllCountDistributorRepository();
    int findAllCountNameDistributorRespository(String disName);

}
