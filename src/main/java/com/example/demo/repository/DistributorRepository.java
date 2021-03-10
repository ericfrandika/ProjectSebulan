package com.example.demo.repository;


import com.example.demo.model.Distributor;

import java.util.List;

public interface DistributorRepository {
    void saveDistributorRepository(Distributor distributor);
    List<Distributor> findAllDistributorRepository();
    Distributor findByIdDistributorRepository(String disId);
    List<Distributor> findByNameDistributorRepository(String disName) ;
    Distributor findByEmailDistributorRepository(String disEmail);
    Distributor findByPhoneDistributorRepository(String disPhone);
    int deleteByIdDistributorRepository(String disId);
    void updateDistributorRepository(Distributor distributor);
    List<Distributor> findAllDistributorWithPaging(int page, int limit);
    int findAllCountDistributorRepository();

}
