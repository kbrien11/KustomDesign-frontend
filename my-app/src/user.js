import React, { useState, useEffect } from "react";
import Images from "./Image";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [image, setImages] = useState([]);

  useEffect(() => {getImages()},([]))

  const getImages = async () => {
    const user_pk = sessionStorage.getItem("userpk");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/images/${user_pk}`
      );
      const res = await response.json();
      setImages(res.images);
      console.log(res.images)
    } catch (error) {
      console.log(error);
    }
  };

  const imageMap = image.map((img) => {
    return <Images data={img} />;
  });
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("artistid");
    sessionStorage.removeItem("userpk");
    navigate("/login");
  };

  return (
    <div>
      <button onClick={(e) => logout()}> Logout</button>

      <div> View your uploaded images</div>

      <div class="grid-wrapper">
        <div class="grid-container">{imageMap}</div>
      </div>
    </div>
  );
};

export default UserPage;
