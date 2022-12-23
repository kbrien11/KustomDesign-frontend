import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormButton from "./components/FormButton";
import CssBaseline from "@mui/material/CssBaseline";
import { Formik, Form } from "formik";
import TextField from "@mui/material/TextField";
import RFTextField from "./components/RFTextfield";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppAppBar from "./components/AppAppBar";
import AppFooter from "./components/AppFooter";
import AppForm from "./components/AppForm";
import theme from "./components/theme";
import { signInFormValidation } from "./components/validation/signFormValidation";
import * as loginActions from "./actions/LoginActionTypes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const theme = createTheme();

function SignIn({ userType, id, serviceActions }) {
  useEffect(() => {
    console.log(userType);
    check(userType);
  }, [userType]);

  const navigate = useNavigate();

  const init = {
    email: "",
    password: "",
  };

  const check = (userActionType) => {
    if (userActionType === " User" || userActionType === "User") {
      console.log(userActionType);
      navigate("/user");
    }
    if (userActionType === "Artist") {
      navigate("/artist");
    }
  };
  const handleSubmit = (formdata) => {
    serviceActions.login(formdata);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppAppBar />
      <Formik
        validationSchema={signInFormValidation}
        initialValues={init}
        onSubmit={(formData) => {
          handleSubmit(formData);
        }}
      >
        {(formik) => {
          const {
            values,
            setFieldTouched,
            setFieldValue,
            isValid,
            dirty,
            touched,
            errors,
          } = formik;

          return (
            <Container component="main" maxWidth="md">
              <AppForm>
                <CssBaseline />

                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    gutterBottom
                    marked="center"
                    align="center"
                  >
                    Sign in
                  </Typography>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>

                  <Box
                    sx={{
                      marginTop: 8,
                    }}
                  >
                    {/* <Form onSubmit={LoginButton}> */}
                    <TextField
                      value={values.email}
                      fullWidth
                      id="email"
                      label="Email Address"
                      name={"email"}
                      onBlur={(e) => {
                        console.log(e.target.value);
                        setFieldValue("email", e.target.value);
                        setFieldTouched("email");
                      }}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setFieldValue("email", e.target.value);
                        setFieldTouched("email");
                      }}

                      //   onChange={(e) => setInputEmail(e.target.value)}
                    />
                    {touched.email && errors.email ? (
                      <div className="FormError">{errors.email} </div>
                    ) : (
                      ""
                    )}
                    <TextField
                      margin="normal"
                      required
                      size="xlarge"
                      fullWidth
                      value={values.password}
                      name={"password"}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onBlur={(e) => {
                        setFieldValue("password", e.target.value);
                        setFieldTouched("password");
                      }}
                      onChange={(e) => {
                        setFieldValue("password", e.target.value);
                        setFieldTouched("password");
                      }}
                    />
                    {touched.password && errors.password ? (
                      <div className="FormError">{errors.password} </div>
                    ) : (
                      ""
                    )}

                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <FormButton
                      onClick={(e) => handleSubmit(values)}
                      sx={{ mt: 3, mb: 2 }}
                      disabled={errors.password || errors.email}
                      size="large"
                      color="secondary"
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </FormButton>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item></Grid>
                    </Grid>
                    {/* </Form> */}
                  </Box>
                </Box>

                <Copyright sx={{ mt: 8, mb: 4 }} />
              </AppForm>
            </Container>
          );
        }}
      </Formik>
      <AppFooter />
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  userType: state.loginReducer.user_type,
  id: state.loginReducer.id,
});

const mapDispatchToProps = (dispatch) => ({
  serviceActions: bindActionCreators(
    { ...loginActions.loginServices },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
