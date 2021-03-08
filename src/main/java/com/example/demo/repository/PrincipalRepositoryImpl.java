package com.example.demo.repository;


import com.example.demo.model.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

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
        jdbcTemplate.update("update principal set prinName=? , prinAddress=? ,prinCity=?,prinPhone=?,prinFax=?,prinCountry=?,prinConPhone=?,prinLicensed=?,princreatedBy=?,prinupdatedAt=?, prinupdatedBy=? where prinId=?",
                principal.getPrinName(), principal.getPrinAddress(), principal.getPrinCity(),
                principal.getPrinPhone(), principal.getPrinFax(), principal.getPrinCountry(),
                principal.getPrinConPhone(),principal.getPrinLicensed(),
                principal.getPrincreatedBy(),principal.getPrinupdatedAt(), principal.getPrinupdatedBy(),
                principal.getPrinId());

    }

    @Override
    public int deleteByIdPrincipalRepository(String prinId) {
        return jdbcTemplate.update("delete from principal where prinId = ?", prinId);
    }

    @Override
    public List<Principal> findByNamePrincipalRepository(String prinName) {
        return jdbcTemplate.query("select *from principal where prinName like ?",
                new Object[]{"%"+prinName+"%"},
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
        return jdbcTemplate.queryForObject(
                "select * from principal where prinPhone = ?",
                new Object[]{prinPhone},
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
    public Principal findByFaxPrincipalRepository(String prinFax) {
        return jdbcTemplate.queryForObject(
                "select * from principal where prinFax = ?",
                new Object[]{prinFax},
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
    public Principal findByConPhonePrincipalRepository(String prinConPhone) {
        return jdbcTemplate.queryForObject(
                "select * from principal where prinConPhone = ?",
                new Object[]{prinConPhone},
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
    public List<Principal> findAllPrincipalWithPaging(int page, int limit) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM principal",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if (page < 1) page = 1;
        if (page > numPages) page = numPages;
        int start = (page - 1) * limit;
        List<Principal> principalList = jdbcTemplate.query("SELECT * FROM principal LIMIT " + start + "," + limit + ";",
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
                        )
        );
        return principalList;
    }

    @Override
    public int findAllCountRepository() {
        int countUser;
        countUser = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM principal", Integer.class);
        return countUser;
    }
}
