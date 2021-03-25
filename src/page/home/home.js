import React, { Component } from 'react';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import HomePng from '../home/home.png'
import HomesPng from '../home/home2.jpg'
import { Link, Redirect } from 'react-router-dom';
import Carousel from 'react-elastic-carousel';

import './style.css'
import axios from 'axios';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countPrincipal:0,
            countDistributor:0,
            countCustomer:0,
        }
    }

    componentDidMount() {
        this.getAPICountPrincipal()
        this.getAPICountDistributor()
        this.getAPICountCustomer()
    }
    getAPICountPrincipal = () => {
        axios.get("http://localhost:8080/admin/nexchief/principal/count/")
          .then(resp => {
            this.setState({
                countPrincipal:resp.data
            })
          })
          .catch(() => {
            alert("Failed fetching")
          })
      }

      getAPICountDistributor=()=>{
        axios.get("http://localhost:8080/admin/nexchief/distributor/count/")
        .then(resp =>{
          this.setState({
             countDistributor :resp.data
            })
        })
        .catch(() =>{
          alert("Failed fetching")
        })
    }
    getAPICountCustomer = () => {
        axios.get("http://localhost:8080/admin/nexchief/customer/count/")
            .then(resp => {
                this.setState({
                    countCustomer: resp.data
                })
            })
            .catch(() => {
                alert("Failed fetching")
            })
    }

    render() {

        if (this.props.checkLogin === false) {
            <Redirect to="/" />
        }
        const {countPrincipal,countDistributor,countCustomer} =this.state
        return (
            <>
                <div className="bdyhome">
                    <div className="bodyKiriHome">

                    </div>
                    <div className="bodyKananHome">
                        <div className="bodyCarousell">
                            <Carousel >
                                {/* {this.state.items.map(item => <div key={item.id}>{item.title}</div>)} */}
                                <img src={HomePng} className="sliderimg" alt="" />
                                <img src={HomesPng} className="sliderimg" alt="" />
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
    dataLoginUser: state.authReducer.userLogin

})

const mapDispatchToProps = dispatch => {
    return {
        submitLogin: (data) => dispatch({ type: "LOGIN", payload: data }),
        logout: () => dispatch({ type: "LOGOUT" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);