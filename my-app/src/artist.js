import React, { useState, useEffect }  from "react";
import Images from "./Image";
import { useNavigate } from "react-router-dom";
import * as imageActions from './actions/imageActionTypes'

import {connect} from 'react-redux'
import { bindActionCreators } from "redux";




const ArtistPage = ({images,serviceActions}) => {


console.log(images)
console.log(serviceActions)

    useEffect(() => {serviceActions.getImageData()},([]))

    

      const imageMap =  images.map((img) => {
        return < Images data = {img} />
      } )

      const navigate = useNavigate();
      const logout = ()=>{
        sessionStorage.removeItem('artistid')
        sessionStorage.removeItem('userpk')
        navigate('/login')
    }

    const viewProfile = () => {
        const artistid = sessionStorage.getItem('artistid')
        navigate(`/artistProfilePage${artistid}`)

    }

    return (
        <div>
             <button onClick={(e) => logout()}> Logout</button>

             <button onClick={(e) => viewProfile()}> Profile</button>
       
        <div>
            <div class="artist-header">
            <h3> View current Images</h3>
            </div>
        <div class="grid-wrapper" >
            <div class="grid-container">
            
            {imageMap}
            
           
            </div>
         
            
        </div>
        
        </div>
        </div>
    )
}


const mapStateToProps = (state)=> ({

  images:state.images

})

const mapDispatchToProps = (dispatch) => ({
  serviceActions: bindActionCreators({...imageActions.imageServices},dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(ArtistPage)