package com.example.demo.repository;

import com.example.demo.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository("AdminRepository")

public class AdminRepositoryImpl implements AdminRepository {
    @Autowired
   private   JdbcTemplate jdbcTemplate;

    @Override
    public Admin admin(String username, String password) {
        Admin admin;
        try {
            admin = this.jdbcTemplate.query("select * from adminnc where binary username=? and binary password=?",
                    preparedStatement -> {
                        preparedStatement.setString(1, username);
                        preparedStatement.setString(2, password);
                    },
                    (rs, rowNum) ->
                            new Admin(
                                    rs.getString("username"),
                                    rs.getString("password")
                            )
            ).get(0);
        }catch (Exception e){
            admin = null;
        }
        return admin;
    }
}
