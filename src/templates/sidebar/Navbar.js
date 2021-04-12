import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      sidebar:false
     } 
  }
  showSidebar = () => {
    if (this.props.dataNavbar === true){
      Swal.fire(
        'finish input your data!!',
        '',
        'warning'
      )
    }
    else{
    this.setState({
      sidebar:true
    })
    }
  }
  hideSidebar=()=>{
    this.setState({
      sidebar:false
    })
  }
  verifLogout = (logout,history,dataNavbar) => {
    if (dataNavbar === true){
      Swal.fire(
        'Cannot Logout. Finish input your data!!',
        '',
        'warning'
      )
    }
    else{
    Swal.fire({
      title: 'Do you want to Logout?',
      icon:'question',
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('LogOut Success..!', '', 'success')
        logout();
        history.push("/")
      } 
    })
  }
  }
  render() { 

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }} >
        <div className='navbar1' >
            <FaIcons.FaBars style={{cursor:'pointer'}} className='menu-bars1' onClick={()=>{this.showSidebar()}} />
          <div className="thisHeader1" style={{fontFamily:"Georgia, serif"}}>
                <div className="bungkusWelcome" style={{marginRight:"1%" }}>
                <div>
                <label className="welcome"><b>WELCOME</b></label>
                </div>
                <div>
                <label className="admin" ><b><center>{this.props.dataLoginUser.username}</center></b></label>
                </div>
                </div>
            </div>
            <div className="thisLogout">
                <div>
                <i className="fas fa-sign-out-alt" onClick={()=>{this.verifLogout(this.props.logout, this.props.history,this.props.dataNavbar)}} style={{color:"#cd0000",display:'inline-block', width:"70px" ,marginLeft:"15%",fontSize:"30px" ,cursor:"pointer"}}></i>
                </div>
                <div>
                    <label style={{color:"white"}}><b>LOGOUT</b></label>
                </div>
                </div>
        </div>

        <nav className={this.state.sidebar ? 'nav-menu1 active' : 'nav-menu1'} disabled={this.props.dataNavbar}>
          <ul className='nav-menu-items1' onClick={()=>{this.hideSidebar()}}>
            <li className='navbar-toggle1'>
                <AiIcons.AiOutlineClose className='menu-bars1' style={{cursor:'pointer'}} />
            </li>
            {SidebarData.map((item, index) => {
              return (
                <div  key={index} disabled={this.props.dataNavbar}>
                <li className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span style={{marginLeft:"5%"}}>{item.title}</span>
                  </Link>
                </li>
                </div>
              );
            })}
      
          </ul>
        </nav>
    
      </IconContext.Provider>
      
    </>
  );
}
}

 
const mapStateToProps = state => ({
  checkLogin: state.authReducer.isLogin,
  dataLoginUser : state.authReducer.userLogin,
  dataNavbar :state.tableCondiReducer.statusNavbar

})

const mapDispatchToProps = dispatch => {
  return {
      submitLogin: (data) => dispatch({ type: "LOGIN", payload: data }),
      logout: ()=>dispatch({type:"LOGOUT"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);
