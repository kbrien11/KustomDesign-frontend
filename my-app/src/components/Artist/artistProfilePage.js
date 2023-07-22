import React, { useState, useEffect } from "react";
import ArtistImages from "../Image/ArtistImages";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import * as imageActions from "../../actions/imageActionTypes";
import * as loginActions from "../../actions/LoginActionTypes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Person3Icon from "@mui/icons-material/Person3";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../cssComponents/theme";
import AppAppBar from "../cssComponents/AppAppBar";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import FormButton from "../cssComponents/FormButton";

const ArtistProfilePage = ({
  images,
  serviceImageActions,
  profileImage,
  firstName,
  lastName,
  sessionId,
}) => {
  const { name } = useParams();

  const Label = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }));

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

  console.log("🚀 ~ file: artistProfilePage.js:65 ~ images:", images);

  const imageLength = imageMap.length;

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
            <p>
              <img src={profileImage} width="50" height="150"></img>
              <h5 className="AristFirstName">
                {firstName.charAt(0).toUpperCase() + firstName.slice(1)}{" "}
                <span className="ArtistLastName">{lastName}</span>
              </h5>
            </p>
            <hr></hr>
            <h2> Bio</h2>
            <text>
              {" "}
              Colombian artists based in Soho - New York. If you are looking for
              a realism, lettering or black work tattoos, Alejandro is your guy.
            </text>
            <h2> Characteristics</h2>
            <div className="ratingAndPaintingValues">
              <Box
                component="span"
                sx={{
                  background: "whitesmoke",
                  maxHeight: 80,
                  maxWidth: 100,
                  paddingRight: 3,
                  paddingLeft: 3,
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRadius: 3,
                }}
              >
                <Typography
                  color="inherit"
                  align="center"
                  variant="h7"
                  sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
                >
                  {" "}
                  Rating{" "}
                </Typography>
                <Typography
                  color="whitesmoke"
                  align="left"
                  variant="h5"
                  sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
                >
                  {" "}
                  {stars}
                </Typography>
              </Box>
              <Box
                component="span"
                sx={{
                  background: "whitesmoke",
                  maxHeight: 80,
                  paddingRight: 3,
                  paddingLeft: 3,
                  paddingTop: 3,
                  paddingBottom: 3,
                  borderRadius: 3,
                  minWidth: 100,
                }}
              >
                <Typography
                  color="inherit"
                  align="center"
                  variant="h7"
                  sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
                >
                  Paintings
                </Typography>
                <Typography
                  color="inherit"
                  align="left"
                  variant="h5"
                  sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
                >
                  {" "}
                  {images.length}
                </Typography>
              </Box>
            </div>
            <div className="MenuItemButtons">
              <FormButton
                sx={{
                  mt: 3,
                  mb: 2,
                  float: "right",
                  marginTop: "10px",
                  marginRight: "20px",
                  borderRadius: "8px",
                  color: "secondary",
                }}
                size="small"
                variant="contained"
                color="primary"
                aria-label="fingerprint"
                startIcon={
                  <Person3Icon
                    color="secondary"
                    aria-label="Save"
                    size="large"
                  />
                }
              >
                Save
              </FormButton>
              <FormButton
                sx={{
                  mt: 3,
                  mb: 2,
                  float: "right",
                  marginTop: "10px",
                  marginRight: "20px",
                  borderRadius: "8px",
                  color: "secondary",
                }}
                size="small"
                variant="contained"
                color="primary"
                aria-label="fingerprint"
                startIcon={
                  <Person3Icon color="primary" aria-label="Save" size="large" />
                }
              >
                Book
              </FormButton>
            </div>
          </div>
          <div className="artistContentGrid">
            <Typography
              color="inherit"
              align="center"
              variant="h5"
              sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
            ></Typography>
            <Box
              sx={{
                width: 900,
                minHeight: 529,
                maxHeight: 600,
                paddingLeft: 10,
              }}
            >
              <Masonry columns={3} spacing={2}>
                {images.map((item, index) => (
                  <div key={index}>
                    <img
                      src={item}
                      alt={item}
                      loading="lazy"
                      style={{
                        justifyContent: "center",
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                        display: "flex",
                        width: "100%",
                      }}
                    />
                  </div>
                ))}
              </Masonry>
            </Box>
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
