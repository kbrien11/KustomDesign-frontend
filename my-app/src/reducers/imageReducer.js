import {
  LOAD_IMAGES_DATA,
  LOAD_SHOW_DETAILS,
  LOAD_ARTIST_PROFILE_IMAGE,
  LOAD_ARTIST_FIRST_NAME,
  LOAD_ARTIST_LAST_NAME,
} from "../actions/imageActionTypes";

// fields = ['id','image','user_pk','size','artist_id','match']
const initialState = {
  images: [],
  showDetails: "",
  profileImage: "",
  firstName: "",
  lastName: "",
};

export default function images(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case LOAD_IMAGES_DATA:
      return Object.assign({}, state, {
        images: action.payload,
        showDetails: action.payload,
      });

    case LOAD_SHOW_DETAILS:
      return Object.assign({}, state, {
        showDetails: action.payload,
      });
    case LOAD_ARTIST_PROFILE_IMAGE:
      return Object.assign({}, state, {
        profileImage: action.payload,
      });
    case LOAD_ARTIST_FIRST_NAME:
      return Object.assign({}, state, {
        firstName: action.payload,
      });
    case LOAD_ARTIST_LAST_NAME:
      return Object.assign({}, state, {
        lastName: action.payload,
      });
    default:
      return state;
  }
}
