package com.example.demo.repository;

import com.example.demo.model.Admin;

public interface AdminRepository {
    Admin admin(String username, String password);// INI untuk login

}
