import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, Redirect } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'

const verifLogout = (logout,history) => {
  Swal.fire({
    title: 'Do you want to Logout?',
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

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
  if (props.dataNavbar === true){
    Swal.fire(
      'Good job!',
      '',
      'warning'
    )
  }
  else{
  setSidebar(!sidebar);
  }
}
  console.log("data login Navbar " , props.dataLoginUser)
  console.log(props.dataNavbar)
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }} >
        <div className='navbar1' >
        {/* disabled={props.dataNavbar} */}
        {/* onClick={()=>{navBarClick(props.dataNavbar)}} */}
          {/* <Link to='#'  className='menu-bars1'> */}
            <FaIcons.FaBars style={{cursor:'pointer'}} className='menu-bars1' onClick={()=>{showSidebar()}} />
          {/* </Link> */}
          <div className="thisHeader1" style={{fontFamily:"Georgia, serif"}}>
                <div className="bungkusWelcome" style={{marginRight:"240%" }}>
                <div>
                <label className="welcome"><b>WELCOME</b></label>
                </div>
                <div>
                <label className="admin" ><b>{props.dataLoginUser.username}</b></label>
                </div>
                </div>
                <div className="thisLogout">
                <div>
                <i className="fas fa-sign-out-alt" onClick={()=>{verifLogout(props.logout, props.history)}} style={{color:"#cd0000",display:'inline-block', width:"70px" ,marginLeft:"15px",fontSize:"30px" ,cursor:"pointer"}}></i>
                </div>
                <div>
                    <label style={{color:"white"}}><b>LOGOUT</b></label>
                </div>
                </div>
            </div>
        </div>

        <nav className={sidebar ? 'nav-menu1 active' : 'nav-menu1'}>
          <ul className='nav-menu-items1' onClick={showSidebar}>
            <li className='navbar-toggle1'>
              <Link to='#' className='menu-bars1'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span style={{marginLeft:"5%"}}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
      
          </ul>
        </nav>
    
      </IconContext.Provider>
      
    </>
  );
}

 
const mapStateToProps = state => ({
  checkLogin: state.authReducer.isLogin,
  dataLoginUser : state.authReducer.userLogin,
  dataNavbar :state.authReducer.statusNavbar

})

const mapDispatchToProps = dispatch => {
  return {
      submitLogin: (data) => dispatch({ type: "LOGIN", payload: data }),
      logout: ()=>dispatch({type:"LOGOUT"})
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);
