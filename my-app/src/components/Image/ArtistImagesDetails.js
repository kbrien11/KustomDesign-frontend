import React, { useState, useEffect, useMemo } from "react";
import {
  FaCommentAlt,
  FaHeart,
  FaTrash,
  FaThumbsUp,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Person3Icon from "@mui/icons-material/Person3";
import * as imageActions from "../../actions/imageActionTypes";
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
import Carousel from "react-material-ui-carousel";
import FormButton from "../cssComponents/FormButton";

export const ArtistImagesDetails = ({ props, images }) => {
  const memoImages = useMemo(() => props, [props]);

  console.log(memoImages);
  function Item(memoImages) {
    return (
      <div>
        <CardMedia
          component="img"
          height="250"
          paddingBottom="3px"
          image={memoImages.item}
          alt="green iguana"
        />
      </div>
    );
  }

  const loopThroughImages = (images) => {
    console.log(images);

    return images != null ? (
      <Carousel autoPlay={false}>
        {images.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    ) : (
      ""
    );
  };
  const navigate = useNavigate();
  const viewProfile = (name) => {
    navigate(`/artistProfilePage${name}`);
  };
  return (
    <div>
      {/* <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 3, sm: 10, md: 12 }}
        paddingRight="30px"
      > */}
      {memoImages || [].artist_picture_list.length > 0 ? (
        <Card
          sx={{
            maxWidth: 450,
            borderRadius: "10px",
            marginBottom: "15px",
            minWidth: 440,
            margin: "auto",
            paddingBottom: "5px",
            maxHeight: "540px",
          }}
          xs={12}
          sm={6}
          md={2}
        >
          {loopThroughImages.length > 0 && (
            <CardActionArea>
              {loopThroughImages(memoImages.artist_picture_list)}
            </CardActionArea>
          )}
          <span>
            {" "}
            <CardMedia
              component="img"
              image={memoImages.profile_image}
              alt="green iguana"
              sx={{
                borderRadius: "50%",
                height: "35px",
                width: "45px",

                marginLeft: "15px",
              }}
            />
          </span>
          <Typography
            color="black"
            align="left"
            variant="h7"
            sx={{
              marginLeft: "15px",
              float: "left",
              paddingBottom: "15px",
            }}
          >
            {memoImages.username}
          </Typography>
          <Typography
            color="black"
            align="left"
            variant="h6"
            sx={{
              paddingLeft: "20px",
              marginTop: "40px",
              fontWeight: "bold",
            }}
          >
            {"$$$"}
          </Typography>
          <Typography
            color="black"
            align="left"
            variant="h7"
            sx={{
              float: "left",
              paddingLeft: "20px",
              fontWeight: "bold",
            }}
          >
            {memoImages.location}
          </Typography>
          <FormButton
            // onClick={(e) => handleSubmit(values)}
            sx={{
              mt: 3,
              mb: 2,
              float: "right",
              marginTop: "10px",
              marginRight: "20px",
              borderRadius: "8px",
              color: "secondary",
            }}
            // disabled={
            //   errors.password ||
            //   errors.email ||
            //   !touched.password ||
            //   !touched.email
            // }

            size="small"
            variant="contained"
            color="primary"
            aria-label="fingerprint"
            startIcon={
              <Person3Icon color="secondary" aria-label="delete" size="large" />
            }
            onClick={(e) => viewProfile(memoImages.username)}
          >
            Profile
          </FormButton>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  images: state.imageReducer.images,
  showDetails: state.imageReducer.showDetails,
  type: state.loginReducer.user_type,
});

const mapDispatchToProps = (dispatch) => ({
  serviceActions: bindActionCreators(
    { ...imageActions.imageServices },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistImagesDetails);
