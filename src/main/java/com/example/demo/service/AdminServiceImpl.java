package com.example.demo.service;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("AdminService")
public class AdminServiceImpl implements AdminService {
    @Autowired
    AdminRepository adminRepository;

    @Override
    public Admin admin(String username, String password) {
        return adminRepository.admin(username,password);
    }
}
