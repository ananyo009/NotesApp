import React from 'react'
import '../styles/page.scss'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router';
import { Link } from 'react-router'
import "../../app.scss"

const Register = () => {
    console.log("rendering");

    const {loading,user,handleregister} = useAuth()

    const { handleSubmit, register,reset, formState: { errors } } = useForm();
    

    const navigate = useNavigate();
    

    const [Visible, setVisible] = useState(false);
    function handletoggle() {
        setVisible(!Visible);
    }

    const login = async(data) => {
        const {email, username , password} = data
        await handleregister(email,username, password);
        reset();

        navigate('/login')
        
    }

    if (loading) {
        return (
            <div className='main'>
                <h1 className='load'>Loading.....</h1>
            </div>
        )
    }



  return (
    <div className="main">
      <div className="form-elem">
        <h1>Register</h1>
              <form onSubmit={handleSubmit(login)} className="form-tag">
                  <input className='input' {...register("email", {
                      required: true,
                      message:"email is required"
                  })} type="text" placeholder='enter your email' />
                  {errors.email && <p>{errors.email.message}</p>}
                  
          <input
            {...register("username", {
              required: true,
              minLength: {
                value: 6,
                message: "atleast 6 letters required",
              },
            })}
            className="input"
            type="text"
            placeholder="enter your username"
          />
          {errors.username && <p>{errors.username.message} </p>}
          <div className="pass">
            <input
              {...register("password", {
                required: true,
              })}
              className="input"
              placeholder="enter your password"
              type={Visible ? "text" : "password"}
            />
            <button type="button" onClick={handletoggle}>
              {Visible ? (
                <FaEye className="eye" />
              ) : (
                <FaEyeSlash className="eye" />
              )}
            </button>
          </div>
          {errors.password && <p>{errors.password.message} </p>}

          <button className="btn" type="submit">
            Register
          </button>
              </form>
              <h3>already have an account <Link className='link' to='/login'>Login</Link></h3>
      </div>
    </div>
  );
}

export default Register