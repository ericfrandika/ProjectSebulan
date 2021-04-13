package com.example.demo.controller;

import com.example.demo.Constants;
import com.example.demo.model.Admin;
import com.example.demo.service.AdminService;
import com.example.demo.util.CustomErrorType;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin/user")
public class AdminController {
    @Autowired
    AdminService adminService;
    @GetMapping("/login/") ///-------------------ini login----------------------------------
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        Admin admin = adminService.admin(username, password);

        if(admin == null) {
            return new ResponseEntity<>(new CustomErrorType("Username or password is wrong!"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(generateJWTToken(admin), HttpStatus.OK);
    }

    private Map<String, String> generateJWTToken(Admin admin) {
        long timestamp = System.currentTimeMillis();
        String token = Jwts.builder().signWith(SignatureAlgorithm.HS256, Constants.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp + Constants.EXPIRATION_TIME))
                .claim("username", admin.getUsername())
                .compact();
        Map<String, String> map = new HashMap<>();
        map.put("token", token);
        return map;
    }
}
