import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage} from "./firebaseConfig"

const Register = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputUserType, setUserType] = useState("");
  const [inputFirstName, setFirstName] = useState("");
  const [inputLastName, setLastName] = useState("");
  const [inputUsername, setUserName] = useState("");

  const [progress, setProgress] = useState(0);


  const handChange = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
   
    addImage(file);
  };

  let imgPath = "";

  const addImage = async (file) => {
    console.log(file)
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
            const endpoint = "http://127.0.0.1:8000/api/register";
            const data = {
                email: inputEmail,
                password: inputPassword,
                user_type:inputUserType,
                first_name:inputFirstName,
                last_name:inputLastName,
                username:inputUsername,
                profile_image:imgPath
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
                if (res.type.length > 0) {
                    navigate("/login");
                  }
            }
            else {
                console.log("error");
              }
        });
      }
    );
  };

  const navigate = useNavigate();

//   const RegisterButton = async () => {
//     const endpoint = "http://127.0.0.1:8000/api/register";
//     const data = {
//       email: inputEmail,
//       password: inputPassword,
//       user_type:inputUserType,
//       first_name:inputFirstName,
//       last_name:inputLastName,
//       username:inputUsername,
//       profile_img:imgPath
//     };
//     const configs = {
//       method: "POST",
//       mode: "cors",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     };
//     const response = await fetch(endpoint, configs);
//     const res = await response.json();
//     if (res) {
//       if (res.type.length > 0) {
//         navigate("/login");
//       }
//     } else {
//       console.log("error");
//     }
//   };

  return (
    <div>
         
         <input type="text" placeholder="First name.." onChange={(e) => setFirstName(e.target.value)} />{" "}
         <input type="text" placeholder="Last name.." onChange={(e) => setLastName(e.target.value)} />{" "}
         <input type="text" placeholder="Email.." onChange={(e) => setInputEmail(e.target.value)} />{" "}
      <input type="text" placeholder="Username.." onChange={(e) => setUserName(e.target.value)} />{" "}
      <input
        type="text"
        placeholder="Password.."
        onChange={(e) => setInputPassword(e.target.value)}
      />{" "}

<input
        type="text"
        placeholder="User Type.."
        onChange={(e) => setUserType(e.target.value)}
      />{" "}
<form onSubmit={handChange}>
<input type="file" /> 
      <button type = "submit"> Register</button>
      </form>
    </div>
  );
};

export default Register;