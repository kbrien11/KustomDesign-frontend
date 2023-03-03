import React, { useState, useEffect } from "react";
import Images from "./components/Image/Image";
import { useNavigate } from "react-router-dom";
import * as imageActions from "./actions/imageActionTypes";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const UserPage = ({ images, showDetails, serviceActions, type }) => {
  console.log(`keith/${sessionStorage.getItem("loggedInPK")}`);

  useEffect(() => {
    serviceActions.getImageDataForUser(sessionStorage.getItem("loggedInPK"));
  }, []);

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const theme = createTheme();

  const imageMap = images.map((img) => {
    return (
      <Images
        data={img}
        showDetails={showDetails}
        id={sessionStorage.getItem("loggedInPK")}
        type={type}
      />
    );
  });
  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              View your uploaded images
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Album layout
              </Typography>

              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">Main call to action</Button>
                <Button variant="outlined">Secondary action</Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid
              container
              justifyContent="center"
              spacing={4}
              columns={{ xs: 4, sm: 8, md: 12 }}
              rowSpacing={3}
            >
              <Grid xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {imageMap}
                </Card>
              </Grid>
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>

      <Button variant="contained" onClick={(e) => logout()}>
        {" "}
        Logout
      </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
