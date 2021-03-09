package com.example.demo.repository;

import com.example.demo.model.Distributor;
import com.example.demo.model.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository("DistributorRepository")
public class DistributorRepositoryImpl implements DistributorRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void saveDistributorRepository(Distributor distributor) {
        jdbcTemplate.update("insert into distributor(prinId,disId," +
                        "disName,disAddress,disOwner,disEmail," +
                        "discreatedAt,discreatedBy,disupdatedAt," +
                        "disupdatedBy)values(?,?,?,?,?,?,?,?,?,?)",
                distributor.getPrinId(),distributor.getDisId(),distributor.getDisName(),
                distributor.getDisAddress(),distributor.getDisOwner(),distributor.getDisEmail(),
                distributor.getDiscreatedAt(),distributor.getDiscreatedBy(),distributor.getDisupdatedAt(),
                distributor.getDisupdatedBy());
    }

}
