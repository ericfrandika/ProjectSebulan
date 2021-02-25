import React, { Component } from 'react';
import './style.css'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
                <div className="bodyHome">
                <div className="containerHome">
                    <div className="atas">
                        <div>
                    <i class="fas fa-tags " style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"100px"}}></i>
                    <i class="fas fa-truck" style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"100px"}}></i>
                        </div>
                        <div>
                            <label className="principal" style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"20px"}} >PRINCIPAL</label>
                            <label className="distrubutor"style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"20px"}}>DISTRIBUTOR</label>
                        </div>
                    </div>
                    <div className="bawah" >
                        <div>
                    <i class="fas fa-users"style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"100px"}}></i>
                    <i class="fas fa-database"style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"100px"}}></i>
                       </div>
                       <div>
                            <label className="principal" style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"20px"}} >CUSTOMER</label>
                            <label className="distrubutor"style={{color:"white",display:'inline-block', width:"250px" ,marginLeft:"15px",fontSize:"20px"}}>DATABASE</label>
                       </div>
                    </div>

                </div>
                </div> 
            </>
                 );
    }
}
 
export default Home;