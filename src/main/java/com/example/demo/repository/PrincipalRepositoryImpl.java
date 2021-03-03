package com.example.demo.repository;


import com.example.demo.model.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("PrincipalRepository")
public class PrincipalRepositoryImpl implements PrincipalRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Principal> findAllPrincipalRepository() {
        return jdbcTemplate.query("select *from principal",
                (rs,rowNum)->
                        new Principal(
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("prinAddress"),
                                rs.getString("prinCity"),
                                rs.getString("prinPhone"),
                                rs.getString("prinFax"),
                                rs.getString("prinCountry"),
                                rs.getString("prinConPhone"),
                                rs.getString("prinLicensed"),
                                rs.getString("princreatedAt"),
                                rs.getString("princreatedBy"),
                                rs.getString("prinupdatedAt"),
                                rs.getString("prinupdatedBy")

                        )
        );
    }

    @Override
    public void savePrincipalRepository(Principal principal) {
        jdbcTemplate.update("insert into principal(prinId,prinName," +
                        "prinAddress,prinCity,prinPhone,prinFax," +
                        "prinCountry,prinConPhone,prinLicensed," +
                        "princreatedAt,princreatedBy,prinupdatedAt," +
                        "prinupdatedBy)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
                principal.getPrinId(),principal.getPrinName(),
                principal.getPrinAddress(), principal.getPrinCity(),principal.getPrinPhone(), principal.getPrinFax(),
                principal.getPrinCountry(),principal.getPrinConPhone(),principal.getPrinLicensed(),
                principal.getPrincreatedAt(),principal.getPrincreatedBy(),principal.getPrinupdatedAt(),principal.getPrinupdatedBy());
    }

    @Override
    public void updatePrincipalRepository(Principal principal) {
        jdbcTemplate.update("update principal set prinName=? , prinAddress=? ,prinCity=?,prinPhone=?,prinFax=?,prinCountry=?,prinConPhone=?,prinLicensed=?, princreatedAt=?,princreatedBy=?,prinupdatedAt=?, prinupdatedBy=? where prinId=?",
                principal.getPrinName(), principal.getPrinAddress(), principal.getPrinCity(),
                principal.getPrinPhone(), principal.getPrinFax(), principal.getPrinCountry(),
                principal.getPrinConPhone(),principal.getPrinLicensed(), principal.getPrincreatedAt(),
                principal.getPrincreatedBy(),principal.getPrinupdatedAt(), principal.getPrinupdatedBy(),
                principal.getPrinId());

    }

    @Override
    public int deleteByIdPrincipalRepository(String prinId) {
        return 0;
    }

    @Override
    public List<Principal> findByNamePrincipalRepository(String prinName) {
        return null;
    }

    @Override
    public Principal findByIdPrincipalRepository(String prinId) {
        return jdbcTemplate.queryForObject(
                "select * from principal where prinId = ?",
                new Object[]{prinId},
                (rs, rowNum) ->
                        new Principal(
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("prinAddress"),
                                rs.getString("prinCity"),
                                rs.getString("prinPhone"),
                                rs.getString("prinFax"),
                                rs.getString("prinCountry"),
                                rs.getString("prinConPhone"),
                                rs.getString("prinLicensed"),
                                rs.getString("princreatedAt"),
                                rs.getString("princreatedBy"),
                                rs.getString("prinupdatedAt"),
                                rs.getString("prinupdatedBy")
                        ));
    }

    @Override
    public Principal findByPhonePrincipalRepository(String prinPhone) {
        return null;
    }

    @Override
    public Principal findByFaxPrincipalRepository(String prinFax) {
        return null;
    }

    @Override
    public Principal findByConPhonePrincipalRepository(String prinConPhone) {
        return null;
    }
}
