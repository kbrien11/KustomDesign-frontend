import * as apiConstants from '../commons/apiConstants'
import fetch from 'isomorphic-fetch'
export const LOAD_IMAGES_DATA =  'lOAD_IMAGES_DATA'
export const LOAD_SHOW_DETAILS = 'LOAD_SHOW_DETAILS'




export const loadImagesData = (data) => ({
    type: LOAD_IMAGES_DATA,
    payload:data
})

export const loadShowDetails = (data) => ({
    type: LOAD_SHOW_DETAILS,
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
            dispatch(loadShowDetails(response.showDetails))
        }
        else{
            console.log("error getting images")
        }
    })
    .catch((err) => {
        console.log(err)
    })
 

},
getImageDataForArtist :(artistid,name) => (dispatch) =>{
    console.log(artistid,name)
    fetch(`http://127.0.0.1:8000/api/imagePerArtist/${artistid}/${name}`)
    .then((response) => response.json())
    .then((response)=> {
        console.log(response)
        if(response.images.length >0){
            dispatch(loadImagesData(response.images))
            dispatch(loadShowDetails(response.showDetails))
        }
        else{
            console.log("error getting images")
        }
    })
    .catch((err) => {
        console.log(err)
    })
 

},
getImageDataForUser :(userpk) => (dispatch) =>{
    console.log(userpk)
    fetch(`http://127.0.0.1:8000/api/images/${userpk}`)
    .then((response) => response.json())
    .then((response)=> {
        console.log(response)
        if(response.images.length >0){
            dispatch(loadImagesData(response.images))
            dispatch(loadShowDetails(response.showDetails))
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