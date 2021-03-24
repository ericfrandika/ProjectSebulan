package com.example.demo.service;

import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("CustomerService")
public class CustomerServiceImpl implements CustomerService {
@Autowired
    CustomerRepository customerRepository;

    @Override
    public void saveCustomerService(Customer customer) {
        synchronized (this) {
            customerRepository.saveCustomerRepository(customer);
        }
    }

    @Override
    public List<Customer> findAllCustomerService() {
    List<Customer>customerList =customerRepository.findAllCustomerRepository();
    return customerList;
    }

    @Override
    public Customer findByIdCustomerService(String cusId) {
        Customer obj;
        try{
            obj = customerRepository.findByIdCustomerRepository(cusId);
        }
        catch (EmptyResultDataAccessException e){
            System.out.println(e);
            obj = null;
        }
        return obj;
    }

    @Override
    public void deleteCustomerServicebyId(String cusId) {
        synchronized (this){
            customerRepository.deleteByIdCustomerRepository(cusId);
        }
    }

    @Override
    public void updateCustomerService(Customer customer) {
        synchronized (this){
            customerRepository.updateCustomerRepository(customer);
        }
    }

    @Override
    public Customer findByPhoneCustomerService(String cusPhone) {

        Customer obj;
        try{
            obj = customerRepository.findByPhoneCustomerRepository(cusPhone);
        }
        catch (EmptyResultDataAccessException e){
            System.out.println(e);
            obj = null;
        }
        return obj;
    }

    @Override
    public List<Customer> findAllCustomerServiceWithPaging(int page, int limit) {
        return customerRepository.findAllCustomerWithPaging (page , limit);
    }

    @Override
    public int findAllCustomerCountService() {
        return customerRepository.findAllCountCustomerRepository();
    }

    @Override
    public List<Customer> findByNameCustomerService(String cusName, int page, int limit) {
        return customerRepository.findByNameCustomerRepository(cusName , page , limit);
    }
    @Override
    public int findAllCountNameCustomerService(String cusName) {
        return customerRepository.findAllCountNameCustomerRespository(cusName);
    }

}
