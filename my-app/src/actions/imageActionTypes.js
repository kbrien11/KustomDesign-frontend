import * as apiConstants from '../commons/apiConstants'
import fetch from 'isomorphic-fetch'
export const LOAD_IMAGES_DATA =  'lOAD_IMAGES_DATA'




export const loadImagesData = (data) => ({
    type: LOAD_IMAGES_DATA,
    payload:data
})





export const imageServices = {
 getImageData :() => (dispatch) =>{
    fetch(apiConstants.GET_IMAGE_DATA)
    .then((response) => response.json())
    .then((response)=> {
        console.log(response.images)
        if(response.images.length >0){
            dispatch(loadImagesData(response.images))
        }
        else{
            console.log("error getting images")
        }
    })
    .catch((err) => {
        console.log(err)
    })
 

}
}