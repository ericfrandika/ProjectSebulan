package com.example.demo.service;


import com.example.demo.model.Distributor;
import com.example.demo.model.Principal;

import java.util.List;

public interface DistributorService {
    void saveDistributorService(Distributor distributor);
    List<Distributor> findAllDistributorService();
    Distributor findByIdDistributorService(String disId);
    List<Distributor> findByNameDistributorService(String disName);
    boolean isDistributorNameExist(Distributor distributor);
    Distributor findByEmailDistributorService(String disEmail);
    Distributor findByPhoneDistributorService(String disPhone);
    Distributor findByNameObjDistributorService(String disName);
    void deleteDistributorServicebyId(String disId);
    void updateDistributorService(Distributor distributor);
    int findAllDistributorCountService();
    List<Distributor> findAllDistributorWithPagingService(int page, int limit);

}
