import * as apiConstants from "../commons/apiConstants";
import fetch from "isomorphic-fetch";
export const LOAD_IMAGES_DATA = "lOAD_IMAGES_DATA";
export const LOAD_SHOW_DETAILS = "LOAD_SHOW_DETAILS";
export const LOAD_ARTIST_PROFILE_IMAGE = "LOAD_ARTIST_PROFILE_IMAGE";
export const LOAD_ARTIST_FIRST_NAME = "LOAD_ARTIST_FIRST_NAME";
export const LOAD_ARTIST_LAST_NAME = "LOAD_ARTIST_LAST_NAME";

export const loadImagesData = (data) => ({
  type: LOAD_IMAGES_DATA,
  payload: data,
});

export const loadShowDetails = (data) => ({
  type: LOAD_SHOW_DETAILS,
  payload: data,
});

export const loadArtistProfileImage = (data) => ({
  type: LOAD_ARTIST_PROFILE_IMAGE,
  payload: data,
});
export const loadArtistProfileFirstName = (data) => ({
  type: LOAD_ARTIST_FIRST_NAME,
  payload: data,
});
export const loadArtistProfilelastName = (data) => ({
  type: LOAD_ARTIST_LAST_NAME,
  payload: data,
});

export const imageServices = {
  getImageData: () => (dispatch) => {
    fetch(apiConstants.GET_IMAGE_DATA)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.images);
        if (response.images.length > 0) {
          dispatch(loadImagesData(response.images));
          dispatch(loadShowDetails(response.showDetails));
        } else {
          console.log("error getting images");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getImageDataForArtist: (artistid, name) => (dispatch) => {
    console.log(artistid, name);
    fetch(`http://127.0.0.1:8000/api/imagePerArtist/${artistid}/${name}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.images.length > 0) {
          dispatch(loadImagesData(response.images));
          dispatch(loadShowDetails(response.showDetails));
        } else {
          console.log("error getting images");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getImageDataForUser: (userpk) => (dispatch) => {
    console.log(userpk);
    fetch(`http://127.0.0.1:8000/api/images/${userpk}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.images.length > 0) {
          dispatch(loadImagesData(response.images));
          dispatch(loadShowDetails(response.showDetails));
        } else {
          console.log("error getting images");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getArtistProfilePicture: (artistpk, artistUsername) => (dispatch) => {
    fetch(
      `http://127.0.0.1:8000/api/artistProfilePiceture/${artistpk}/${artistUsername}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.data.length > 0) {
          dispatch(loadArtistProfileImage(response.data));
          dispatch(loadArtistProfileFirstName(response.first_name));
          dispatch(loadArtistProfilelastName(response.last_name));
        } else {
          console.log("error getting profile image");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
