import {
  LOGIN_FORM,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  RESET_REGISTER_FAILURE,
} from "../actions/LoginActionTypes";

const initialState = {
  user_type: "",
  id: "",
  error: false,
  success: false,
  profileImage: "",
  errorMessage: "",
};

export default function login(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case LOGIN_FORM:
      return Object.assign({}, state, {
        user_type: action.payload.user_type,
        id: action.payload.id,
        profileImage: action.payload.profile_image,
      });
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        error: true,
        success: false,
        errorMessage: action.payload,
      });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        error: false,
        success: true,
      });
    case RESET_REGISTER_FAILURE:
      return Object.assign({}, state, {
        error: false,
      });

    default:
      return state;
  }
}
