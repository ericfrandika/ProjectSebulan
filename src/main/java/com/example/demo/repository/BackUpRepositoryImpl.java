package com.example.demo.repository;

import com.example.demo.model.Backup;
import com.example.demo.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.List;

@Repository("BackUpRepository")
public class BackUpRepositoryImpl implements BackUpRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void BackUpDataRepository() {
        String dbUserName = "root";
        String dbUserPassword = "eric321";
        String dbNameList = "nexchief";
        String savePath = "D:\\backupdatabase\\nexchief.sql";
        String executeCmd = "C:/xampp/mysql/bin/mysqldump.exe --databases --user=" + dbUserName + " --password=" + dbUserPassword + "  --databases " + dbNameList + " -r " + savePath;
        Process runtimeProcess;
        try {
            runtimeProcess = Runtime.getRuntime().exec(new String[]{"cmd.exe", "/c", executeCmd});
            int processComplete = runtimeProcess.waitFor();
            if (processComplete == 0) {
                System.out.println("Backup created successfully");
            } else {
                System.out.println("Could not create the backup");
            }
        }
        catch (Exception e) {

        }
    }

    @Override
    public List<Backup> findAllBackUpRepository() {
        return jdbcTemplate.query("SELECT * from backresdata",
                (rs, rowNum) ->
                        new Backup(
                                rs.getString("nmDatabase"),
                                rs.getString("fileData")
                        )
        );
    }

    @Override
    public void downloadDatabaseRepository() {
        jdbcTemplate.update("delete from backresdata ");
        jdbcTemplate.update("insert into backresdata(fileData) values (load_file('D:/backupdatabase/nexchief.sql'))");

    }

    @Override
    public void saveRestoreRepository(MultipartFile file)throws Exception {
        File convertFile = new File("D:\\RestoreDatabase\\nexchief.sql");
        convertFile.createNewFile();
        FileOutputStream fout = new FileOutputStream(convertFile);
        fout.write(file.getBytes());
        fout.close();

    }

    @Override
    public void RestoreSQlRepository() {
        String dbUserName = "root";
        String dbUserPassword = "eric321";
        String dbNameList = "nexchief";
        String savePath = "D:\\RestoreDatabase\\nexchief.sql";
        String executeCmd = "C:/xampp/mysql/bin/mysql.exe -u root -peric321 nexchief < D:/RestoreDatabase/nexchief.sql";
        Process runtimeProcess;
        try {
            runtimeProcess = Runtime.getRuntime().exec(new String[]{"cmd.exe", "/c", executeCmd});
            int processComplete = runtimeProcess.waitFor();
            if (processComplete == 0) {
                System.out.println("Backup created successfully");
            } else {
                System.out.println("Could not create the backup");
            }
        }
        catch (Exception e) {
        }
    }

    @Override
    public void DeletedDatabaseRepository() throws Exception {
        String JDBC_DRIVER = "com.mysql.jdbc.Driver";
        String DB_URL = "jdbc:mysql://localhost/3306";

        //  Database credentials
        String USER = "root";
        String PASS = "eric321";
        Connection conn = null;
        Statement stmt = null;
        //STEP 2: Register JDBC driver
        Class.forName("com.mysql.cj.jdbc.Driver");
        //STEP 3: Open a connection
        System.out.println("Connecting to a selected database...");
        conn = DriverManager.getConnection(DB_URL, USER, PASS);
        System.out.println("Connected database successfully...");
        //STEP 4: Execute a query
        System.out.println("Deleting database...");
        stmt = conn.createStatement();
        String sql = "DROP DATABASE STUDENTS";
        stmt.executeUpdate(sql);
        System.out.println("Database deleted successfully...");
        conn.close();
    }

    @Override
    public void CreatedDatabaseRepository() throws Exception {
        String JDBC_DRIVER = "com.mysql.jdbc.Driver";
        String DB_URL = "jdbc:mysql://localhost/3306";

        //  Database credentials
        String USER = "root";
        String PASS = "eric321";
        Connection conn = null;
        Statement stmt = null;
        //STEP 2: Register JDBC driver
        Class.forName("com.mysql.cj.jdbc.Driver");
        //STEP 3: Open a connection
        System.out.println("Connecting to a selected database...");
        conn = DriverManager.getConnection(DB_URL, USER, PASS);
        System.out.println("Connected database successfully...");
        //STEP 4: Execute a query
        System.out.println("Creating database...");
        stmt = conn.createStatement();
        String sql = "CREATE DATABASE nexchief";
        stmt.executeUpdate(sql);
        System.out.println("Database Created successfully...");
        conn.close();
    }
}