import { LOGIN_FORM,REGISTER_FAILURE,REGISTER_SUCCESS } from "../actions/LoginActionTypes";

const initialState = {
  user_type: "",
  id: "",
  error:false,
  success:false
};

export default function login(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case LOGIN_FORM:
      return Object.assign({}, state, {
        user_type: action.payload.user_type,
        id: action.payload.id,
      });
      case REGISTER_FAILURE:
      return Object.assign({}, state, {
        error:true,
        success:false
      });
      case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        error:false,
        success:true
      });

    default:
      return state;
  }
}
