package com.example.demo.controller;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import ch.qos.logback.core.encoder.EchoEncoder;
import com.example.demo.model.Backup;
import com.example.demo.model.Customer;
import com.example.demo.model.Distributor;
import com.example.demo.model.Principal;
import com.example.demo.service.BackUpService;
import com.example.demo.service.PrincipalService;
import com.example.demo.util.CustomErrorType;
import com.example.demo.util.CustomSuccessType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping("/admin/nexchief")
@CrossOrigin(origins = "http://localhost:3000")
@Configuration
@EnableScheduling

public class BackUpController {
    public static final Logger logger = LoggerFactory.getLogger(BackUpController.class);

    @Autowired
    BackUpService backUpService;
    @RequestMapping(value = "/backupdatabase/", method = RequestMethod.GET)
    public ResponseEntity<?> createBackup()  {
        logger.info("Creating BackUpdata : {}");
        backUpService.BackUpDataService();
        backUpService.downloadDatabaseService();
        return new ResponseEntity<>(new CustomSuccessType("Success"), HttpStatus.OK);
    }
    //(1)----------------------------FIND ALL DISTRIBUTOR----------------------------------

    @RequestMapping(value = "/all/backupdatabase/", method = RequestMethod.GET)
    public ResponseEntity<List<Backup>> listBackUpdatabase() {
        List<Backup> backupList =backUpService.findAllBackUpService();
        return new ResponseEntity<>(backupList, HttpStatus.OK);
    }
//    @RequestMapping(value = "/restoreDatabase/", method = RequestMethod.POST)
//    public ResponseEntity<?> RestoreData(@RequestBody Backup backup) throws Exception {
//        logger.info("Creating RestoreData : {}");
//        backUpService.saveRestoreService(backup); ;
//        return new ResponseEntity<>(new CustomSuccessType("Success"), HttpStatus.OK);
//    }

    @RequestMapping(value ="/uploadRestore/",method = RequestMethod.POST , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Object> uploadFile(@RequestParam("nameDatabase")MultipartFile file) throws Exception{
        backUpService.saveRestoreService(file); ;
//        backUpService.DeletedDatabaseService();
//        backUpService.CreatedDatabaseService();
        backUpService.RestoreSQlService();
        return new ResponseEntity<>("File SuccessFully Resotre Database",HttpStatus.OK);
    }
}