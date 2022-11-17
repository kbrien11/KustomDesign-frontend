import React, { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage} from "./firebaseConfig"
import { FaPlus,FaMinus } from "react-icons/fa";



const Test = () => {
  const [inputImage, setInputimage] = useState("");
  const [toggleImage, setimageToggle] = useState(false);
  const [toggleSize, setSizeToggle] = useState(false);
  const [addedImage, setAddedImageText] = useState(false);
  const [inputSize, setInputSize] = useState("");
  const[image,setImages] = useState([])
 
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handChange = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
   
    addImage(file);
  };

  let imgPath = "";

  const addImage = async (file) => {

    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);
    console.log(sotrageRef)
    console.log(uploadTask)
    

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            imgPath += downloadURL
            const userid = sessionStorage.getItem('userpk')
            const endpoint = `http://127.0.0.1:8000/api/uploadImage/${userid}`;
            const data = {
              image: imgPath,
              size: inputSize,
            };
            const configs = {
              method: "POST",
              mode: "cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            };
           
            const response = await fetch(endpoint, configs);
            const res = await response.json();
            console.log(res);
            if(res){
                setAddedImageText(true)
            }
            console.log(imgPath);
            setProgress(0);
        });
      }
    );
  };

  const toggleImageButtonOn =()=>{
    console.log("clicked")
    setimageToggle(true)
  }
  const toggleImageButtonOff =()=>{
    console.log("clicked")
    setimageToggle(false)
  }
   
  const toggleSizeButtonOn =()=>{
    console.log("clicked")
    setSizeToggle(true)
  }
  const toggleSizeButtonOff =()=>{
    console.log("clicked")
    setSizeToggle(false)
  }

  

  return (
    <div>
        
        <div className="addImageContainer">
            <div className="image-size-inputs">
            
        {!toggleImage ? <div>
            <h4>  1) <span> Upload image <span><button className="expand-button" onClick={(e) => toggleImageButtonOn()}> Expand <span> <FaPlus/></span></button></span></span> </h4>
            </div>: <div>
            
            <h4>  1) <span> Upload image <span><button className="expand-button" onClick={(e) => toggleImageButtonOff()}> Close <span> <FaMinus/></span></button></span></span> </h4>
            </div>
            } <br/>
           
            

{!toggleSize ? <div>
            <h4>  2) <span> Select Size <span><button className="expand-button" onClick={(e) => toggleSizeButtonOn()}> Expand <span> <FaPlus/></span></button></span></span> </h4>
            </div>: <div>
            <h4>  2) <span> Select Size  <span><button className="expand-button" onClick={(e) => toggleSizeButtonOff()}> Close <span> <FaMinus/></span></button></span></span> </h4>
            </div>
            } </div>
            
        
          
    <form onSubmit={handChange}>
    {toggleImage &&  <input type="file" className="input" /> }<br/>
    {toggleSize &&<input
        type="text"
        placeholder="Size.."
        onChange={(e) => setInputSize(e.target.value)}
      />} <br/>
   
       
        <button type="submit" >Upload</button>
        {addedImage && <h5> Congrats! Image added</h5>}
        </form>
      </div>
    
    </div>
  );
};

export default Test;
