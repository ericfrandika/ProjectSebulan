package com.example.demo.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class Customer {

    @NotBlank(message = "Custommer Id cannot be empty")
    private String cusId;
    @NotBlank (message = "Customer Name Cannot be empty")
    @Pattern(regexp = "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$", message = "Username is 8-20 characters long")
    private String cusName;
    @NotBlank (message = "Customer Password Cannot be empty")
    @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-8])(?=.*?[^\\w\\s]).{8,}$", message = "Password at least 8 characters, 1 numeric character , 1 lowercase letter, 1 uppercase letter, 1 special character")
    private String cusPass;
    @NotBlank (message = "Customer Address Cannot be empty")
    private String cusAddress;
    @NotBlank (message = "Customer Phone Cannot be empty")
    @Pattern(regexp = "^(^\\+62\\s?|^0)(\\d{3,4}-?){2}\\d{3,4}$" , message = "Number Phone Must be 08****** or 021******")
    private String cusPhone;
    @NotBlank (message = "Customer Principal Cannot be empty")
    private String prinId;
    private String prinName;
    private String disId;
    private String disName;
    @NotBlank (message = "Choice Disbale Login (On / Off)")
    private String cusOnOff;
    @NotBlank (message = "Choice date Registrasition")
    private String cusRegis;
    @NotBlank (message = "Date Validation cannot Be Empty")
    private String cusValid;

    private String cuscreatedAt;
    private String cuscreatedBy;
    private String cusupdatedAt;
    private String cusupdatedBy;

    public  Customer(){

    }

    public Customer(@NotBlank(message = "Custommer Id cannot be empty") String cusId, @NotBlank(message = "Customer Name Cannot be empty") @Pattern(regexp = "^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$", message = "Username is 8-20 characters long") String cusName, @NotBlank(message = "Customer Password Cannot be empty") @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-8])(?=.*?[^\\w\\s]).{8,}$", message = "Password at least 8 characters, 1 numeric character , 1 lowercase letter, 1 uppercase letter, 1 special character") String cusPass, @NotBlank(message = "Customer Address Cannot be empty") String cusAddress, @NotBlank(message = "Customer Phone Cannot be empty") @Pattern(regexp = "^(^\\+62\\s?|^0)(\\d{3,4}-?){2}\\d{3,4}$", message = "Number Phone Must be 08****** or 021******") String cusPhone, @NotBlank(message = "Customer Principal Cannot be empty") String prinId, String prinName, String disId, @NotBlank(message = "Choice Disbale Login (On / Off)") String cusOnOff, @NotBlank(message = "Choice date Registrasition") String cusRegis, @NotBlank(message = "Date Validation cannot Be Empty") String cusValid, String cuscreatedAt, String cuscreatedBy, String cusupdatedAt, String cusupdatedBy) {
        this.cusId = cusId;
        this.cusName = cusName;
        this.cusPass = cusPass;
        this.cusAddress = cusAddress;
        this.cusPhone = cusPhone;
        this.prinId = prinId;
        this.prinName = prinName;
        this.disId = disId;
        this.cusOnOff = cusOnOff;
        this.cusRegis = cusRegis;
        this.cusValid = cusValid;
        this.cuscreatedAt = cuscreatedAt;
        this.cuscreatedBy = cuscreatedBy;
        this.cusupdatedAt = cusupdatedAt;
        this.cusupdatedBy = cusupdatedBy;
    }

    public Customer(String cusId, String cusName, String cusPass, String cusAddress, String cusPhone, String prinId, String prinName, String disId, String disName, String cusOnOff, String cusRegis, String cusValid, String cuscreatedAt, String cuscreatedBy, String cusupdatedAt, String cusupdatedBy) {
        this.cusId = cusId;
        this.cusName = cusName;
        this.cusPass = cusPass;
        this.cusAddress = cusAddress;
        this.cusPhone = cusPhone;
        this.prinId = prinId;
        this.prinName = prinName;
        this.disId = disId;
        this.disName = disName;
        this.cusOnOff = cusOnOff;
        this.cusRegis = cusRegis;
        this.cusValid = cusValid;
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

    public String getCusOnOff() {
        return cusOnOff;
    }

    public void setCusOnOff(String cusOnOff) {
        this.cusOnOff = cusOnOff;
    }

    public String getCusRegis() {
        return cusRegis;
    }

    public void setCusRegis(String cusRegis) {
        this.cusRegis = cusRegis;
    }

    public String getCusValid() {
        return cusValid;
    }

    public void setCusValid(String cusValid) {
        this.cusValid = cusValid;
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
