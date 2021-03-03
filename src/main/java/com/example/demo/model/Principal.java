package com.example.demo.model;

public class Principal {
private String prinId;
private String prinName;
private String prinAddress;
private String prinCity;
private String prinPhone; //phone Gak boleh sama
private String prinFax; // Fax gak boleh sama
private String prinCountry;
private String prinConPhone;
private String prinLicensed;
private String princreatedAt;
private String princreatedBy;
private String prinupdatedAt;
private String prinupdatedBy;

    public Principal(String prinId, String prinName,
                     String prinAddress, String prinCity,
                     String prinPhone, String prinFax, String prinCountry,
                     String prinConPhone, String prinLicensed,
                     String princreatedAt, String princreatedBy,
                     String prinupdatedAt, String prinupdatedBy) {
        this.prinId = prinId;
        this.prinName = prinName;
        this.prinAddress = prinAddress;
        this.prinCity = prinCity;
        this.prinPhone = prinPhone;
        this.prinFax = prinFax;
        this.prinCountry = prinCountry;
        this.prinConPhone = prinConPhone;
        this.prinLicensed = prinLicensed;
        this.princreatedAt = princreatedAt;
        this.princreatedBy = princreatedBy;
        this.prinupdatedAt = prinupdatedAt;
        this.prinupdatedBy = prinupdatedBy;
    }

    public String getPrinId() {
        return prinId;
    }

    public void setPrinId(String prinId) {
        this.prinId = prinId;
    }

    public String getPrinName() {
        return prinName;
    }

    public void setPrinName(String prinName) {
        this.prinName = prinName;
    }

    public String getPrinAddress() {
        return prinAddress;
    }

    public void setPrinAddress(String prinAddress) {
        this.prinAddress = prinAddress;
    }

    public String getPrinCity() {
        return prinCity;
    }

    public void setPrinCity(String prinCity) {
        this.prinCity = prinCity;
    }

    public String getPrinPhone() {
        return prinPhone;
    }

    public void setPrinPhone(String prinPhone) {
        this.prinPhone = prinPhone;
    }

    public String getPrinFax() {
        return prinFax;
    }

    public void setPrinFax(String prinFax) {
        this.prinFax = prinFax;
    }

    public String getPrinCountry() {
        return prinCountry;
    }

    public void setPrinCountry(String prinCountry) {
        this.prinCountry = prinCountry;
    }

    public String getPrinConPhone() {
        return prinConPhone;
    }

    public void setPrinConPhone(String prinConPhone) {
        this.prinConPhone = prinConPhone;
    }

    public String getPrinLicensed() {
        return prinLicensed;
    }

    public void setPrinLicensed(String prinLicensed) {
        this.prinLicensed = prinLicensed;
    }

    public String getPrincreatedAt() {
        return princreatedAt;
    }

    public void setPrincreatedAt(String princreatedAt) {
        this.princreatedAt = princreatedAt;
    }

    public String getPrincreatedBy() {
        return princreatedBy;
    }

    public void setPrincreatedBy(String princreatedBy) {
        this.princreatedBy = princreatedBy;
    }

    public String getPrinupdatedAt() {
        return prinupdatedAt;
    }

    public void setPrinupdatedAt(String prinupdatedAt) {
        this.prinupdatedAt = prinupdatedAt;
    }

    public String getPrinupdatedBy() {
        return prinupdatedBy;
    }

    public void setPrinupdatedBy(String prinupdatedBy) {
        this.prinupdatedBy = prinupdatedBy;
    }
}
