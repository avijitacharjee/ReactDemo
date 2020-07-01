import React from 'react';
import axios from 'axios';
import '../../App.css';
class GalleryView extends React.Component {
    state={
        images:null
    };
    refreshImages=event=>{
        var _this=this;
        console.log("hi");
        axios.get("http://localhost:8000/api/gallery").then(
            function(response){
                _this.setState({images:response});
            }
        );
    }
    imageView=()=>{
        if(this.state.images){
            console.log(this.state.images.data.data[0].filename);
            var arr=[];
            for(let i=0;i<this.state.images.data.data.length;i++){
                arr.push(<img src={'http://localhost:8000/gallery/images/'+this.state.images.data.data[i].filename} alt="abc" height="100" width="100" key={i}/>);
                
            }
            
            return <div>{arr}</div>
        }
        else {
            return (<p>Loading</p>)
        }
        
        
    }

    render(){
        return(
            <div>
                <button onClick={this.refreshImages}>Refresh</button> 
                <br/>
                <br/>
                {this.imageView()}
            </div>
        )
    }
}
export default GalleryView;