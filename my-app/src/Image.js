import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { FaCommentAlt, FaHeart, FaTrash, FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as imageActions from "./actions/imageActionTypes";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

import * as loginActions from "./actions/LoginActionTypes";

const Images = (props) => {
  const [addLikeText, setAddLikeText] = useState(false);
  const [addLikeTextError, setAddLikeTextError] = useState(false);
  const [matchText, setMatchText] = useState(false);
  const [usernames, setUserNames] = useState([]);
  const artist_id = sessionStorage.getItem("artistid");
  const image_id = props.data.id;

  console.log(`userpk/${props.type}`);

  console.log(props);

  useEffect(() => {
    getUserNames();
  }, []);

  const navigate = useNavigate();

  const addLike = async () => {
    const endpoint = `http://127.0.0.1:8000/api/addLikeToImage/${props.id}/${image_id}`;

    const configs = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(endpoint, configs);
    const res = await response.json();
    if (res.data) {
      setAddLikeText(true);
      setTimeout(addToLikeTimeout, 5000);
    } else if (res.error === "artist already added ") {
      setAddLikeTextError(true);
      setTimeout(addToLikeErrorTimeout, 5000);
    } else {
      setAddLikeTextError(true);
    }
  };

  const addToLikeTimeout = () => {
    setAddLikeText(false);
  };
  const addToLikeErrorTimeout = () => {
    setAddLikeTextError(false);
  };

  const deleteImage = async () => {
    const endpoint = `http://127.0.0.1:8000/api/deleteImage/${props.id}/${image_id}`;

    const configs = {
      method: "DELETE",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(endpoint, configs);
    const res = await response.json();
    if (res.data) {
      window.location.reload();
    } else {
      console.log("error with deleting image");
    }
  };

  console.log(props.data.artist_id);

  const getUserNames = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/artists/${props.data.artist_id}`
      );
      const res = await response.json();
      setUserNames(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("errror");
    }
  };

  let nameToCheck = "";
  const addMatch = async (x) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/addMatch/${props.id}/${x}/${image_id}`
      );
      const res = await response.json();
      setMatchText(true);

      console.log(res);
    } catch (error) {
      console.log("errror");
    }
  };

  const viewProfile = (name) => {
    navigate(`/artistProfilePage${name}`);
  };

  console.log(nameToCheck);

  const userNameMap = usernames.map((name) => {
    nameToCheck = name;
    return (
      <div>
        <h4>
          {" "}
          {name}{" "}
          <span>
            {" "}
            <Button variant="outlined" onClick={(e) => viewProfile(name)}>
              {" "}
              profile{" "}
            </Button>{" "}
            <span>
              <Button variant="outlined" onClick={(e) => addMatch(name)}>
                {" "}
                match{" "}
              </Button>{" "}
            </span>
          </span>
        </h4>
      </div>
    );
  });

  return (
    <div>
      {props.showDetails === true ? (
        <Card sx={{ maxWidth: 345 }} rowSpacing={5}>
          <CardActionArea>
            <a target="_blank" href={props.data.image}>
              <CardMedia
                component="img"
                height="240"
                image={props.data.image}
                alt="green iguana"
              />
            </a>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {props.type === "User" || props.type === " User" ? (
                  <h4>
                    {" "}
                    like{" "}
                    <span>
                      <Button onClick={(e) => addLike()}>
                        {" "}
                        <FaHeart />
                      </Button>
                    </span>{" "}
                    <span>
                      {" "}
                      Comment
                      <span>
                        <FaCommentAlt />{" "}
                      </span>
                    </span>
                  </h4>
                ) : (
                  ""
                )}

                {props.type === "User" || props.type === " User" ? (
                  <div className="userGrid">
                    <div className="likes">
                      {" "}
                      {props.data.artist_id.length > 0 && (
                        <div>
                          {" "}
                          <h5>
                            <FaThumbsUp />{" "}
                            <span className="numberOfLikes">
                              {" "}
                              {props.data.artist_id.length}{" "}
                            </span>{" "}
                          </h5>
                        </div>
                      )}{" "}
                      <span className="removeImage">
                        <span>
                          <Button onClick={(e) => deleteImage()}>
                            {" "}
                            <FaTrash />
                          </Button>
                        </span>
                      </span>
                    </div>{" "}
                  </div>
                ) : (
                  " "
                )}

                {props.type != "Artist" && (
                  <div classname="profile-button">{userNameMap}</div>
                )}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Grid paddingRight="30px">
          <Card
            sx={{
              maxWidth: 375,
              borderRadius: "7px",
              marginBottom: "25px",
              minWidth: 300,
              paddingBottom: "24px",
            }}
            xs={12}
            sm={6}
            md={2}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={props.data.image}
                alt="green iguana"
              />
            </CardActionArea>
            <Typography
              color="inherit"
              align="left"
              variant="h6"
              sx={{ paddingLeft: "20px", paddingTop: "20px" }}
            >
              Username
            </Typography>
            <Typography
              color="inherit"
              align="left"
              variant="h7"
              sx={{ paddingRight: "20px", float: "right" }}
            >
              $100.00
            </Typography>
          </Card>
        </Grid>
      )}

      <div className="MatchAdded">
        {matchText && <p> Match added with {nameToCheck}</p>}
      </div>

      {addLikeText && <p> Like sent</p>}
      {addLikeTextError && <p> You already have liked this image</p>}
    </div>
  );
};

export default Images;
