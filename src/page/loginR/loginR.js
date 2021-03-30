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
import Kotak from '../../components/compDiv/div';
import Tombol from '../../components/compButton/button';
import Ikon from '../../components/compIcon/FontIcon';
import LabelPrin from '../../components/comp_principal/labelPrin';
import Garis from '../../components/compGaris/garis';
import InputPrin from '../../components/comp_principal/inputPrin';

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
        })
            .catch((err) =>{
                console.log(err.response.data);
                Swal.fire(
                    err.response.data.errorMessage,
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
        <Kotak className="allLogin">
	    <Kotak className="container">
            
		<Kotak className="img">   
        <BgSvg style={{height:"500px" ,width:"100%"}}/>
		</Kotak>
		<Kotak className="login-content">
				<Kotak className="form">
                <Avatar style={{height:"100px",width:"100%"}}/>
				<Kotak>
				<LabelPrin className="labelNexChief">Nex</LabelPrin>
                <LabelPrin className="labelNex">Chief</LabelPrin>
				<Garis className="garisAtas"/>
				</Kotak>
				<Kotak className="labelPower">
					<LabelPrin className="LoginPower" style={{color: "wheat"}}>Powerred By Eric Frandika</LabelPrin>
					</Kotak>
           		<Kotak className="input-div one">
           		   <Kotak className="i">
           		   		<Ikon className="fas fa-user"></Ikon>
           		   </Kotak>
           		   <Kotak className="div">
           		   		<InputPrin type="text" name="username" onChange={this.setValue} className="input" placeholder="Username"/>
           		   </Kotak>
           		</Kotak>
           		<Kotak className="input-div pass">
           		   <Kotak className="i" style={{marginLeft:"1%", marginRight:"3%"}}> 
           		    	<Ikon className="fas fa-lock"></Ikon>
           		   </Kotak>
           		   <Kotak className="div">
           		    	<InputPrin type={this.state.passType} onChange={this.setValue} name="password" className="input"  placeholder="Password"/>
            	   </Kotak>
                   <Kotak>
                   <Ikon className={this.state.passType === "password" ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={() => this.passClick()} style={{color: "wheat", float: "right",marginTop:"14px" ,cursor:"pointer"}}></Ikon>
                   </Kotak>
                
            	</Kotak>
                <Recaptcha className="recaptcha"
                   sitekey="6LexcWYaAAAAAMWp_Rrps67jZRXyLQP86miIV-g1"
                    render="explicit"
                     verifyCallback={this.verifyCallback}
                      onloadCallback={this.recaptchaLoaded}
                    />
                   <Tombol className="btn" onClick={() => this.doLogin({ username, password })} ><b>LOGIN</b></Tombol>
			</Kotak>
        </Kotak>
    </Kotak>
</Kotak>
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