package com.example.demo.repository;


import com.example.demo.model.Distributor;

import java.util.List;
import java.util.Map;

public interface DistributorRepository {
    void saveDistributorRepository(Distributor distributor);
    List<Distributor> findAllDistributorRepository();
    Distributor findByIdDistributorRepository(String disId);
    Map<String, Object> findByNameDistributorRepository(String disName, int page , int limit) ;
    Distributor findByEmailDistributorRepository(String disEmail);
    Distributor findByPhoneDistributorRepository(String disPhone);
    Distributor findByNameObjDistributorRepository(String disName);
    int deleteByIdDistributorRepository(String disId);
    void updateDistributorRepository(Distributor distributor);
    Map<String, Object>  findAllDistributorWithPaging(int page, int limit);

}
