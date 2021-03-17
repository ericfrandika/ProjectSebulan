import React, { Component } from 'react';
import LabelLog from '../../components/comp_login/label'
import TextLog from '../../components/comp_login/text'
import Recaptcha from 'react-recaptcha'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2'
import './style.css'
import {ReactComponent as BgSvg}  from './bg.svg'
import {ReactComponent as Avatar} from './avatar.svg'

class LoginR extends Component {
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
        console.log(el.target.value)
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
                this.props.history.push("/")
        })
            .catch((e) =>{
                Swal.fire(
                    'Username Or Password Wrong...!!!',
                    'You clicked the button!',
                    'error'
                  )
            })
        }
    }
    render() { 
        const{username , password} = this.state;
        console.log(username)
        return ( 
            <>
        <div className="allLogin">
	    <div className="container">
            
		<div className="img">   
        <BgSvg style={{height:"500px" ,width:"100%"}}/>
		</div>
		<div className="login-content">
				<div className="form">
                <Avatar style={{height:"100px",width:"100%"}}/>
				<div>
				<label className="labelNexChief">Nex</label>
                <label className="labelNex">Chief</label>
				<hr className="garisAtas"/>
				</div>
				<div className="labelPower">
					<label className="LoginPower" style={{color: "wheat"}}>Powerred By Eric Frandika</label>
					</div>
           		<div className="input-div one">
           		   <div className="i">
           		   		<i className="fas fa-user"></i>
           		   </div>
           		   <div className="div">
           		   		<input type="text" name="username" onChange={this.setValue} className="input" placeholder="Username"/>
           		   </div>
           		</div>
           		<div className="input-div pass">
           		   <div className="i" style={{marginLeft:"1%", marginRight:"3%"}}> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	<input type={this.state.passType} onChange={this.setValue} name="password" className="input"  placeholder="Password"/>
            	   </div>
                   <div>
                   <i className={this.state.passType === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick()} style={{color: "wheat", float: "right",marginTop:"14px" ,cursor:"pointer"}}></i>
                   </div>
                
            	</div>
                <Recaptcha className="recaptcha"
                   sitekey="6LexcWYaAAAAAMWp_Rrps67jZRXyLQP86miIV-g1"
                    render="explicit"
                     verifyCallback={this.verifyCallback}
                      onloadCallback={this.recaptchaLoaded}
                    />
                   <button className="btn" onClick={() => this.doLogin({ username, password })} ><b>LOGIN</b></button>
			</div>
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
    
    export default connect(mapStateToProps, mapDispatchToProps)(LoginR);