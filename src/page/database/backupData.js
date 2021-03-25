import React, { Component } from 'react';
import './style.css'
import axios from 'axios'
import Swal from 'sweetalert2';
import { Redirect } from 'react-router';

class BackUpData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            nmDatabase:"",
            fileData:"",
            backUpdata:[],
            nameDatabase:"",
         }
    }

    componentDidMount(){
        this.getAPIDownload();
        this.getApiALLBackup();
    }
    setValueFile = (el)=>{
        console.log(el);
        this.setState({
            [el.target.name] : el.target.files[0]
        })
    }
    HandleRestore=()=>{
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
          }).then((result) => {
            if (result.isConfirmed) {
                const file= new FormData();
                file.append('nameDatabase',this.state.nameDatabase,this.state.nameDatabase.name)
                axios.post("http://localhost:8080/admin/nexchief/uploadRestore/", file)
               .then((resp) => {
                this.setState({
                    nameDatabase:""
            })
            Swal.fire('Saved!', '', 'success')
        })
            .catch((resp)=>{
                this.setState({
                    nameDatabase:""
            })
            })
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }
     //--------------------------------------GET API ALL---------------------------------------------
     getApiALLBackup =()=>{
        axios.get("http://localhost:8080/admin/nexchief/all/backupdatabase/")
        .then(resp =>{
            this.setState({
                backUpdata :resp.data
            })
        })
        .catch(() =>{
          alert("Failed fetching")
        })
    }
    getAPIDownload =()=>{
        axios.get("http://localhost:8080/admin/nexchief/backupdatabase/")
        .then(resp =>{
            
        })
        .catch(() =>{
          alert("Failed fetching")
        })
    }
    
    databaseBackup =()=>{
        let createNow =  new Date().toLocaleDateString() +"_"+ new Date().toLocaleTimeString()+"_nexchief.sql"
        let newBackupData = this.state.backUpdata
        const blob =new Blob([newBackupData[0].fileData],{type:"text/plain"});
        this.downloadfile(blob , createNow) 
    }
    downloadfile =(blob,fileName)=>{
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download =fileName;
        a.click();
    }

    render() { 
        console.log("ini Log : ",this.state.nameDatabase);
        const{show,setShow} = this.state
        return (  
            <>
            <div className="bodyDatabase">
                <div className="ContinerData">
                <div className="atasData">
                <i className="fas fa-download"  onClick={()=>this.databaseBackup()} style={{color:"white",marginRight:"27%",display:'inline-block', width:"70px" ,fontSize:"65px",cursor:"pointer"}}></i>
                <a href="#open-modal"> <i className="fas fa-upload" value={this.state.nameDatabase}   style={{color:"white",display:'inline-block', width:"70px" ,fontSize:"65px",cursor:"pointer"}}></i></a>
                </div>
                <div className="bawahData">
                <label className="principal" style={{color:"white",display:'inline-block', width:"250px" ,fontSize:"20px"}} ><b>EXPORT</b></label>
                <label className="principal" style={{color:"white",display:'inline-block', width:"250px" ,fontSize:"20px"}} ><b>IMPORT</b></label>
                </div>    
                </div>
            </div>
<div id="open-modal" className="modal-window">
  <div>
    <a href="#modal-close" title="Close" className="modal-close">close ×</a>
    <h1>Insert Your File ...sql</h1>
    <hr/>
    <div style={{marginBottom:"30%",marginTop:"15%"}}>
    <input className="importFile" type="file"  onChange={(el)=>this.setValueFile(el)} name="nameDatabase"></input>
    </div>
    <div>
    <button onClick={()=>this.HandleRestore()}>Submit</button>
    </div>
  </div>
</div>

            </>
        );
    }
}
 
export default BackUpData;