package com.example.demo.repository;

import com.example.demo.model.Distributor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("DistributorRepository")
public class DistributorRepositoryImpl implements DistributorRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void saveDistributorRepository(Distributor distributor) {
        if(distributor.getDisId() == "") {
            int a = (int)(Math.random()*1000);
            String dis="DisId.";
            String idFirst = distributor.getDisName().substring(2,7);
            String idDistributor =dis + idFirst +""+a+"" ;
            distributor.setDisId(idDistributor);
        }
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
    public Map<String, Object> findByNameDistributorRepository(String disName , int page , int limit) {
        Map<String, Object> map = new HashMap<>();
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM principal prin,distributor dis WHERE dis.prinId = prin.prinId AND (dis.disId like '%"+disName+"%' OR dis.disName like '%"+disName+"%' or dis.disCity like '%"+disName+"%')" ,
                (rs, rowNum) -> rs.getInt("count")).get(0);
        map.put("count",numPages);
        if(numPages > 0){
            if (page > numPages) page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;
        map.put("distributor", jdbcTemplate.query("SELECT prin.prinId,prin.prinName, dis.disId,dis.disName, dis.disAddress,dis.disCity, dis.disOwner, " +
                        "dis.disEmail, dis.disPhone,dis.discreatedAt, dis.discreatedBy, dis.disupdatedAt,dis.disupdatedBy FROM principal prin, " +
                        "distributor dis WHERE dis.prinId = prin.prinId AND (dis.disId like '%"+disName+"%' OR dis.disName like '%"+disName+"%' or dis.disCity like '%"+disName+"%')  Limit "+start+","+limit+"",
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
        ));
        return map;
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
    public Distributor findByNameObjDistributorRepository(String disName) {

        return jdbcTemplate.queryForObject(
                "SELECT prin.prinId, prin.prinName, dis.disId,dis.disName, dis.disAddress,dis.disCity, dis.disOwner, " +
                        "dis.disEmail, dis.disPhone,dis.discreatedAt, dis.discreatedBy, dis.disupdatedAt,dis.disupdatedBy FROM principal prin, " +
                        "distributor dis WHERE dis.prinId = prin.prinId AND dis.disName=?",
                new Object[]{disName},
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
    public Map<String, Object>  findAllDistributorWithPaging(int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM distributor",
                (rs, rowNum) -> rs.getInt("count")).get(0);
        map.put("count",numPages);
        if(numPages > 0){
            if (page > numPages) page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;
        map.put("distributor", jdbcTemplate.query("SELECT prin.prinId, prin.prinName, dis.disId,dis.disName, dis.disAddress,dis.disCity, dis.disOwner, " +
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
        ));
        return map;
    }



}
