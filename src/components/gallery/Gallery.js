import React from 'react';
import axios from 'axios';
import '../../App.css';
import GalleryView from './GalleryView';
class Gallery extends React.Component {
    state={
        selectedFiles:null,
        resp:null
    };
    onFileChange = event=>{
        this.setState({
            selectedFiles:event.target.files,
            resp:null
        });
    }
    onSuccess = (response)=>{
        this.setState({
            selectedFiles:this.state.selectedFiles,
            resp:response
        })
    }
    onFileUpload=()=>{
        var _this=this;
        const formData = new FormData();
        if(this.state.selectedFiles){
            for(let i=0;i<this.state.selectedFiles.length;i++){
                formData.append("filename[]",this.state.selectedFiles[i]);
            }
        }
        console.log(this.state.selectedFiles);
        console.log(formData);
        axios.post("http://localhost:8000/api/gallery",formData).then(
            function(response){
                console.log(response);
                _this.onSuccess(response);
            }
            
        ).catch(function(error){
            console.log(error);
            
        });
    }
    fileData =() => {
        if(this.state.selectedFiles){
           /* return (
                <div>
                    <h2>File Details: </h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p> 
                        Last Modified:{" "} 
                        {this.state.selectedFile.lastModifiedDate.toDateString()} 
                    </p>
                </div>
            )
            */
           return (
            <div>
                <br/>
                <h4>Files Selected</h4>
        </div>
           )
        } else {
            return (
                <div>
                    <br/>
                    <h4>Please select file</h4>
                </div>
            )
        }
    }
    
    render(){
        return(
            <div>
                <h1>Image Upload</h1>
                <div>
                    <input type="file" multiple onChange={this.onFileChange}/>
                    <button onClick={this.onFileUpload}>Upload</button>
                </div>
                {this.fileData()}
                <div>
                    <GalleryView/>
                </div>
            </div>
        );
    }
}
export default Gallery;