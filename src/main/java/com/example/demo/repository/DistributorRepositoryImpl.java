package com.example.demo.repository;

import com.example.demo.model.Distributor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("DistributorRepository")
public class DistributorRepositoryImpl implements DistributorRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void saveDistributorRepository(Distributor distributor) {
        jdbcTemplate.update("insert into distributor(prinId,disId," +
                        "disName,disAddress,disCity,disOwner,disEmail,disPhone," +
                        "discreatedAt,discreatedBy,disupdatedAt," +
                        "disupdatedBy)values(?,?,?,?,?,?,?,?,?,?,?,?)",
                distributor.getPrinId(),distributor.getDisId(),distributor.getDisName(),
                distributor.getDisAddress(),distributor.getDisCity(),distributor.getDisOwner(),distributor.getDisEmail(),
                distributor.getDisPhone(), distributor.getDiscreatedAt(),distributor.getDiscreatedBy(),distributor.getDisupdatedAt(),
                distributor.getDisupdatedBy());
    }

    @Override
    public List<Distributor> findAllDistributorRepository() {
        return jdbcTemplate.query("SELECT prin.prinId, prin.prinName, dis.disId,dis.disName, dis.disAddress,dis.disCity, dis.disOwner, " +
                        "dis.disEmail, dis.disPhone,dis.discreatedAt, dis.discreatedBy, dis.disupdatedAt,dis.disupdatedBy FROM principal prin, " +
                        "distributor dis WHERE dis.prinId = prin.prinId",
                (rs,rowNum)->
                        new Distributor(
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("disId"),
                                rs.getString("disName"),
                                rs.getString("disAddress"),
                                rs.getString("disCity"),
                                rs.getString("disOwner"),
                                rs.getString("disEmail"),
                                rs.getString("disPhone"),
                                rs.getString("discreatedAt"),
                                rs.getString("discreatedBy"),
                                rs.getString("disupdatedAt"),
                                rs.getString("disupdatedBy")
                        )
        );
    }

    @Override
    public Distributor findByIdDistributorRepository(String disId) {
        return jdbcTemplate.queryForObject(
                "SELECT prin.prinId, prin.prinName, dis.disId,dis.disName, dis.disAddress,dis.disCity, dis.disOwner, " +
                        "dis.disEmail, dis.disPhone,dis.discreatedAt, dis.discreatedBy, dis.disupdatedAt,dis.disupdatedBy FROM principal prin, " +
                        "distributor dis WHERE dis.prinId = prin.prinId AND dis.disId=?",
                new Object[]{disId},
                (rs, rowNum) ->
                        new Distributor(
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("disId"),
                                rs.getString("disName"),
                                rs.getString("disAddress"),
                                rs.getString("disCity"),
                                rs.getString("disOwner"),
                                rs.getString("disEmail"),
                                rs.getString("disPhone"),
                                rs.getString("discreatedAt"),
                                rs.getString("discreatedBy"),
                                rs.getString("disupdatedAt"),
                                rs.getString("disupdatedBy")
                        ));
    }

    @Override
    public List<Distributor> findByNameDistributorRepository(String disName) {
        return jdbcTemplate.query("SELECT prin.prinId,prin.prinName, dis.disId,dis.disName, dis.disAddress,dis.disCity, dis.disOwner, " +
                "dis.disEmail, dis.disPhone,dis.discreatedAt, dis.discreatedBy, dis.disupdatedAt,dis.disupdatedBy FROM principal prin, " +
                "distributor dis WHERE dis.prinId = prin.prinId AND dis.disName like ?",
                new Object[]{"%"+disName+"%"},
                (rs,rowNum)->
                        new Distributor(
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("disId"),
                                rs.getString("disName"),
                                rs.getString("disAddress"),
                                rs.getString("disCity"),
                                rs.getString("disOwner"),
                                rs.getString("disEmail"),
                                rs.getString("disPhone"),
                                rs.getString("discreatedAt"),
                                rs.getString("discreatedBy"),
                                rs.getString("disupdatedAt"),
                                rs.getString("disupdatedBy")
                        )
        );
    }

    @Override
    public Distributor findByEmailDistributorRepository(String disEmail) {
        return jdbcTemplate.queryForObject(
                "SELECT prin.prinId, prin.prinName, dis.disId,dis.disName, dis.disAddress,dis.disCity, dis.disOwner, " +
                        "dis.disEmail, dis.disPhone,dis.discreatedAt, dis.discreatedBy, dis.disupdatedAt,dis.disupdatedBy FROM principal prin, " +
                        "distributor dis WHERE dis.prinId = prin.prinId AND dis.disEmail=?",
                new Object[]{disEmail},
                (rs, rowNum) ->
                        new Distributor(
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("disId"),
                                rs.getString("disName"),
                                rs.getString("disAddress"),
                                rs.getString("disCity"),
                                rs.getString("disOwner"),
                                rs.getString("disEmail"),
                                rs.getString("disPhone"),
                                rs.getString("discreatedAt"),
                                rs.getString("discreatedBy"),
                                rs.getString("disupdatedAt"),
                                rs.getString("disupdatedBy")
                        ));
    }

    @Override
    public Distributor findByPhoneDistributorRepository(String disPhone) {
        return jdbcTemplate.queryForObject(
                "SELECT prin.prinId, prin.prinName, dis.disId,dis.disName, dis.disAddress,dis.disCity, dis.disOwner, " +
                        "dis.disEmail, dis.disPhone,dis.discreatedAt, dis.discreatedBy, dis.disupdatedAt,dis.disupdatedBy FROM principal prin, " +
                        "distributor dis WHERE dis.prinId = prin.prinId AND dis.disPhone=?",
                new Object[]{disPhone},
                (rs, rowNum) ->
                        new Distributor(
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("disId"),
                                rs.getString("disName"),
                                rs.getString("disAddress"),
                                rs.getString("disCity"),
                                rs.getString("disOwner"),
                                rs.getString("disEmail"),
                                rs.getString("disPhone"),
                                rs.getString("discreatedAt"),
                                rs.getString("discreatedBy"),
                                rs.getString("disupdatedAt"),
                                rs.getString("disupdatedBy")
                        ));
    }

    @Override
    public int deleteByIdDistributorRepository(String disId) {
        return jdbcTemplate.update("delete from distributor where disId = ?", disId);
    }

    @Override
    public void updateDistributorRepository(Distributor distributor) {
        jdbcTemplate.update("update distributor set prinId=? , disName=? ,disAddress=?,disCity=?,disOwner=?,disEmail=?,disPhone=?,disupdatedAt=?,disupdatedBy=? where disId=?",
                distributor.getPrinId(),distributor.getDisName(),
                distributor.getDisAddress(),distributor.getDisCity(),
                distributor.getDisOwner(),distributor.getDisEmail(),
                distributor.getDisPhone(),distributor.getDisupdatedAt(),
                distributor.getDisupdatedBy(),distributor.getDisId());

    }

    @Override
    public List<Distributor> findAllDistributorWithPaging(int page, int limit) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM distributor",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;
//        "SELECT * FROM distributor LIMIT " + start + "," + limit + ";"
        List<Distributor> distributorList = jdbcTemplate.query("SELECT prin.prinId, prin.prinName, dis.disId,dis.disName, dis.disAddress,dis.disCity, dis.disOwner, " +
                "dis.disEmail, dis.disPhone,dis.discreatedAt, dis.discreatedBy, dis.disupdatedAt,dis.disupdatedBy FROM principal prin, " +
                "distributor dis WHERE dis.prinId = prin.prinId LIMIT "+ start +","+limit+";",
                (rs, rowNum) ->
                        new Distributor(
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("disId"),
                                rs.getString("disName"),
                                rs.getString("disAddress"),
                                rs.getString("disCity"),
                                rs.getString("disOwner"),
                                rs.getString("disEmail"),
                                rs.getString("disPhone"),
                                rs.getString("discreatedAt"),
                                rs.getString("discreatedBy"),
                                rs.getString("disupdatedAt"),
                                rs.getString("disupdatedBy")
                        )
        );
        return distributorList;
    }

    @Override
    public int findAllCountDistributorRepository() {
        int countUser;
        countUser = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM distributor", Integer.class);
        return countUser;
    }

}
