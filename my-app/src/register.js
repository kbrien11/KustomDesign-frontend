import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebaseConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FormControl from "@mui/material/FormControl";

import * as loginActions from "./actions/LoginActionTypes";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormButton from "./components/FormButton";
import CssBaseline from "@mui/material/CssBaseline";
import MenuItem from "@mui/material/MenuItem";
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
import { resolveBreakpointValues } from "@mui/system/breakpoints";
import { Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

const Register = ({ success, error, serviceActions }) => {
  const [progress, setProgress] = useState(0);

  const init = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    username: "",
    user_type: "",
    file: "",
  };

  const handChange = (formData) => {
    addImage(formData);
  };

  let imgPath = "";

  const addImage = async (formData) => {
    console.log(formData);
    const file = formData.file;
    console.log(file);
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);
    console.log(sotrageRef);
    console.log(uploadTask);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          imgPath += downloadURL;
          const data = {
            email: formData.email,
            password: formData.password,
            user_type: formData.user_type,
            first_name: formData.firstname,
            last_name: formData.lastname,
            username: formData.username,
            user_type: formData.user_type,
            profile_img: imgPath,
          };

          console.log(`datatosend-${data}`);
          sendRegister(data);
        });
      }
    );
  };

  const navigate = useNavigate();

  const sendToLoginPage = () => {
    setTimeout(navigateToLogin(), 5000);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const sendRegister = (formdData) => {
    serviceActions.register(formdData);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppAppBar />
      <Formik
        validationSchema={signInFormValidation}
        initialValues={init}
        onSubmit={(formData) => {
          sendRegister(formData);
        }}
      >
        {(formik) => {
          const {
            values,
            setFieldTouched,
            setFieldValue,
            resetForm,
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
                      <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                   <TextField
                      margin="normal"
                      required
                      size="xlarge"
                      fullWidth
                      value={values.firstname}
                      name={"firstname"}
                      label="firstname"
                      type="text"
                      id="firstname"
                      autoComplete="current-password"
                      onBlur={(e) => {
                        setFieldValue("firstname", e.target.value);
                        setFieldTouched("firstname");
                      }}
                      onChange={(e) => {
                        setFieldValue("firstname", e.target.value);
                        setFieldTouched("firstname");
                      }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                   <TextField
                      margin="normal"
                      required
                      size="xlarge"
                      fullWidth
                      value={values.lastname}
                      name={"lastname"}
                      label="lastname"
                      type="text"
                      id="lastname"
                      onBlur={(e) => {
                        setFieldValue("lastname", e.target.value);
                        setFieldTouched("lastname");
                      }}
                      onChange={(e) => {
                        setFieldValue("lastname", e.target.value);
                        setFieldTouched("lastname");
                      }}
                    />
                </Grid>
              </Grid>
                  <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                          <TextField
                      margin="normal"
                      required
                      size="xlarge"
                      fullWidth
                      value={values.username}
                      name={"username"}
                      label="username"
                      type="text"
                      id="username"
                      onBlur={(e) => {
                        setFieldValue("username", e.target.value);
                        setFieldTouched("username");
                      }}
                      onChange={(e) => {
                        setFieldValue("username", e.target.value);
                        setFieldTouched("username");
                      }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                   
                    <FormControl
                      margin="normal"
                      required
                      size="xlarge"
                      fullWidth
                    >
                      {touched.user_type ? (
                        ""
                      ) : (
                        <InputLabel className="Select-input-label">
                          User Type
                        </InputLabel>
                      )}

                      <Select
                        margin="normal"
                        required
                        size="xlarge"
                        fullWidth
                        value={values.user_type}
                        name={"user_type"}
                        InputLabel="User_type"
                        type="text"
                        id="user_type"
                        onBlur={(e) => {
                          setFieldValue("user_type", e.target.value);
                          setFieldTouched("user_type");
                        }}
                        onChange={(e) => {
                          setFieldValue("user_type", e.target.value);
                          setFieldTouched("user_type");
                        }}
                      >
                        <MenuItem value={"User"}>User</MenuItem>
                        <MenuItem value={"Artist"}>Artist</MenuItem>
                      </Select>
                    </FormControl>
                </Grid>
              </Grid>
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
                
             

                    <TextField
                      margin="normal"
                      required
                      size="xlarge"
                      fullWidth
                      name="file"
                      id="file"
                      label = "Profile picture"
                      value={values.file}
                      type="file"
                      onBlur={(e) => {
                        console.log(e);
                        setFieldValue("file", e.target.value);
                        setFieldTouched("file");
                      }}
                      onChange={(e) => {
                        setFieldValue("file", e.target.value);
                        setFieldTouched("file");
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <FormButton
                      onClick={(e) => handChange(values)}
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
              </AppForm>
              {success && <p> Congrats!! You have been registered</p>}
              {success && sendToLoginPage()}
              {error && <p> Something went wrong, please try again!</p>}
            </Container>
          );
        }}
      </Formik>
      <AppFooter />
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  error: state.loginReducer.error,
  success: state.loginReducer.success,
});

const mapDispatchToProps = (dispatch) => ({
  serviceActions: bindActionCreators(
    { ...loginActions.loginServices },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
