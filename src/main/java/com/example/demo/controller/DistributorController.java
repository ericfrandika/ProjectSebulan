package com.example.demo.controller;
import com.example.demo.model.Distributor;
import com.example.demo.model.Principal;
import com.example.demo.service.DistributorService;
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

public class DistributorController {
    public static final Logger logger = LoggerFactory.getLogger(DistributorController.class);
    @Autowired
    DistributorService distributorService;
    @Autowired
    PrincipalService principalService;
    //(1)----------------------------FIND ALL DISTRIBUTOR----------------------------------

    @RequestMapping(value = "/distributor/", method = RequestMethod.GET)
    public ResponseEntity<List<Distributor>> listDistributor() {
        List<Distributor> distributorList = distributorService.findAllDistributorService();
        return new ResponseEntity<>(distributorList, HttpStatus.OK);
    }
    //--------------------------------------CREATE DATA DISTRIBUTOR-------------------------------------------------------------
    @RequestMapping(value = "/distributor/", method = RequestMethod.POST)
    public ResponseEntity<?> createDistributor( @RequestBody Distributor distributor) {
        Principal principal = principalService.findByIdPrincipalService(distributor.getPrinId());

        if (principal == null){
            logger.error("Unable to create. A Principal with id {} not Found", distributor.getPrinId());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with id " + distributor.getPrinId() + " Not Found."), HttpStatus.NOT_FOUND);
        }
        if (distributorService.isDistributorNameExist(distributor)) {
            logger.error("Unable to create. A Distributor with name {} already exist", distributor.getDisName());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Distributor with name " + distributor.getDisName() + " already exist."), HttpStatus.CONFLICT);
        }
        if (distributorService.findByEmailDistributorService(distributor.getDisEmail()) != null) {
            logger.error("Unable to create. A Distributor with Email {} already exist", distributor.getDisEmail());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Distributor with Email " + distributor.getDisEmail() + " already exist."), HttpStatus.CONFLICT);
        }
        if (distributorService.findByPhoneDistributorService(distributor.getDisPhone()) !=null) {
            logger.error("Unable to create. A Distributor with Phone {} already exist", distributor.getDisPhone());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with Phone " +distributor.getDisPhone() + " already exist."), HttpStatus.CONFLICT);
        }

        logger.info("Creating Distributor : {}", distributor);
        distributorService.saveDistributorService(distributor);
        return new ResponseEntity<>(distributor, HttpStatus.CREATED);
    }
    //(3)-----OKE---------------------------Find By ID-----------------------------------------------

    @RequestMapping(value = "/distributor/{disId}", method = RequestMethod.GET)
    public ResponseEntity<?> getPrinId(@PathVariable("disId") String disId) {
        logger.info("Fetching Distributor with id {}", disId);
        Distributor distributor = distributorService.findByIdDistributorService(disId);
        if (distributor == null) {
            logger.error("Distributor with id {} not found. ", disId);
            return new ResponseEntity<>(new CustomErrorType("Distributor with id " + disId  + " not found"), HttpStatus.NOT_FOUND);
        }
        else {
            return new ResponseEntity<>(distributor, HttpStatus.OK);
        }
    }
    //-------------------------------------FindByName---------------------------------------------
    @RequestMapping(value = "/distributor/name/{disName}", method = RequestMethod.GET)
    public ResponseEntity<List<Distributor>> listDistributorName(@PathVariable("disName") String disName) {
        List<Distributor> distributorList = distributorService.findByNameDistributorService(disName);
        return new ResponseEntity<>(distributorList, HttpStatus.OK);
    }

    //--(5)----------Oke----------------------------Delete ID DISTRIBUTOR-------------------------------------------

    @RequestMapping(value = "/distributor/{disId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletePrincipalbyId(@PathVariable("disId") String disId  ) {
        logger.info("Fetching & Deleting Distrbutor with id Distributor {}", disId);

        Distributor distributor = distributorService.findByIdDistributorService(disId);
        if (distributor == null) {
            logger.error("Unable to delete. Distributor with id {} not found.", disId);
            return new ResponseEntity<>(new CustomErrorType("Unable to delete. Distrbutor with id " + disId + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        else {
            distributorService.deleteDistributorServicebyId(disId);
            return new ResponseEntity<>(new CustomSuccessType("Id "+disId +" Success Deleted"),HttpStatus.ACCEPTED);
        }
    }
    //-(4)-----OKE-------------------------------------Update Bye Id------------------------------------------

    @RequestMapping(value = "/distributor/{disId}", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePrincipal(@PathVariable("disId") String disId
            , @RequestBody Distributor distributor , Errors error) {

        logger.info("Updating Distributor with id {}", disId);

        Distributor currentDistributor = distributorService.findByIdDistributorService(disId);

        if (currentDistributor == null) {
            logger.error("Unable to update. Distributor with id {} not found.", disId);
            return new ResponseEntity<>(new CustomErrorType("Unable to update. Distributor with id " + disId + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        if (distributorService.isDistributorNameExist(distributor) && !currentDistributor.getDisName().equalsIgnoreCase(distributor.getDisName())) {
            logger.error("Unable to create. A Distributor with name {} already exist", distributor.getDisName());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Distributor with name " + distributor.getDisName() + " already exist."), HttpStatus.CONFLICT);
        }
        if (distributorService.findByEmailDistributorService(distributor.getDisEmail()) != null && !currentDistributor.getDisEmail().equalsIgnoreCase(distributor.getDisEmail())) {
            logger.error("Unable to create. A Distributor with Email {} already exist", distributor.getDisName());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Distributor with Email " + distributor.getDisEmail() + " already exist."), HttpStatus.CONFLICT);
        }
        if (distributorService.findByPhoneDistributorService(distributor.getDisPhone()) !=null && !currentDistributor.getDisPhone().equalsIgnoreCase(distributor.getDisPhone())) {
            logger.error("Unable to create. A Distributor with phone {} already exist", distributor.getDisPhone());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Distributor with Phone " + distributor.getDisPhone() + " already exist."), HttpStatus.CONFLICT);
        }
        else {

            currentDistributor.setPrinId(distributor.getPrinId());
            currentDistributor.setDisName(distributor.getDisName());
            currentDistributor.setDisAddress(distributor.getDisAddress());
            currentDistributor.setDisCity(distributor.getDisCity());
            currentDistributor.setDisOwner(distributor.getDisOwner());
            currentDistributor.setDisEmail(distributor.getDisEmail());
            currentDistributor.setDisPhone(distributor.getDisPhone());
            currentDistributor.setDisupdatedAt(distributor.getDisupdatedAt());
            currentDistributor.setDisupdatedBy(distributor.getDisupdatedBy());

            distributorService.updateDistributorService(currentDistributor);
            return new ResponseEntity<>(distributor, HttpStatus.OK);
        }

    }
    //-----------------------------------COUNT ALL DATA--------------------------------
    @RequestMapping(value = "/distributor/count/", method = RequestMethod.GET)
    public ResponseEntity<?> countDistributor() {
        int count = distributorService.findAllDistributorCountService();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
    //(2) --------------------------------find All with pagination--------------------------------
    @RequestMapping(value = "/distributor/paging/", method = RequestMethod.GET)
    public ResponseEntity<?>getDistributorWithPagin(@RequestParam int page, @RequestParam int limit){
        List<Distributor>distributorList = distributorService.findAllDistributorWithPagingService(page,limit);
        return new ResponseEntity<>(distributorList, HttpStatus.OK);
    }

}
