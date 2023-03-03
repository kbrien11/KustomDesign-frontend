import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "./Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

function ProductCTA() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.white", overflow: "hidden" }}
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
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h3"
            marked="center"
            component="h2"
            color="black"
            sx={{ mb: 14, textAlign: "center" }}
          >
            Testimonials
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item md>
              <Box
                sx={{
                  width: 360,
                  height: 300,
                  borderRadius: 5,
                  backgroundColor: "primary.white",
                  bgcolor: "secondary.main",
                  padding: "20px 20px 20px 20px",
                  boxShadow: "0 1px 4px 9 rgb(0,0,50,.3)",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                {" "}
                <Typography
                  variant="h4"
                  align="center"
                  color="white"
                  marginBottom="25px"
                >
                  Best, Gift, Ever.
                </Typography>
                <Typography variant="body2" align="center">
                  "I had my three cats painted as a gift for my wife and they
                  turned out incredibly well! The artists managed to capture the
                  fur patterns on their faces correctly and my wife freaked out
                  when she saw them. 10/10 World's best gift." Brendan A.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box
                sx={{
                  width: 360,
                  height: 300,
                  borderRadius: 5,
                  bgcolor: "secondary.main",
                  padding: "20px 20px 20px 20px",
                  boxShadow: "0 1px 4px 9 rgb(0,0,50,.3)",

                  "&:hover": {
                    backgroundColor: "primary.main",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                <Typography
                  variant="h4"
                  align="center"
                  color="white"
                  marginBottom="25px"
                >
                  Fantastic !
                </Typography>
                <Typography variant="body2" align="center">
                  "Paintru made the overall process so simple. They deliver easy
                  step by step ordering, quick communication, and have caring
                  people working for them resulting in fantastic paintings. I
                  could not be more satisfied with product quality. I highly
                  recommend to anyone looking to have personalized artwork."
                  Gary L
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box
                sx={{
                  width: 360,
                  height: 300,
                  borderRadius: 5,
                  bgcolor: "secondary.main",
                  padding: "20px 20px 20px 20px",
                  boxShadow: "0 1px 4px 9 rgb(0,0,50,.3)",
                  marginBottom: "20px",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  align="center"
                  color="white"
                  marginBottom="25px"
                >
                  Amazing!!
                </Typography>
                <Typography variant="body2" align="center">
                  "I just received my painting and it is AMAZINGLY BEAUTIFUL!
                  Don't forget to thank the artist profusely for me! The
                  emotions are perfectly captured in our expressions. I couldn't
                  be more happy. All the timely communications and sharing the
                  artist's progress of work was very professional!" Rafael T.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductCTA;
