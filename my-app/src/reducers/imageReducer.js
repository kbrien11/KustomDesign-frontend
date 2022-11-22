
import{
    LOAD_IMAGES_DATA
} from '../actions/imageActionTypes'


// fields = ['id','image','user_pk','size','artist_id','match']
const initialState = {
        images: []
}


export default function images (state = initialState,action){
    console.log(action.payload)
    switch(action.type){
        
        case LOAD_IMAGES_DATA:
            return Object.assign({},state,{
                images:action.payload
            });
        default:
            return state
    }
}