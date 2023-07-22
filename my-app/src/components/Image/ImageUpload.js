import React, { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase/firebaseConfig";
import * as imageActions from "../../actions/imageActionTypes";
import ClipLoader from "react-spinners/ClipLoader";
import { FaPlus, FaMinus } from "react-icons/fa";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormButton from "../cssComponents/FormButton";
import { checkPrice } from "../../utils/Utility";
import AppAppBar from "../cssComponents/AppAppBar";
import theme from "../cssComponents/theme";
import MenuItem from "@mui/material/MenuItem";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const ImageUpload = (
  images,
  serviceActions,
  profileImage,
  firstName,
  lastName,
  sessionId
) => {
  const [inputImage, setInputimage] = useState("");
  const [addedImage, setAddedImageText] = useState(false);
  const [inputSize, setInputSize] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [image, setImages] = useState([]);

  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handChange = (e) => {
    e.preventDefault();
    console.log(e);
    const file = e.target[4].files[0];
    console.log(file);

    addImage(file);
  };

  let imgPath = "";

  const addImage = async (file) => {
    if (!file) return;
    setLoading(true);
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

          const userId = sessionStorage.getItem("loggedInPK");
          const endpoint = `http://127.0.0.1:8000/api/uploadImage/${userId}`;
          const data = {
            image: imgPath,
            size: inputSize,
            price: inputPrice,
          };
          const configs = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          };

          const response = await fetch(endpoint, configs);
          const res = await response.json();
          console.log(res);
          if (res) {
            setAddedImageText(true);
            setLoading(false);
            setInputPrice("");
            setInputSize("");
            setInputimage("");
            setTimeout(() => {
              resetAddedImageText();
            }, 5000);
          }
          console.log(imgPath);
          setProgress(0);
        });
      }
    );
  };

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const resetAddedImageText = () => {
    setAddedImageText(false);
  };

  return (
    <div>
      <div className="imageUploadContainer"> </div>
      <ThemeProvider theme={theme}>
        <AppAppBar />
        <div>
          {addedImage && (
            <div className="addedImageText">
              <h5> Image added</h5>
            </div>
          )}
          {!loading && (
            <div className="addImageContainer">
              <h4> Upload Image</h4>
              <form onSubmit={handChange}>
                <label className="input-label-add-image">
                  {" "}
                  <p>Size*</p>
                </label>
                <Select
                  margin="normal"
                  required
                  size="xlarge"
                  fullWidth
                  value={inputSize}
                  name={"size"}
                  type="text"
                  id="user_type"
                  onChange={(e) => {
                    setInputSize(e.target.value);
                    setInputPrice(checkPrice(e.target.value));
                  }}
                >
                  <MenuItem value={"8 x 8"}>8 x 8</MenuItem>
                  <MenuItem value={"10 x 10"}>10 x 10</MenuItem>
                  <MenuItem value={"12 x 12"}>12 x 12</MenuItem>
                  <MenuItem value={"14 x 14"}>14 x 14</MenuItem>
                  <MenuItem value={"16 x 16"}>16 x 16</MenuItem>
                </Select>

                <br />
                <label className="input-label-add-image">
                  {" "}
                  <p>Estimated Price*</p>
                </label>
                <TextField
                  margin="normal"
                  required
                  size="xlarge"
                  fullWidth
                  value={inputPrice}
                  name={"price"}
                  type="text"
                  id="price"
                  autoComplete="estimated price"
                />
                <br />
                <div class="image-upload-wrap">
                  <input
                    class="file-upload-input"
                    // value={inputImage}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setInputimage(e.target.value);
                      setDisabled(false);
                    }}
                  />
                  <div class="drag-text">
                    {inputImage.length === 0 ? (
                      <h2>select add Image</h2>
                    ) : (
                      <h2>Image selected</h2>
                    )}
                  </div>
                </div>

                <button
                  className="imageUploadButton"
                  type="submit"
                  disabled={disabled}
                >
                  {" "}
                  Upload
                </button>
              </form>
            </div>
          )}
          {loading && (
            <div className="ImageLoadingText">
              <h5> Trying to save image</h5>
              <div>
                {" "}
                <ClipLoader
                  color={"red"}
                  loading={loading}
                  cssOverride={override}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            </div>
          )}
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
  serviceActions: bindActionCreators(
    { ...imageActions.imageServices },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
