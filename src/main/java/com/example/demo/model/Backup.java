package com.example.demo.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class Backup {
    @NotBlank(message = "path notNull Cannot be empty")
    @Pattern(regexp = "^[a-zA-Z]:\\\\", message = "you mush insert your path like D:\backupdatabase\nexchief.sql ")
    private String backPath;
    private String nmDatabase;
    private String fileData;
    private byte[] nameDatabase;

    public byte[] getNameDatabase() {
        return nameDatabase;
    }

    public void setNameDatabase(byte[] nameDatabase) {
        this.nameDatabase = nameDatabase;
    }

    public Backup(@NotBlank(message = "path notNull Cannot be empty") @Pattern(regexp = "^[a-zA-Z]:\\\\", message = "you mush insert your path like D:\backupdatabase\nexchief.sql ") String backPath, String nmDatabase, String fileData) {
        this.backPath = backPath;
        this.nmDatabase = nmDatabase;
        this.fileData = fileData;
    }

    public Backup(String nmDatabase, String fileData) {
        this.nmDatabase = nmDatabase;
        this.fileData = fileData;
    }
    public Backup(){

    }

    public String getBackPath() {
        return backPath;
    }

    public void setBackPath(String backPath) {
        this.backPath = backPath;
    }

    public String getNmDatabase() {
        return nmDatabase;
    }

    public void setNmDatabase(String nmDatabase) {
        this.nmDatabase = nmDatabase;
    }

    public String getFileData() {
        return fileData;
    }

    public void setFileData(String fileData) {
        this.fileData = fileData;
    }
}
