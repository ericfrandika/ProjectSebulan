package com.example.demo.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class Distributor {
    private String prinId;
    private String prinName;
    private String disId;

    @NotBlank(message = "Name cannot be empty")
    private String disName;//NotSame

    @NotBlank(message = "Address cannot be empty")
    private String disAddress;

    @NotBlank(message = "City cannot be empty")
    private String disCity;

    @NotBlank(message = "Owner cannot be empty")
    private String disOwner;

    @NotBlank(message = "Email cannot be empty")
    @Pattern(regexp = "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", message = "Insert format your email = ****@****.co.id ")
    private String disEmail; //Not Same

    @NotBlank(message = "name cannot be empty")
    @Pattern(regexp = "^(^\\+62\\s?|^0)(\\d{3,4}-?){2}\\d{3,4}$" , message = "Number Phone Must be 08****** or 021******")
    private String disPhone; //Not Same

    private String discreatedAt;
    private String discreatedBy;
    private String disupdatedAt;
    private String disupdatedBy;


    public Distributor(String prinId, String prinName, String disId, String disName, String disAddress, String disCity, String disOwner, String disEmail, String disPhone, String discreatedAt, String discreatedBy, String disupdatedAt, String disupdatedBy) {
        this.prinId = prinId;
        this.prinName = prinName;
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

    public String getPrinName() {
        return prinName;
    }

    public void setPrinName(String prinName) {
        this.prinName = prinName;
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
