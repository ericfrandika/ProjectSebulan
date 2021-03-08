package com.example.demo.controller;

import com.example.demo.model.Principal;
import com.example.demo.service.PrincipalService;
import com.example.demo.util.CustomErrorType;
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
public class PrincipalController {
    public static final Logger logger = LoggerFactory.getLogger(PrincipalController.class);
    @Autowired
    PrincipalService principalService;

    //(1)----------------------------FIND ALL PRINCIPAL----------------------------------

    @RequestMapping(value = "/principal/", method = RequestMethod.GET)
    public ResponseEntity<List<Principal>> listPrincipal() {
        List<Principal> principalList = principalService.findAllPrincipalService();
            return new ResponseEntity<>(principalList, HttpStatus.OK);
    }

    //(2)----------OKE-------------------------CREAT DATA PRINCIPAL---------------------------------
    @RequestMapping(value = "/principal/", method = RequestMethod.POST)
    public ResponseEntity<?> createPrincipal(@Valid @RequestBody Principal principal, Errors error) {
        System.out.println(principal.getPrinId());
        if(error.hasErrors()){
            return  new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }
        if (principalService.isPrincipalNameExist(principal)) {
            logger.error("Unable to create. A Principal with name {} already exist", principal.getPrinName());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with name " + principal.getPrinName() + " already exist."), HttpStatus.CONFLICT);
        }
        if (principalService.findByPhonePrincipalService(principal.getPrinPhone()) != null) {
            logger.error("Unable to create. A Principal with Phone {} already exist", principal.getPrinPhone());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with Phone " + principal.getPrinPhone() + " already exist."), HttpStatus.CONFLICT);
        }
        if (principalService.findByFaxPrincipalService(principal.getPrinFax()) !=null) {
            logger.error("Unable to create. A Principal with Fax {} already exist", principal.getPrinFax());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with Fax " + principal.getPrinFax() + " already exist."), HttpStatus.CONFLICT);
        }
       if (principalService.findByConPhonePrincipalService(principal.getPrinConPhone()) != null) {
            logger.error("Unable to create. A Principal with ConPhone {} already exist", principal.getPrinConPhone());
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with ChonPhone " + principal.getPrinConPhone() + " already exist."), HttpStatus.CONFLICT);
        }
        else {
            logger.info("Creating Principal : {}", principal);
            principalService.savePrincipalService(principal);
            return new ResponseEntity<>(principal, HttpStatus.OK);
        }
        }

    //(3)-----OKE---------------------------Find By ID-----------------------------------------------

    @RequestMapping(value = "/principal/{prinId}", method = RequestMethod.GET)
    public ResponseEntity<?> getPrinId(@PathVariable("prinId") String prinId) {
        logger.info("Fetching Principal with id {}", prinId);
        Principal principal = principalService.findByIdPrincipalService(prinId);
        if (principal == null) {
            logger.error("Principal with id {} not found. ", prinId);
            return new ResponseEntity<>(new CustomErrorType("Principal with id " + prinId  + " not found"), HttpStatus.NOT_FOUND);
        }
        else {
            return new ResponseEntity<>(principal, HttpStatus.OK);
        }
    }

    //-(4)-----OKE-------------------------------------Update Bye Id------------------------------------------

    @RequestMapping(value = "/principal/{prinId}", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePrincipal( @PathVariable("prinId") String prinId
            ,@Valid @RequestBody Principal principal ,Errors error) {

        logger.info("Updating Principal with id {}", prinId);
        if(error.hasErrors()){
            return  new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }
        Principal currentPrincipal = principalService.findByIdPrincipalService(prinId);

        if (currentPrincipal == null) {
            logger.error("Unable to update. Pasien with id {} not found.", prinId);
            return new ResponseEntity<>(new CustomErrorType("Unable to update. Principal with id " + prinId + " not found."),
                    HttpStatus.NOT_FOUND);
        } else {

            currentPrincipal.setPrinName(principal.getPrinName());
            currentPrincipal.setPrinAddress(principal.getPrinAddress());
            currentPrincipal.setPrinCity(principal.getPrinCity());

            currentPrincipal.setPrinPhone(principal.getPrinPhone());
            currentPrincipal.setPrinFax(principal.getPrinFax());
            currentPrincipal.setPrinCountry(principal.getPrinCountry());

            currentPrincipal.setPrinConPhone(principal.getPrinConPhone());
            currentPrincipal.setPrinLicensed(principal.getPrinLicensed());


            currentPrincipal.setPrincreatedBy(principal.getPrincreatedBy());
            currentPrincipal.setPrinupdatedAt(principal.getPrinupdatedAt());
            currentPrincipal.setPrinupdatedBy(principal.getPrinupdatedBy());

            principalService.updatePrincipalService(currentPrincipal);
            return new ResponseEntity<>(currentPrincipal, HttpStatus.OK);
        }
    }
    //--(5)----------Oke----------------------------Delete ID Principal-------------------------------------------

    @RequestMapping(value = "/principal/{prinId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletePrincipalbyId(@PathVariable("prinId") String prinId  ) {
        logger.info("Fetching & Deleting Principal with Principal {}", prinId);

        Principal principal = principalService.findByIdPrincipalService(prinId);
        if (principal == null) {
            logger.error("Unable to delete. Principal with id {} not found.", prinId);
            return new ResponseEntity<>(new CustomErrorType("Unable to delete. Principal with id " + prinId + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        else {
            principalService.deletePrincipalServicebyId(prinId);
            return new ResponseEntity<Principal>(HttpStatus.OK);
        }
    }
    //(1)----------------------------FIND BY NAME PRINCIPAL----------------------------------

    @RequestMapping(value = "/principal/name/{prinName}", method = RequestMethod.GET)
    public ResponseEntity<List<Principal>> listPrincipalName(@PathVariable("prinName") String prinName) {
        List<Principal> principalList = principalService.findByNamePrincipalService(prinName);
            return new ResponseEntity<>(principalList, HttpStatus.OK);
    }

    //(2) --------------------------------find All with pagination--------------------------------
    @RequestMapping(value = "/principal/paging/", method = RequestMethod.GET)
    public ResponseEntity<?>getPrincipalWithPagin(@RequestParam int page, @RequestParam int limit){
        List<Principal>principalList = principalService.findAllPrincipalWithPagingService(page,limit);
            return new ResponseEntity<>(principalList, HttpStatus.OK);

    }
    //-----------------------------------COUNT ALL DATA--------------------------------
    @RequestMapping(value = "/principal/count/", method = RequestMethod.GET)
    public ResponseEntity<?> countprincipal() {
        int count = principalService.findAllCountService();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    }

