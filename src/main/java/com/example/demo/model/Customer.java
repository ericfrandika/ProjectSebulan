package com.example.demo.model;

public class Customer {
    private String cusId;
    private String cusName;
    private String cusPass;
    private String cusAddress;
    private String cusPhone;
    private String prinName;
    private String disName;
    private String cuscreatedAt;
    private String cuscreatedBy;
    private String cusupdatedAt;
    private String cusupdatedBy;

    public Customer(String cusId, String cusName,
                    String cusPass, String cusAddress,
                    String cusPhone, String prinName,
                    String disName, String cuscreatedAt,
                    String cuscreatedBy, String cusupdatedAt, String cusupdatedBy) {
        this.cusId = cusId;
        this.cusName = cusName;
        this.cusPass = cusPass;
        this.cusAddress = cusAddress;
        this.cusPhone = cusPhone;
        this.prinName = prinName;
        this.disName = disName;
        this.cuscreatedAt = cuscreatedAt;
        this.cuscreatedBy = cuscreatedBy;
        this.cusupdatedAt = cusupdatedAt;
        this.cusupdatedBy = cusupdatedBy;
    }

    public String getCusId() {
        return cusId;
    }

    public void setCusId(String cusId) {
        this.cusId = cusId;
    }

    public String getCusName() {
        return cusName;
    }

    public void setCusName(String cusName) {
        this.cusName = cusName;
    }

    public String getCusPass() {
        return cusPass;
    }

    public void setCusPass(String cusPass) {
        this.cusPass = cusPass;
    }

    public String getCusAddress() {
        return cusAddress;
    }

    public void setCusAddress(String cusAddress) {
        this.cusAddress = cusAddress;
    }

    public String getCusPhone() {
        return cusPhone;
    }

    public void setCusPhone(String cusPhone) {
        this.cusPhone = cusPhone;
    }

    public String getPrinName() {
        return prinName;
    }

    public void setPrinName(String prinName) {
        this.prinName = prinName;
    }

    public String getDisName() {
        return disName;
    }

    public void setDisName(String disName) {
        this.disName = disName;
    }

    public String getCuscreatedAt() {
        return cuscreatedAt;
    }

    public void setCuscreatedAt(String cuscreatedAt) {
        this.cuscreatedAt = cuscreatedAt;
    }

    public String getCuscreatedBy() {
        return cuscreatedBy;
    }

    public void setCuscreatedBy(String cuscreatedBy) {
        this.cuscreatedBy = cuscreatedBy;
    }

    public String getCusupdatedAt() {
        return cusupdatedAt;
    }

    public void setCusupdatedAt(String cusupdatedAt) {
        this.cusupdatedAt = cusupdatedAt;
    }

    public String getCusupdatedBy() {
        return cusupdatedBy;
    }

    public void setCusupdatedBy(String cusupdatedBy) {
        this.cusupdatedBy = cusupdatedBy;
    }
}
