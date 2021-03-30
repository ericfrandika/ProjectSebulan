package com.example.demo.controller;

import com.example.demo.model.Customer;
import com.example.demo.model.Principal;
import com.example.demo.service.CustomerService;
import com.example.demo.service.PrincipalService;
import com.example.demo.util.CustomErrorType;
import com.example.demo.util.CustomSuccessType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin/nexchief")
public class CustomerController {
    public static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    CustomerService customerService;
    @Autowired
    PrincipalService principalService;

    //----------------------------------------CREATE DATA CUSTOMER---------------------------------------------
    @RequestMapping(value = "/customer/", method = RequestMethod.POST)
    public ResponseEntity<?> createCustomer(@Valid @RequestBody Customer customer, Errors error) {
        Principal principal = principalService.findByIdPrincipalService(customer.getPrinId());
        if(error.hasErrors()) {
            return new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }
        if (principal == null){
            logger.error("Unable to create. A Principal with id {} not Found", customer.getPrinId());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with id " + customer.getPrinId() + " Not Found."), HttpStatus.NOT_FOUND);
        }
        else {
            logger.info("Creating Customer : {}", customer);
            customerService.saveCustomerService(customer);
            return new ResponseEntity<>(customer, HttpStatus.CREATED);
        }
    }
    //(1)----------------------------FIND ALL CUSTOMER----------------------------------

    @RequestMapping(value = "/customer/", method = RequestMethod.GET)
    public ResponseEntity<List<Customer>> listCustomer() {
        List<Customer> distributorList = customerService.findAllCustomerService();
        return new ResponseEntity<>(distributorList, HttpStatus.OK);
    }
    //(3)-----OKE---------------------------Find By ID-----------------------------------------------

    @RequestMapping(value = "/customer/{cusId}", method = RequestMethod.GET)
    public ResponseEntity<?> getCusId(@PathVariable("cusId") String cusId) {
        logger.info("Fetching Customer with id {}", cusId);
        Customer customer = customerService.findByIdCustomerService(cusId);
        if (customer == null) {
            logger.error("Customer with id {} not found. ", cusId);
            return new ResponseEntity<>(new CustomErrorType("Customer with id " + cusId + " not found"), HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(customer, HttpStatus.OK);
        }
    }
    //--(5)----------Oke----------------------------Delete ID Customer-------------------------------------------

    @RequestMapping(value = "/customer/{cusId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteCustomerbyId(@PathVariable("cusId") String cusId  ) {
        logger.info("Fetching & Deleting Customer with id Customer {}", cusId);

        Customer customer = customerService.findByIdCustomerService(cusId);
        if (customer == null) {
            logger.error("Unable to delete. Distributor with id {} not found.", cusId);
            return new ResponseEntity<>(new CustomErrorType("Unable to delete. Customer with id " + cusId + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        else {
            customerService.deleteCustomerServicebyId(cusId);
            return new ResponseEntity<>(new CustomSuccessType("Id "+cusId +" Success Deleted"),HttpStatus.ACCEPTED);
        }
    }
    //-(4)-----OKE-------------------------------------Update Bye Id------------------------------------------

    @RequestMapping(value = "/customer/{cusId}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateCustomer(@Valid @PathVariable("cusId") String cusId
            , @RequestBody Customer customer , Errors error) {
        logger.info("Updating Distributor with id {}", cusId);

        Customer currentCustomer = customerService.findByIdCustomerService(cusId);
        if(error.hasErrors()){
            return new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }
        if (currentCustomer == null) {
            logger.error("Unable to Update. Customer with id {} not found.", cusId);
            return new ResponseEntity<>(new CustomErrorType("Unable to update. Customer with id " + cusId + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        else {
            customerService.updateCustomerService(customer);
            return new ResponseEntity<>(customer, HttpStatus.OK);
        }
    }
    //(2) --------------------------------find All with pagination--------------------------------
    @RequestMapping(value = "/customer/paging/", method = RequestMethod.GET)
    public ResponseEntity<?>getAllCustomerWithPagin(@RequestParam int page, @RequestParam int limit){
        List<Customer>customerList = customerService.findAllCustomerServiceWithPaging(page,limit);
        return new ResponseEntity<>(customerList, HttpStatus.OK);
    }
    //-----------------------------------COUNT ALL DATA--------------------------------
    @RequestMapping(value = "/customer/count/", method = RequestMethod.GET)
    public ResponseEntity<?> countCustomer() {
        int count = customerService.findAllCustomerCountService();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
    //-------------------------------------FindByNameWithPage---------------------------------------------
    @RequestMapping(value = "/customer/name/{cusName}", method = RequestMethod.GET)
    public ResponseEntity<List<Customer>> listDistributorName(@PathVariable("cusName") String cusName ,@RequestParam int page , @RequestParam int limit) {
        List<Customer> customerList = customerService.findByNameCustomerService(cusName ,page , limit);
        return new ResponseEntity<>(customerList, HttpStatus.OK);
    }
    //-----------------------------------COUNT ALL DATA NAME--------------------------------
    @RequestMapping(value = "/customer/countName/{cusName}", method = RequestMethod.GET)
    public ResponseEntity<?> countNameDistributor(@PathVariable("cusName") String cusName) {
        int count = customerService.findAllCountNameCustomerService(cusName);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

}