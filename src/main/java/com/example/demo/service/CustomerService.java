package com.example.demo.service;


import com.example.demo.model.Customer;
import com.example.demo.model.Distributor;

import java.util.List;

public interface CustomerService {
    void saveCustomerService(Customer customer);
    List<Customer> findAllCustomerService();
    Customer findByIdCustomerService(String cusId);
    void deleteCustomerServicebyId(String cusId);
    void updateCustomerService(Customer customer);
    Customer findByPhoneCustomerService(String cusPhone);
    List<Customer> findAllCustomerServiceWithPaging(int page, int limit);
    int findAllCustomerCountService();
    List<Customer> findByNameCustomerService(String cusName, int page ,int limit) ;
    int findAllCountNameCustomerService(String cusName);

}
