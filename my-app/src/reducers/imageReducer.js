
import{
    LOAD_IMAGES_DATA,
    LOAD_SHOW_DETAILS
} from '../actions/imageActionTypes'


// fields = ['id','image','user_pk','size','artist_id','match']
const initialState = {
        images: [],
        showDetails: ''
}


export default function images (state = initialState,action){
    console.log(action.payload)
    switch(action.type){
        
        case LOAD_IMAGES_DATA:
            return Object.assign({},state,{
                images:action.payload,
                showDetails:action.payload
            });

        case  LOAD_SHOW_DETAILS:
            return Object.assign({},state,{
                showDetails:action.payload
            });
        default:
            return state
    }
}