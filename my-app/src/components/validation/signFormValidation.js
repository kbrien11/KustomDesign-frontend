import * as Yup from 'yup'


export const signInFormValidation = Yup.object().shape({
    email: Yup.string()
    .required('Email is required')
    .min(8, 'Valid emails must be atleast 8 characters and contain an @ symbol')
    .max(30, 'Valid email address are less than 30 characters'),

    password: Yup.string()
    .required('Please enter a valid password')
    .min(3, 'Valid passwords must be atleast 6 characters')
    .max(15, 'no more than 15 characters allowed')
})


export default signInFormValidation