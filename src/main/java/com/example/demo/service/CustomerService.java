package com.example.demo.service;


import com.example.demo.model.Customer;
import com.example.demo.model.Distributor;

import java.util.List;
import java.util.Map;

public interface CustomerService {
    void saveCustomerService(Customer customer);
    List<Customer> findAllCustomerService();
    Customer findByIdCustomerService(String cusId);
    Customer findByUsernameService(String cusName);
    void deleteCustomerServicebyId(String cusId);
    void updateCustomerService(Customer customer);
    Customer findByPhoneCustomerService(String cusPhone);
    Map<String, Object> findAllCustomerServiceWithPaging(int page, int limit);
    Map<String, Object> findByNameCustomerService(String cusName, int page , int limit) ;

}
