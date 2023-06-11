import React, { useState, useEffect } from "react";
import ArtistImages from "../Image/ArtistImages";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import * as imageActions from "../../actions/imageActionTypes";
import * as loginActions from "../../actions/LoginActionTypes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Divider from "@mui/material/Divider";
import { ArtistProfilePageMenuItems } from "../cssComponents/ArtistProfilePageMenuItems";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../cssComponents/theme";
import AppAppBar from "../cssComponents/AppAppBar";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

const ArtistProfilePage = ({
  images,
  serviceImageActions,
  profileImage,
  firstName,
  lastName,
  sessionId,
}) => {
  const { name } = useParams();

  console.log(`name    ${name}`);

  const artistPk = sessionStorage.getItem("loggedInPK");
  console.log(artistPk);
  const backgroundImage =
    "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&amp;w=1000&amp;q=80";

  useEffect(() => {
    if (name != null) {
      serviceImageActions.getImageDataForArtist(name, null);
    } else {
      serviceImageActions.getImageDataForArtist(name, artistPk);
    }
  }, []);
  useEffect(() => {
    if (name != null) {
      serviceImageActions.getArtistProfilePicture(name, null);
    } else {
      serviceImageActions.getArtistProfilePicture(name, artistPk);
    }
  }, []);

  const imageMap = images.map((img) => {
    return <ArtistImages props={img} />;
  });

  const drawerWidth = 240;

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  const starRatingOutput = <FaStar backgroundColor="white" />;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(starRatingOutput);
  }

  return (
    <div className="artistProfilePageBackground">
      <ThemeProvider theme={theme}>
        <AppAppBar />
        <div className="displayDashboardGrid">
          <div className="menuItem">
            {" "}
            <p>{ArtistProfilePageMenuItems}</p>
          </div>
          <div className="artistContentGrid">
            <Typography
              color="inherit"
              align="center"
              variant="h5"
              sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
            >
              <div className="artistProfilePage">
                <div className="artistProfilePageContainer">
                  <h5 className="AristFirstName">
                    {firstName}{" "}
                    <span className="ArtistLastName">{lastName}</span>
                  </h5>
                  <img src={profileImage} width="50" height="150"></img>
                  <p>{stars}</p> <br />
                  <h4>Paintings: {imageMap.length}</h4>
                </div>
              </div>
            </Typography>

            {images.length > 0 && (
              <div className="grid-wrapper-container">
                <div className="grid-wrapper">{imageMap}</div>
              </div>
            )}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state) => ({
  images: state.imageReducer.images,
  profileImage: state.imageReducer.profileImage,
  sessionId: state.loginReducer.id,
  firstName: state.imageReducer.firstName,
  lastName: state.imageReducer.lastName,
});

const mapDispatchToProps = (dispatch) => ({
  serviceImageActions: bindActionCreators(
    { ...imageActions.imageServices },
    dispatch
  ),
  serviceLoginActions: bindActionCreators(
    { ...loginActions.loginServices },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistProfilePage);
