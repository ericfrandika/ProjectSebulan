package com.example.demo.controller;

import com.example.demo.model.Distributor;
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
import java.util.Map;

@RestController
@RequestMapping("/admin/nexchief")
public class PrincipalController {
    @Autowired
    PrincipalService principalService;

    //(1)----------------------------FIND ALL PRINCIPAL----------------------------------

    @RequestMapping(value = "/principal/", method = RequestMethod.GET)
    public ResponseEntity<?> listPrincipal() {
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
        if (principalService.findByIdPrincipalService(principal.getPrinId()) != null) {
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with id " + principal.getPrinId()+ " already exist."), HttpStatus.CONFLICT);
        }
        if (principalService.findByNameObjPrincipalService(principal.getPrinName())!=null) {
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with name " + principal.getPrinName() + " already exist."), HttpStatus.CONFLICT);
        }
        if (principalService.findByPhonePrincipalService(principal.getPrinPhone()) != null) {
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with Phone " + principal.getPrinPhone() + " already exist."), HttpStatus.CONFLICT);
        }
        if (principalService.findByFaxPrincipalService(principal.getPrinFax()) !=null) {
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with Fax " + principal.getPrinFax() + " already exist."), HttpStatus.CONFLICT);
        }
       if (principalService.findByConPhonePrincipalService(principal.getPrinConPhone()) != null) {
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with ChonPhone " + principal.getPrinConPhone() + " already exist."), HttpStatus.CONFLICT);
        }
        else {
            principalService.savePrincipalService(principal);
            return new ResponseEntity<>(principal, HttpStatus.OK);
        }
        }

    //(3)-----OKE---------------------------Find By ID-----------------------------------------------

    @RequestMapping(value = "/principal/{prinId}", method = RequestMethod.GET)
    public ResponseEntity<?> getPrinId(@PathVariable("prinId") String prinId) {
        Principal principal = principalService.findByIdPrincipalService(prinId);
        if (principal == null) {
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

        if(error.hasErrors()){
            return  new ResponseEntity<>(error.getFieldError().getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }
        Principal currentPrincipal = principalService.findByIdPrincipalService(prinId);

        if (currentPrincipal == null) {
            return new ResponseEntity<>(new CustomErrorType("Unable to update. Principal with id " + prinId + " not found."),
                    HttpStatus.NOT_FOUND);
        }
        if (principalService.findByNameObjPrincipalService(principal.getPrinName())!=null && !currentPrincipal.getPrinName().equalsIgnoreCase(principal.getPrinName())) {
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with name " + principal.getPrinName() + " already exist."), HttpStatus.CONFLICT);
        }
        if (principalService.findByPhonePrincipalService(principal.getPrinPhone()) != null && !currentPrincipal.getPrinPhone().equalsIgnoreCase(principal.getPrinPhone())) {
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with Phone " + principal.getPrinPhone() + " already exist."), HttpStatus.CONFLICT);
        }
        if (principalService.findByFaxPrincipalService(principal.getPrinFax()) !=null && !currentPrincipal.getPrinFax().equalsIgnoreCase(principal.getPrinFax())) {
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with Fax " + principal.getPrinFax() + " already exist."), HttpStatus.CONFLICT);
        }
        if (principalService.findByConPhonePrincipalService(principal.getPrinConPhone()) != null && !currentPrincipal.getPrinConPhone().equalsIgnoreCase(principal.getPrinConPhone())) {
            return new ResponseEntity<>(new CustomErrorType("Unable to create. A Principal with ChonPhone " + principal.getPrinConPhone() + " already exist."), HttpStatus.CONFLICT);
        }
        else {
            principalService.updatePrincipalService(principal);
            return new ResponseEntity<>(principal, HttpStatus.OK);
        }
    }
    //--(5)----------Oke----------------------------Delete ID Principal-------------------------------------------

    @RequestMapping(value = "/principal/{prinId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deletePrincipalbyId(@PathVariable("prinId") String prinId  ) {

        Principal principal = principalService.findByIdPrincipalService(prinId);
        try {
            if (principal == null) {
                return new ResponseEntity<>(new CustomErrorType("Unable to delete. Principal with id " + prinId + " not found."),
                        HttpStatus.NOT_FOUND);
            } else {
                principalService.deletePrincipalServicebyId(prinId);
                return new ResponseEntity<Principal>(HttpStatus.OK);
            }
        }
        catch (Exception e){
            return new ResponseEntity<>(new CustomErrorType("Dont Delete , Principal is Use in Distributor or Customer"),
                    HttpStatus.BAD_REQUEST);
        }
    }
    //(1)----------------------------FIND BY NAME PRINCIPAL----------------------------------

    @RequestMapping(value = "/principal/name/{prinName}", method = RequestMethod.GET)
    public ResponseEntity<?> listPrincipalName(@PathVariable("prinName") String prinName, @RequestParam int page, @RequestParam int limit) {
        Map<String, Object>  principalList = principalService.findByNamePrincipalService(prinName , page , limit);
            return new ResponseEntity<>(principalList, HttpStatus.OK);
    }

        //(2) --------------------------------find All with pagination--------------------------------
        @RequestMapping(value = "/principal/paging/", method = RequestMethod.GET)
        public ResponseEntity<?>getPrincipalWithPagin(@RequestParam int page, @RequestParam int limit){
            Map<String, Object> principalList = principalService.findAllPrincipalWithPagingService(page,limit);
                return new ResponseEntity<>(principalList, HttpStatus.OK);
        }

}

