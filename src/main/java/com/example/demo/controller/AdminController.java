package com.example.demo.controller;

import com.example.demo.model.Admin;
import com.example.demo.service.AdminService;
import com.example.demo.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin/nexchief")
public class AdminController {
    public static final Logger logger = LoggerFactory.getLogger(AdminController.class);
    @Autowired
    AdminService adminService;

    @GetMapping("/login/") ///-------------------ini login----------------------------------
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        logger.info("Comparing data!");

        Admin admin = adminService.admin(username, password);

        if(admin == null) {
            logger.error("Username or password is wrong!");
            return new ResponseEntity<>(new CustomErrorType("Username or password is wrong!"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }

}
