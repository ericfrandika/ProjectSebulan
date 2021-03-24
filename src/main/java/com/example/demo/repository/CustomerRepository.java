package com.example.demo.repository;


import com.example.demo.model.Customer;

import java.util.List;

public interface CustomerRepository {
    void saveCustomerRepository(Customer customer);
    List<Customer> findAllCustomerRepository();
    Customer findByIdCustomerRepository(String cusId);
  List<Customer> findByNameCustomerRepository(String cusName, int page ,int limit) ;
    Customer findByPhoneCustomerRepository(String cusPhone);
//    Distributor findByNameObjDistributorRepository(String disName);
    int deleteByIdCustomerRepository(String cusId);
    void updateCustomerRepository(Customer customer);
   List<Customer> findAllCustomerWithPaging(int page, int limit);
    int findAllCountCustomerRepository();
    int findAllCountNameCustomerRespository(String cusName);
}
