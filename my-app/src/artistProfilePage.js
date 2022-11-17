import React, { useState, useEffect } from "react";
import Images from "./Image";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ArtistProfilePage = () => {
  const [image, setImages] = useState([]);
  const [profileImage, setProfileImage] = useState("");

  const { name } = useParams();
  const artistid = sessionStorage.getItem("artistid");

  useEffect(() => {
    getImages();
  }, []);
  useEffect(() => {
    getProfilePicture();
  }, []);

  const getProfilePicture = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/artistProfilePiceture/${artistid}/${name}`
      );
      const res = await response.json();
      if (res) {
        setProfileImage(res.data);
      }
    } catch (error) {
      console.log("error with profile picture");
    }
  };

  const getImages = async () => {
    try {
      const artistid = sessionStorage.getItem("artistid");
      const response = await fetch(
        `http://127.0.0.1:8000/api/imagePerArtist/${artistid}/${name}`
      );
      const res = await response.json();

      setImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const imageMap = image.map((img) => {
    return <Images data={img} />;
  });

  const starRatingOutput = <FaStar backgroundColor="white" />;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(starRatingOutput);
  }

  return (
    <div>
      <div className="artistProfilePage">
        <img src={profileImage} width="100" height="190"></img>
        <p>{stars} <span> Matches: {imageMap.length}</span></p>
        {image.length > 0 && artistid != null && (
          <div>
            <h3>Matches</h3>
            <div class="grid-wrapper">
              <div class="grid-container">{imageMap}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistProfilePage;
