package com.example.demo.repository;

import com.example.demo.model.Backup;
import com.example.demo.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Properties;

@Repository("BackUpRepository")
public class BackUpRepositoryImpl implements BackUpRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void BackUpDataRepository()  throws Exception {
        Properties prop = new Properties();
        prop.load(new FileInputStream("src/main/resources/database.properties"));
        String user = prop.getProperty("username");
        String pass = prop.getProperty("password");
        String dbNameList = prop.getProperty("database");
        String savePath = prop.getProperty("savepathbackup");
        String pathMysqldump=prop.getProperty("pathMysqldump");
        String executeCmd = pathMysqldump+ " --databases --user=" + user + " --password=" + pass + "  --databases " + dbNameList + " -r " + savePath;
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
    public void downloadDatabaseRepository()throws Exception {
        Properties prop = new Properties();
        prop.load(new FileInputStream("src/main/resources/database.properties"));
        String savePath = prop.getProperty("pathbackupsql");
        jdbcTemplate.update("delete from backresdata ");
        jdbcTemplate.update("insert into backresdata(fileData) values (load_file("+savePath+"))");

    }

    @Override
    public void saveRestoreRepository(MultipartFile file)throws Exception {
        Properties prop = new Properties();
        prop.load(new FileInputStream("src/main/resources/database.properties"));
        String savePath = prop.getProperty("savepathbackup");
        File convertFile = new File(savePath);
        convertFile.createNewFile();
        FileOutputStream fout = new FileOutputStream(convertFile);
        fout.write(file.getBytes());
        fout.close();

    }

    @Override
    public void RestoreSQlRepository() throws Exception{
        Properties prop = new Properties();
        prop.load(new FileInputStream("src/main/resources/database.properties"));
        String dbUserName = prop.getProperty("username");
        String dbUserPassword =  prop.getProperty("password");
        String dbNameList = prop.getProperty("database");
        String savePath = prop.getProperty("savepathrestore");
        String pathMysqlRestore=prop.getProperty("pathMysqlRestore");
        String executeCmd = pathMysqlRestore+" -u "+dbUserName+" -p"+dbUserPassword+" "+dbNameList+" < "+savePath+"";
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


}