// in cmd => npm i formik yup

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // or => import {sting,mixed,num} from 'yup'

const FormikForm = () => {

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string()
      .required("password is required")
      .min(4, "password must contain 4 characters")
      .max(8, "password should have 8 characters"),
  });

  const formikDeatails = useFormik({
    initialValues,
    validationSchema,
    onSubmit : (values)=>{console.log(values)}
  });
  return (
    <div>
      <form action="" onSubmit={formikDeatails.handleSubmit}>
        <div>
          <label htmlFor="">Username : </label>
          <input type="text" name="username" value={formikDeatails.values.username} onChange={formikDeatails.handleChange}/>
          {
            formikDeatails.errors.username && (
                <p style={{color:"red"}}>{formikDeatails.errors.username}</p>
            )
          }
        </div>
        <div>
          <label htmlFor="">Password : </label>
          <input type="text" name="password" value={formikDeatails.values.password} onChange={formikDeatails.handleChange}/>
          {
            formikDeatails.errors.password && (
                <p style={{color:"red"}}>{formikDeatails.errors.password}</p>
            )
          }
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default FormikForm;
