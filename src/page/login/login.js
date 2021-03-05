import React, { Component } from 'react';
import LabelLog from '../../components/comp_login/label'
import TextLog from '../../components/comp_login/text'
import './style.css' 
import Recaptcha from 'react-recaptcha'
import { Link } from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            passType: "password"
         }
    }
    recaptchaLoaded =()=>{
        console.log('Capctcha sukses')

    }
    verifyCallback = (response)=>{
        if(response){
        }
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
    render() { 
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
                   <Link to ="/home">
                   <button className="login"><b>LOGIN</b></button>
                   </Link>
               </div>

                </div>
                
            </div>
            </>
          );
    }
}
 
export default Login;