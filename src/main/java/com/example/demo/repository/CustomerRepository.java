package com.example.demo.repository;


import com.example.demo.model.Customer;

import java.util.List;
import java.util.Map;

public interface CustomerRepository {
    void saveCustomerRepository(Customer customer);
    List<Customer> findAllCustomerRepository();
    Customer findByIdCustomerRepository(String cusId);
    Customer findByUsernameRepository(String cusName);
    Map<String, Object> findByNameCustomerRepository(String cusName, int page , int limit) ;
    Customer findByPhoneCustomerRepository(String cusPhone);
    int deleteByIdCustomerRepository(String cusId);
    void updateCustomerRepository(Customer customer);
    Map<String, Object> findAllCustomerWithPaging(int page, int limit);
}
