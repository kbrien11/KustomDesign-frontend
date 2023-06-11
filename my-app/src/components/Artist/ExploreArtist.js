import React, { useEffect, useMemo } from "react";
import AppAppBar from "../cssComponents/AppAppBar";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../cssComponents/theme";
import AppFooter from "../cssComponents/AppFooter";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as imageActions from "../../actions/imageActionTypes";
import ArtistImagesDetails from "../Image/ArtistImagesDetails";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const ExplortArtist = ({ serviceImageActions, images }) => {
  useEffect(() => {
    if (images.lengh == null) {
      serviceImageActions.getTotalArtistImages();
    } else {
      console.log("briendddd");
    }
  }, []);

  const imageMap = images.map((img) => {
    return <ArtistImagesDetails props={img} />;
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppAppBar />

        <div class="hero-image-container">
          <div class="hero-image">
            <img
              src="	https://d1kq2dqeox7x40.cloudfront.net/web/promotion-mobile.png?w=800"
              alt="Avatar"
            ></img>
            <div class="hero-text">
              <h1>Search Local Artists</h1>
              <Button size="small" variant="contained">
                {" "}
                Search{" "}
              </Button>{" "}
            </div>
          </div>
        </div>

        <div className="Featured-Artists">
          <h2> Featured Artists</h2>
        </div>
        <Accordion>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              paddingTop: "20px",
              paddingLeft: "20px",
              paddingBottom: "30px",
              margin: "auto",
              maxWidth: "1550px",
              minWidth: "1000px",
              backgroundColor: "inherit",
            }}
          >
            <AccordionDetails>
              <div className="Featured-Artists-Grid-Container">{imageMap}</div>
            </AccordionDetails>
          </AccordionSummary>
        </Accordion>
        <AppFooter />
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state) => ({
  images: state.imageReducer.images,
});

const mapDispatchToProps = (dispatch) => ({
  serviceImageActions: bindActionCreators(
    { ...imageActions.imageServices },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplortArtist);
