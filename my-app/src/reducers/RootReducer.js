import { combineReducers } from "redux";
import {routerReducer} from 'react-router-redux'
import imageReducer from './imageReducer'
import loginReducer from './loginReducer'


export default combineReducers({
    routing: routerReducer,
    imageReducer,loginReducer
})