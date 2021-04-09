package com.example.demo.service;


import com.example.demo.model.Distributor;
import com.example.demo.model.Principal;

import java.util.List;
import java.util.Map;

public interface DistributorService {
    void saveDistributorService(Distributor distributor);
    List<Distributor> findAllDistributorService();
    Distributor findByIdDistributorService(String disId);
    Map<String, Object> findByNameDistributorService(String disName, int page , int limit);
    Distributor findByEmailDistributorService(String disEmail);
    Distributor findByPhoneDistributorService(String disPhone);
    Distributor findByNameObjDistributorService(String disName);
    void deleteDistributorServicebyId(String disId);
    void updateDistributorService(Distributor distributor);

    Map<String, Object>  findAllDistributorWithPagingService(int page, int limit);


}
