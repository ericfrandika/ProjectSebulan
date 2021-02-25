import React, { Component } from 'react';
import LabelLog from '../../components/comp_login/label'
import TextLog from '../../components/comp_login/text'
import './style.css' 
import Recaptcha from 'react-recaptcha'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    recaptchaLoaded =()=>{
        console.log('Capctcha sukses')

    }
    verifyCallback = (response)=>{
        if(response){

        }
    }
    render() { 
        return (
            <>
            <div className="bodyLogin">
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
                   <TextLog className="password" onChange={this.setValue} name="password" type="password" placeholder="Password"></TextLog>
               </div>
               <div>
               <Recaptcha className="recaptcha"
                   sitekey="6LexcWYaAAAAAMWp_Rrps67jZRXyLQP86miIV-g1"
                    render="explicit"
                     verifyCallback={this.verifyCallback}
                      onloadCallback={this.recaptchaLoaded}
                    />
               </div>
               <div>
                   <button className="login"><b>LOGIN</b></button>
               </div>

                </div>
                
            </div>
            </>
          );
    }
}
 
export default Login;