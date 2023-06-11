import React, { useEffect } from "react";
import * as imageActions from "./actions/imageActionTypes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HomePageMenuItems from "./components/cssComponents/HomePageMenuItems";
import Images from "./components/Image/Image";
import AppAppBar from "./components/cssComponents/AppAppBar";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "./components/cssComponents/theme";

function Home({ images, serviceActions }) {
  useEffect(() => {
    serviceActions.getHomeImages();
  }, []);

  const imageMap = images.map((img) => {
    return <Images props={img} />;
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppAppBar />
        <div className="home-grid">
          <div className="menuItem">
            {" "}
            <p>
              <HomePageMenuItems />
            </p>
          </div>
          <div className="home-images">
            {" "}
            <div>{imageMap}</div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
