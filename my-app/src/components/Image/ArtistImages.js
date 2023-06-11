import React, { useState, useEffect } from "react";
import { FaCommentAlt, FaHeart, FaTrash, FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export const ArtistImages = ({ props, images }) => {
  return (
    <div>
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
              height="340"
              image={props.image}
              alt="green iguana"
            />
          </CardActionArea>
          <Typography
            color="inherit"
            align="left"
            variant="h6"
            sx={{ paddingLeft: "20px", paddingTop: "20px" }}
          ></Typography>
          <Typography
            color="inherit"
            align="left"
            variant="h7"
            sx={{ paddingRight: "20px", float: "right" }}
          >
            {images.price}
          </Typography>
        </Card>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistImages);
