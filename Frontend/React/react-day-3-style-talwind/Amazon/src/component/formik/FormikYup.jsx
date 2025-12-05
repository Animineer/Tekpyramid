import React from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"

function FormikYup() {
  
  
  const initialValues={
    username: "",
    password: ""
  }

  const validationSchema=Yup.object({
    username:Yup.string().required("username is required").min(6),
    password:Yup.string().required("password is required").min(3).max(8,"enter 8 digit of password")
  })
  
  const formikdetails = useFormik({
    initialValues,
    validationSchema,
    onSubmit:(values)=>{
       console.log(values)
    }
   
  })
  


  
  
    return (
    <div>

    <p>FormikYup</p>
    <form onSubmit={formikdetails.handleSubmit}>
    <input type="text" name="username" placeholder='username' value={formikdetails.values.username}  onChange={formikdetails.handleChange}/>

    {formikdetails.errors.username}

    <input type="text" name ="password" value={formikdetails.values.password} onChange={formikdetails.handleChange}/>
     
     {formikdetails.errors.password}


    <button type='submit'>login</button>
     </form>
    </div>
  )
}

export default FormikYup