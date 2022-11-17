import { async } from '@firebase/util';
import React,{useState,useEffect} from 'react';
import { FaCommentAlt,FaHeart,FaTrash,FaThumbsUp} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Images = (props) => {
    const [addLikeText, setAddLikeText] = useState(false);
    const [addLikeTextError, setAddLikeTextError] = useState(false);
    const [matchText, setMatchText] = useState(false);
    const [usernames,setUserNames] = useState([])
   const artist_id = sessionStorage.getItem('artistid')
   const image_id = props.data.id 

   const userpk = sessionStorage.getItem('userpk')

   console.log(  `userpk/${userpk}`)

   useEffect(() => {getUserNames()},[])

   const navigate = useNavigate();

    const addLike = async() => {
        const endpoint = `http://127.0.0.1:8000/api/addLikeToImage/${artist_id}/${image_id}`;
        
        const configs = {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(endpoint, configs);
        const res = await response.json();
        if(res.data){
            setAddLikeText(true)
            setTimeout(addToLikeTimeout,5000)
        }
        else if(res.error === "artist already added "){
            setAddLikeTextError(true)
            setTimeout(addToLikeErrorTimeout,5000)
        }
        else{
            setAddLikeTextError(true)
        }
    }

    const addToLikeTimeout = () => {
        setAddLikeText(false)
    }
    const addToLikeErrorTimeout = () => {
        setAddLikeTextError(false)
    }


    const deleteImage = async() => {
        const endpoint = `http://127.0.0.1:8000/api/deleteImage/${userpk}/${image_id}`;
        
        const configs = {
          method: "DELETE",
          mode: "cors",
          headers: { "Content-Type": "application/json" }
        };
        const response = await fetch(endpoint, configs);
        const res = await response.json();
        if(res.data){
            window.location.reload()
        }
        else{
            console.log("error with deleting image")
        }
    }

    console.log(props.data.artist_id)


    const getUserNames = async() => {
        try{
        const response = await fetch(
            `http://127.0.0.1:8000/api/artists/${props.data.artist_id}`
            
        );
        const res = await response.json()
        setUserNames(res.data)
        console.log(res.data)
    } catch(error){
        console.log("errror")
    }
}


let nameToCheck = ""
const addMatch = async (x) => {

    try{
        const response = await fetch(
            `http://127.0.0.1:8000/api/addMatch/${userpk}/${x}/${image_id}`
            
        );
        const res = await response.json()
        setMatchText(true)
        
        console.log(res)
    } catch(error){
        console.log("errror")
    }
}

const viewProfile = (name) =>{
    navigate(`/artistProfilePage${name}`
    )
}

console.log(nameToCheck)

const userNameMap = usernames.map((name) => {
    nameToCheck = name
    return  <div  >
        <h4> {name} <span> <button onClick={(e) => viewProfile(name)}> profile </button> <span><button onClick={(e) => addMatch(name)}> match </button> </span></span></h4>

       
        </div>
} )

  
    



    return (
   
        <div>
           
            <div className='image'>
            <img src = {props.data.image} width="100" height="190"></img>
            <div className='image-container'>
            
           {userpk ===null ? <h4> like  <span><button onClick={(e) => addLike()}> <FaHeart/></button></span> <span> Comment<span><FaCommentAlt/> </span></span></h4> :
           <div className='userGrid'>
           <div className='likes'>  {props.data.artist_id.length > 0 &&  <div> <h5><FaThumbsUp /> <span className='numberOfLikes'> {props.data.artist_id.length} </span> </h5></div>}  <span className='removeImage'><span><button onClick={(e) => deleteImage()}> <FaTrash/></button></span></span></div> </div>}

           {userpk != null &&
           <div classname = "profile-button">
        
             {userNameMap} 
             <hr></hr>
           </div>
           }
            </div>
          
            </div>
            <div className='MatchAdded'>{matchText && <p>  Match added with {nameToCheck}</p>}</div>
            
            {addLikeText && <p> Like sent</p>}
            {addLikeTextError && <p> You already have liked this image</p>}
            </div>
        
    
    
    )
}

export default Images