package com.example.demo.repository;

import com.example.demo.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("CustomerRepository")
public class CustomerRepositoryImpl implements CustomerRepository{
@Autowired

    private JdbcTemplate jdbcTemplate;

    @Override
    public void saveCustomerRepository(Customer customer) {
        if(customer.getDisId() == ""){
            customer.setDisId(null);
        }
        jdbcTemplate.update("insert into customer(cusId,cusName," +
                        "cusPass,cusAddress,cusPhone,prinId,disId," +
                        "cusOnOff,cusRegis,cusValid,cuscreatedAt,cuscreatedBy,cusupdatedAt," +
                        "cusupdatedBy)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                customer.getCusId(),customer.getCusName(),customer.getCusPass(),
                customer.getCusAddress(),customer.getCusPhone(),customer.getPrinId(),customer.getDisId(),
                customer.getCusOnOff(),customer.getCusRegis(),customer.getCusValid(),
                customer.getCuscreatedAt(),customer.getCuscreatedBy(),
                customer.getCusupdatedAt(), customer.getCusupdatedBy());
    }

    @Override
    public List<Customer> findAllCustomerRepository() {
        return jdbcTemplate.query("SELECT cus.cusId, cus.cusName, cus.cusPass,cus.cusAddress, cus.cusPhone,prin.prinId, prin.prinName, " +
                        "cus.disId,cus.cusOnOff,cus.cusRegis,cus.cusValid,cus.cuscreatedAt, cus.cuscreatedBy, cus.cusupdatedAt, cus.cusupdatedBy FROM customer cus , " +
                        "principal prin WHERE cus.prinId = prin.prinId ",
                (rs,rowNum)->
                        new Customer(
                                rs.getString("cusId"),
                                rs.getString("cusName"),
                                rs.getString("cusPass"),
                                rs.getString("cusAddress"),
                                rs.getString("cusPhone"),
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("disId"),
                                rs.getString("cusOnOff"),
                                rs.getString("cusRegis"),
                                rs.getString("cusValid"),
                                rs.getString("cuscreatedAt"),
                                rs.getString("cuscreatedBy"),
                                rs.getString("cusupdatedAt"),
                                rs.getString("cusupdatedBy")
                        )
        );
    }

    @Override
    public Customer findByIdCustomerRepository(String cusId) {
        return jdbcTemplate.queryForObject("SELECT cus.cusId, cus.cusName, cus.cusPass,cus.cusAddress, cus.cusPhone,prin.prinId, prin.prinName, " +
                        "cus.disId,cus.cusOnOff,cus.cusRegis,cus.cusValid,cus.cuscreatedAt, cus.cuscreatedBy, cus.cusupdatedAt, cus.cusupdatedBy FROM customer cus , " +
                        "principal prin WHERE cus.prinId = prin.prinId and cus.cusId=?",
                new Object[]{cusId},

                (rs,rowNum)->
                        new Customer(
                                rs.getString("cusId"),
                                rs.getString("cusName"),
                                rs.getString("cusPass"),
                                rs.getString("cusAddress"),
                                rs.getString("cusPhone"),
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("disId"),
                                rs.getString("cusOnOff"),
                                rs.getString("cusRegis"),
                                rs.getString("cusValid"),
                                rs.getString("cuscreatedAt"),
                                rs.getString("cuscreatedBy"),
                                rs.getString("cusupdatedAt"),
                                rs.getString("cusupdatedBy")
                        )
        );
    }

    @Override
    public List<Customer> findByNameCustomerRepository(String cusName, int page, int limit) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM customer where cusName like '%"+cusName+"%'" ,
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if(numPages > 0){
            if (page > numPages) page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;
        return jdbcTemplate.query("SELECT cus.cusId, cus.cusName, cus.cusPass,cus.cusAddress, cus.cusPhone,prin.prinId, prin.prinName," +
                        "cus.disId,cus.cusOnOff,cus.cusRegis,cus.cusValid,cus.cuscreatedAt, cus.cuscreatedBy, cus.cusupdatedAt, cus.cusupdatedBy FROM customer cus ," +
                        "principal prin WHERE cus.prinId = prin.prinId  and cus.cusName like '%"+cusName+"%' Limit "+start+","+limit+"",
                (rs,rowNum)->
                        new Customer(
                                rs.getString("cusId"),
                                rs.getString("cusName"),
                                rs.getString("cusPass"),
                                rs.getString("cusAddress"),
                                rs.getString("cusPhone"),
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("disId"),
                                rs.getString("cusOnOff"),
                                rs.getString("cusRegis"),
                                rs.getString("cusValid"),
                                rs.getString("cuscreatedAt"),
                                rs.getString("cuscreatedBy"),
                                rs.getString("cusupdatedAt"),
                                rs.getString("cusupdatedBy")
                        )
        );    }

    @Override
    public Customer findByPhoneCustomerRepository(String cusPhone) {
        return jdbcTemplate.queryForObject("SELECT cus.cusId, cus.cusName, cus.cusPass,cus.cusAddress, cus.cusPhone,prin.prinId, prin.prinName, " +
                        "cus.disId,cus.cusOnOff,cus.cusRegis,cus.cusValid,cus.cuscreatedAt, cus.cuscreatedBy, cus.cusupdatedAt, cus.cusupdatedBy FROM customer cus , " +
                        "principal prin WHERE cus.prinId = prin.prinId  and cus.cusPhone=?",
                new Object[]{cusPhone},
                (rs,rowNum)->
                        new Customer(
                                rs.getString("cusId"),
                                rs.getString("cusName"),
                                rs.getString("cusPass"),
                                rs.getString("cusAddress"),
                                rs.getString("cusPhone"),
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("disId"),
                                rs.getString("cusOnOff"),
                                rs.getString("cusRegis"),
                                rs.getString("cusValid"),
                                rs.getString("cuscreatedAt"),
                                rs.getString("cuscreatedBy"),
                                rs.getString("cusupdatedAt"),
                                rs.getString("cusupdatedBy")
                        )
        );    }

    @Override
    public int deleteByIdCustomerRepository(String cusId) {
        return jdbcTemplate.update("delete from customer where cusId = ?", cusId);
    }

    @Override
    public void updateCustomerRepository(Customer customer) {
        if(customer.getDisId() == ""){
            customer.setDisId(null);
        }

        jdbcTemplate.update("update customer set cusName=? , cusPass=? ,cusAddress=?,cusPhone=?,prinId=?,disId=?,cusOnOff=?,cusRegis=?,cusValid=?,cusupdatedAt=?,cusupdatedBy=? where cusId=?",
                customer.getCusName(),customer.getCusPass(),
                customer.getCusAddress(),customer.getCusPhone(),
                customer.getPrinId(),customer.getDisId(),
                customer.getCusOnOff(),customer.getCusRegis(),customer.getCusValid(),
                customer.getCusupdatedAt(), customer.getCusupdatedBy(),
                customer.getCusId());
        }

    @Override
    public List<Customer> findAllCustomerWithPaging(int page, int limit) {
        int numPages;
        numPages = jdbcTemplate.query("SELECT COUNT(*) as count FROM customer",
                (rs, rowNum) -> rs.getInt("count")).get(0);

        if(numPages > 0){
            if (page > numPages) page = numPages;
        }
        if (page < 1) page = 1;
        int start = (page - 1) * limit;
        List<Customer> customerList = jdbcTemplate.query("SELECT cus.cusId, cus.cusName, cus.cusPass,cus.cusAddress, cus.cusPhone,prin.prinId, prin.prinName, " +
                "cus.disId,cus.cusOnOff,cus.cusRegis,cus.cusValid,cus.cuscreatedAt, cus.cuscreatedBy, cus.cusupdatedAt, cus.cusupdatedBy FROM customer cus , " +
                "principal prin WHERE cus.prinId = prin.prinId LIMIT "+ start +","+limit+";",
                (rs,rowNum)->
                        new Customer(
                                rs.getString("cusId"),
                                rs.getString("cusName"),
                                rs.getString("cusPass"),
                                rs.getString("cusAddress"),
                                rs.getString("cusPhone"),
                                rs.getString("prinId"),
                                rs.getString("prinName"),
                                rs.getString("disId"),
                                rs.getString("cusOnOff"),
                                rs.getString("cusRegis"),
                                rs.getString("cusValid"),
                                rs.getString("cuscreatedAt"),
                                rs.getString("cuscreatedBy"),
                                rs.getString("cusupdatedAt"),
                                rs.getString("cusupdatedBy")
                        )
        );
        return customerList;
    }

    @Override
    public int findAllCountCustomerRepository() {
        int countUser;
        countUser = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM customer", Integer.class);
        return countUser;
    }

    @Override
    public int findAllCountNameCustomerRespository(String cusName) {
        int countUser;
        countUser = jdbcTemplate.queryForObject("SELECT COUNT(*) as count FROM customer where cusName like '%"+cusName+"%'", Integer.class);
        return countUser;
    }

}
