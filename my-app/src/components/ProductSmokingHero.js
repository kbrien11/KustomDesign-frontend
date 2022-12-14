import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "./Typography";

function ProductSmokingHero() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.white", overflow: "hidden" }}
    >
      <Container
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 9,
        }}
      >
        <Button
          sx={{
            border: "4px solid black",
            borderRadius: 0,
            height: "auto",
            py: 2,
            px: 5,
          }}
        >
          <Typography variant="h4" component="span">
            Got any questions? Need help?
          </Typography>
        </Button>
        <Typography variant="subtitle1" sx={{ my: 3 }}>
          We are here to help. Get in touch!
        </Typography>
        {/* <Box
        component="img"
        src="/static/themes/onepirate/producBuoy.svg"
        alt="buoy"
        sx={{ width: 60 }}
      /> */}
      </Container>
    </Box>
  );
}

export default ProductSmokingHero;
