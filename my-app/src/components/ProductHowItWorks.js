import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "./Button";
import Typography from "./Typography";
import {
  FaCommentAlt,
  FaHeart,
  FaTrash,
  FaThumbsUp,
  FaPaintBrush,
} from "react-icons/fa";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

const background = {
  color: "inheret",
};

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.light", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>

                {/* <img class="wt-max-width-full wt-horizontal-center wt-vertical-center carousel-image wt-rounded" alt="Paint Brush Painting Home Improvement Decorating Wall House image 1" data-carousel-first-image="" src="https://i.etsystatic.com/27498402/r/il/7b320f/3058915850/il_794xN.3058915850_pm6v.jpg" srcset="https://i.etsystatic.com/27498402/r/il/7b320f/3058915850/il_794xN.3058915850_pm6v.jpg 1x, https://i.etsystatic.com/27498402/r/il/7b320f/3058915850/il_1588xN.3058915850_pm6v.jpg 2x" fetchpriority="high" data-original-image-width="1810" data-src-zoom-image="https://i.etsystatic.com/27498402/r/il/7b320f/3058915850/il_fullxfull.3058915850_pm6v.jpg" data-index="0"></img> */}
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400"
                  alt="graph"
                  sx={image}
                />

                <Typography variant="h5" align="center">
                  Upload an image onto the website.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400"
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Find an artist to connect to.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400"
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Sit back and enjoy while the artist paints and ships your new
                  custom artwork in 2-4 weeks.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/register"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
