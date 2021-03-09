package com.example.demo.model;

public class Distributor {
    private String prinId;
    private String disId;
    private String disName;
    private String disAddress;
    private String disCity;
    private String disOwner;
    private String disEmail;
    private String disPhone;
    private String discreatedAt;
    private String discreatedBy;
    private String disupdatedAt;
    private String disupdatedBy;

    public Distributor(String prinId, String disId, String disName,
                       String disAddress, String disCity, String disOwner,
                       String disEmail, String disPhone, String discreatedAt,
                       String discreatedBy, String disupdatedAt, String disupdatedBy) {
        this.prinId = prinId;
        this.disId = disId;
        this.disName = disName;
        this.disAddress = disAddress;
        this.disCity = disCity;
        this.disOwner = disOwner;
        this.disEmail = disEmail;
        this.disPhone = disPhone;
        this.discreatedAt = discreatedAt;
        this.discreatedBy = discreatedBy;
        this.disupdatedAt = disupdatedAt;
        this.disupdatedBy = disupdatedBy;
    }

    public String getPrinId() {
        return prinId;
    }

    public void setPrinId(String prinId) {
        this.prinId = prinId;
    }

    public String getDisId() {
        return disId;
    }

    public void setDisId(String disId) {
        this.disId = disId;
    }

    public String getDisName() {
        return disName;
    }

    public void setDisName(String disName) {
        this.disName = disName;
    }

    public String getDisAddress() {
        return disAddress;
    }

    public void setDisAddress(String disAddress) {
        this.disAddress = disAddress;
    }

    public String getDisCity() {
        return disCity;
    }

    public void setDisCity(String disCity) {
        this.disCity = disCity;
    }

    public String getDisOwner() {
        return disOwner;
    }

    public void setDisOwner(String disOwner) {
        this.disOwner = disOwner;
    }

    public String getDisEmail() {
        return disEmail;
    }

    public void setDisEmail(String disEmail) {
        this.disEmail = disEmail;
    }

    public String getDisPhone() {
        return disPhone;
    }

    public void setDisPhone(String disPhone) {
        this.disPhone = disPhone;
    }

    public String getDiscreatedAt() {
        return discreatedAt;
    }

    public void setDiscreatedAt(String discreatedAt) {
        this.discreatedAt = discreatedAt;
    }

    public String getDiscreatedBy() {
        return discreatedBy;
    }

    public void setDiscreatedBy(String discreatedBy) {
        this.discreatedBy = discreatedBy;
    }

    public String getDisupdatedAt() {
        return disupdatedAt;
    }

    public void setDisupdatedAt(String disupdatedAt) {
        this.disupdatedAt = disupdatedAt;
    }

    public String getDisupdatedBy() {
        return disupdatedBy;
    }

    public void setDisupdatedBy(String disupdatedBy) {
        this.disupdatedBy = disupdatedBy;
    }

}
