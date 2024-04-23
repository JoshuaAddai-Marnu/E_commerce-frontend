import React, { useState } from 'react'
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import http from "../lib/http"

import './CSS/LoginSignup.css'
import { toast } from 'sonner';
import { useAppDispatch } from '../store/store';
import { setUser } from '../store/slices/auth';
import { useNavigate } from 'react-router-dom';

const Schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().when("stage", {
    is: "signup",
    then(schema) {
      return yup.string().required()
    }
  }),
  stage: yup.string()
})

export const LoginSignup = () => {
  const [stage, setStage] = useState("login")
  const [isLoading, setIsloading] = useState(false)
  const dispatch = useAppDispatch()
  const router = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    "resolver": yupResolver(Schema),
    defaultValues: {
      stage
    }
  })

  const onSubmit = async (data) => {
    console.log({ data })
    if (stage == "login") {
      try {
        setIsloading(true)
        const req = await http.post("/api/Account/login", {
          email: data.email,
          password: data.password
        })
        const response = req.data
        if (response.token) {
          dispatch(setUser({ email: data.email, token: response.token }))
          reset({})

          toast.success("Sucessful", { description: "Successfully logged in" })
          router("/")
        }
      } catch (error) {
        toast("Error", {
          description: "Incorrect credentials"
        })
      } finally {
        setIsloading(false)
      }
    } else {
      try {
        setIsloading(true)
        const req = await http.post("/api/Account/register", {
          email: data.email,
          password: data.password,
          name: data.name,
        })
        const response = req.data
        reset()
        toast.success("Sucessful", { description: "Successfully signed up, please check your email to verify your account" })
        router("/")
      } catch (error) {
        toast("Error", {
          description: "There was an unexpected errors"
        })
      } finally {
        setIsloading(false)
      }
    }
  }

  return (
    <div className='loginsignup'>
      <form onSubmit={handleSubmit(onSubmit)} className="loginsignup-container">
        <h1>{stage == "login" ? "Log In" : "Sign Up"}</h1>
        <div className="loginsignup-fields">
          {stage == "signup" &&
            <>

              <input type='text' placeholder='Your Name' {...register("name")} />
              {errors.name && <p className='label-error'>
                {
                  errors.name.message
                }
              </p>}
            </>
          }
          <input type='email' placeholder='Email Address' {...register("email")} />
          {errors.email && <p className='label-error'>
            {
              errors.email.message
            }
          </p>}
          <input type='password' placeholder='Password' {...register("password")} />
          {errors.password && <p className='label-error'>
            {
              errors.password.message
            }
          </p>}
        </div>
        <button disabled={isLoading} type="submit">{isLoading ? "Loading..." : stage == "login" ? "Login" : "Signup"}</button>
        {
          stage == "signup" ?
            <p className="loginsignup-login">Already have an account? <span style={{ cursor: "pointer" }} onClick={() => setStage("login")}>Login here</span></p>
            :
            <p className="loginsignup-login">Dont have an account? <span style={{ cursor: "pointer" }} onClick={() => setStage("signup")}>Sign up</span></p>
        }
        <div className="loginsignup-agree">
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
      </form>
    </div>
  )
}
