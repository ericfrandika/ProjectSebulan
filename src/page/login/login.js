import React, { Component } from 'react';
import LabelLog from '../../components/comp_login/label'
import TextLog from '../../components/comp_login/text'
import './style.css' 
import Recaptcha from 'react-recaptcha'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:"",
            password:"",
            passType: "password",
            loginData:{},
            response:""
         }
    }
    recaptchaLoaded =()=>{
        console.log('Capctcha sukses')
    }
    verifyCallback = (response)=>{
        if(response){
            this.setState({
                response:response
            })
        }
        console.log(this.state.response)
    }
    passClick = () => {
        console.log("pass");
        const passTypeTemp = this.state.passType
        if (passTypeTemp === "password") {
            this.setState({
                passType: "text"
            })
        } else {
            this.setState({
                passType: "password"
            })
        }
    }
    setValue = (el)=>{
        this.setState({
            [el.target.name] :el.target.value
        })
    }
    doLogin = (object) =>{
        const {username , password} =object
        if(username === "" || password ==="" ||this.state.response ===""){
            Swal.fire(
                'Insert Your Username and Password!',
                'You clicked the button!',
                'error'
              )
        }
        else{       
            axios.get("http://localhost:8080/admin/nexchief/login/?username="+username+"&password="+password)
            .then((resp) =>{
                Swal.fire(
                    'Login Success',
                    'You clicked the button!',
                    'success'
                  )
              this.setState({
                loginData :resp.data,
                })
                this.props.submitLogin({dataLogin : resp.data})
                
        })
            .catch((e) =>{
                console.log(e.response.data.errorMessage)
                Swal.fire(
                    e.response.data.errorMessage,
                    'You clicked the button!',
                    'error'
                  )
            })
        }
    }
    render() { 
        const{username , password} = this.state;
        return (
            <>
            <div className="bodyLogin" >
                <div className="containerLogin">
                <div>
                    <LabelLog className="labelAdmin">*Admin</LabelLog>
                </div>
                    <LabelLog className="labelNexChief">Nex</LabelLog>
                    <LabelLog className="labelNex">Chief</LabelLog>
                <hr className="garisAtas"/>
                <div>
                <LabelLog className="LoginPower">Powerred By Eric Frandika</LabelLog>
                </div>
                <div>
                <i className="fa fa-user-circle" aria-hidden="true" style={{color:"white",display:'inline-block', width:"70px" ,fontSize:"30px"}}></i>
                <TextLog className="userName" type="text" onChange={this.setValue} name="username"placeholder="Username"> </TextLog>
                </div>
               <div>
               <i className="fas fa-lock" style={{color:"white",display:'inline-block', width:"70px" ,fontSize:"30px"}}></i>
                   <TextLog className="password" onChange={this.setValue} name="password" type={this.state.passType}  placeholder="Password"></TextLog>
                   <i className={this.state.passType === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick()} style={{ color: "grey", marginLeft: "-20px" }}></i>
               </div>
               <div  className="div-recaptcha">
               <Recaptcha className="recaptcha"
                   sitekey="6LexcWYaAAAAAMWp_Rrps67jZRXyLQP86miIV-g1"
                    render="explicit"
                     verifyCallback={this.verifyCallback}
                      onloadCallback={this.recaptchaLoaded}
                    />
               </div>
               <div>
                   <button className="login" onClick={() => this.doLogin({ username, password })} ><b>LOGIN</b></button>
               </div>

                </div>
                
            </div>
            </>
          );
    }
}
 
const mapStateToProps = state => ({ // NGAMBIL DATA
    checkLogin: state.authReducer.isLogin,

})

const mapDispatchToProps = dispatch => { // NGIRIM DATA
    return {
        submitLogin: (data) => dispatch({ type: "LOGIN", payload: data }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);