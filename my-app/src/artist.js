import React, { useState, useEffect }  from "react";
import Images from "./Image";
import { useNavigate } from "react-router-dom";




const ArtistPage = () => {

    const[image,setImages] = useState([])


    useEffect(() => {getImages()},([]))

    const getImages = async () => {
  
        try{
        const response = await fetch('http://127.0.0.1:8000/api/images');
        const res = await response.json();
        setImages(res.images);
        console.log("imgagessss")
      } catch(error) {
        console.log(error)
      
      }
      };

      const imageMap = image.map((img) => {
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

export default ArtistPage