import React, { Component } from 'react';
import { connect } from 'react-redux';
import "react-alice-carousel/lib/alice-carousel.css";
import Salam from '../home/salam.jpg'
import Salam2 from '../home/salam2.jpg'
import Laptop from '../home/laptop1.jpg'
import Carousel from 'react-elastic-carousel';
import './style.css'
import axios from 'axios';
import Swal from 'sweetalert2';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countPrincipal:0,
            countDistributor:0,
            countCustomer:0,
            apiCount:"http://localhost:8080/admin/nexchief/",
            forbidden:false
        }
    }

    componentDidMount() {
        if(this.state.forbidden===false){
            this.getAPICountPrincipal()
            if(this.state.forbidden===false){
                this.getAPICountDistributor()
                if(this.state.forbidden===false){
                    this.getAPICountCustomer()
                }
            }
        }
    }
    getAPICountPrincipal = () => {
        axios.get(this.state.apiCount+"principal/paging/?page=1&limit=1",{
            headers: {
                'Authorization': "Bearer " +this.props.dataToken       
          }})
          .then(resp => {
            this.setState({
                countPrincipal:resp.data.count
            })
          })
          .catch((resp) => {
            if(resp.response.status === 403){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: ' Session expired, please login again'
                  })
                  this.setState({
                    forbidden:true
                  })
                this.props.logout()             
            }
          })
      }

      getAPICountDistributor=()=>{
        axios.get(this.state.apiCount+"distributor/paging/?page=1&limit=1" ,
        {
            headers: {
                'Authorization': "Bearer " +this.props.dataToken       
          }})
        .then(resp =>{
          this.setState({
             countDistributor :resp.data.count
            })
        })
        .catch((resp) =>{
            if(resp.response.status === 403){  
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: ' Session expired, please login again'
                  })
                  this.setState({
                    forbidden:true
                  })
                this.props.logout()    
            }
        })
    }
    getAPICountCustomer = () => {
        axios.get(this.state.apiCount+"customer/paging/?page=1&limit=1",
        {
            headers: {
                'Authorization': "Bearer " +this.props.dataToken       
          }})
            .then(resp => {
                this.setState({
                    countCustomer: resp.data.count
                })
            })
            .catch((resp) => {
                if(resp.response.status === 403){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: ' Session expired, please login again'
                      })
                      this.setState({
                        forbidden:true
                      })
                    this.props.logout()             
                }
            })
    }

    render() {
        this.props.dataNavbar({ dataNavbar: false})
        const {countPrincipal,countDistributor,countCustomer} =this.state
        return (
            <>
                <div className="bdyhome">
                    <div className="bodyKiriHome">

                    </div>
                    <div className="bodyKananHome">

                        
                        <div className="bodyCarousell">
                            <Carousel >
                                <img src={Salam} className="sliderimg" alt="" />
                                <img src={Salam2} className="sliderimg" alt="" />
                                <img src={Laptop} className="sliderimg" alt="" />
                            </Carousel>
                        </div>



                        <div className="bodyhomebawah">
                            <div className="bodyhomebawahHeader">
                                    <center><label className="labelNexChief1">Nex</label>
                                    <label className="labelNex1">Chief</label>
                                    <label className="labelHomeAdmin">Admin</label>
                                    </center>
                            </div>
                            <div className="bodyhomebawahIsi">
                                <div className="bodyhomebawahIsiSemua" >
                                    <div className="bodyhomebawahIsiSemuaHeader">
                                        <label style={{ color: 'white', fontFamily: '-moz-initial' }}><center><b>TOTAL PRINCIPAL</b></center></label>
                                    </div>
                                    <div className="bodyhomebawahIsiSemuaHeaderBawah">
                                        <div className="bodyhomebawahIsiSemuaHeaderBawahKiri">
                                            <i className="fas fa-tags" style={{ color: "white", display: 'inline-block', fontSize: "50px", marginTop: "25%", marginLeft: "15%" }}></i>
                                        </div>
                                        <div className="bodyhomebawahIsiSemuaHeaderBawahKanan">
                                        <h2 style={{marginTop:"20%",color: 'white',fontFamily: '-moz-initial' }}>{countPrincipal} Principal</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="bodyhomebawahIsiSemua" >
                                    <div className="bodyhomebawahIsiSemuaHeader">
                                        <label style={{ color: 'white', fontFamily: '-moz-initial' }}><center><b>TOTAL DISTRIBUTOR</b></center></label>
                                    </div>
                                    <div className="bodyhomebawahIsiSemuaHeaderBawah">
                                    <div className="bodyhomebawahIsiSemuaHeaderBawahKiri">
                                            <i className="fas fa-hand-holding-usd" style={{ color: "white", display: 'inline-block', fontSize: "50px", marginTop: "25%", marginLeft: "15%" }}></i>
                                        </div>
                                        <div className="bodyhomebawahIsiSemuaHeaderBawahKanan">
                                            <h2 style={{marginTop:"20%",color: 'white',fontFamily: '-moz-initial' }}>{countDistributor} Distributor</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="bodyhomebawahIsiSemua" >
                                    <div className="bodyhomebawahIsiSemuaHeader">
                                        <label style={{ color: 'white', fontFamily: '-moz-initial' }}><center><b>TOTAL CUSTOMER</b></center></label>
                                    </div>
                                    <div className="bodyhomebawahIsiSemuaHeaderBawah">
                                    <div className="bodyhomebawahIsiSemuaHeaderBawahKiri">
                                            <i className="fas fa-id-badge" style={{ color: "white", display: 'inline-block', fontSize: "50px", marginTop: "25%", marginLeft: "15%" }}></i>
                                        </div>
                                        <div className="bodyhomebawahIsiSemuaHeaderBawahKanan">
                                        <h2 style={{marginTop:"20%",color: 'white',fontFamily: '-moz-initial' }}>{countCustomer} Customer</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    checkLogin: state.authReducer.isLogin,
    dataLoginUser: state.authReducer.userLogin,
    dataToken : state.authReducer.token
})

const mapDispatchToProps = dispatch => {
    return {
        submitLogin: (data) => dispatch({ type: "LOGIN", payload: data }),
        logout: () => dispatch({ type: "LOGOUT" }),
        dataNavbar: (data) => dispatch({ type: "NAVBAR", payload: data }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);