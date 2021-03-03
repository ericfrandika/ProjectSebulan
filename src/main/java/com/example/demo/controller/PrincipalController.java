package com.example.demo.controller;

import com.example.demo.model.Principal;
import com.example.demo.service.PrincipalService;
import com.example.demo.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        if (principalList.isEmpty()) {
            return new ResponseEntity<>(principalList, HttpStatus.NOT_FOUND);
        }
        else {
            return new ResponseEntity<>(principalList, HttpStatus.OK);
        }
    }

    //(2)----------OKE-------------------------CREAT DATA PRINCIPAL---------------------------------
    @RequestMapping(value = "/principal/", method = RequestMethod.POST)
    public ResponseEntity<?> crateObat(@RequestBody Principal principal) {
            logger.info("Creating Principal : {}", principal);
            principalService.savePrincipalService(principal);
            return new ResponseEntity<>(principal,HttpStatus.OK);
        }
    //(3)-----OKE---------------------------Find By ID-----------------------------------------------

    @RequestMapping(value = "/principal/{prinId}", method = RequestMethod.GET)
    public ResponseEntity<?> getPrinId(@PathVariable("prinId") String prinId) {
        logger.info("Fetching Principal with id {}", prinId);
        Principal principal = principalService.findByIdPrincipalService(prinId);
        if (principal == null) {
            logger.error("Principal with id {} not found. ", prinId);
            return new ResponseEntity<>(new CustomErrorType("Obat with id " + prinId  + " not found"), HttpStatus.NOT_FOUND);
        }
        else {
            return new ResponseEntity<>(principal, HttpStatus.OK);
        }
    }

    //-(3)-----OKE-------------------------------------Update Bye Id------------------------------------------


    @RequestMapping(value = "/principal/{prinId}", method = RequestMethod.PUT)
    public ResponseEntity<?> updatePrincipal(@PathVariable("prinId") String prinId
            , @RequestBody Principal principal) {

        logger.info("Updating Principal with id {}", prinId);
        Principal currentPrincipal = principalService.findByIdPrincipalService(prinId);
        ;
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
            currentPrincipal.setPrincreatedAt(principal.getPrincreatedAt());

            currentPrincipal.setPrincreatedBy(principal.getPrincreatedBy());
            currentPrincipal.setPrinupdatedAt(principal.getPrinupdatedAt());
            currentPrincipal.setPrinupdatedBy(principal.getPrinupdatedBy());


            principalService.updatePrincipalService(currentPrincipal);
            return new ResponseEntity<>(currentPrincipal, HttpStatus.OK);
        }
    }

    }

