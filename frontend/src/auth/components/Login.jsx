import React, { useEffect } from 'react'
import '../styles/page.scss'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router';
import { Link } from 'react-router'
import "../../app.scss"

const Login = () => {
    console.log("rendering");

  const { loading, user, handlelogin, handlegetme } = useAuth()
  
  const [error, seterror] = useState("");

  const { handleSubmit, register, reset, formState: { errors } } = useForm();
  
    

    const navigate = useNavigate();
    

    const [Visible, setVisible] = useState(false);
    function handletoggle() {
        setVisible(!Visible);
    }

  const login = async (data) => {
    try {
      const { username, password } = data
      await handlelogin(username, password);
      reset();
      navigate('/home')
    }
        catch(err) {
      seterror("invalid credentials");
        }
        
    }

    if(loading) {
        return (
            <div className='main'>
                <h1 className='load'>Loading.....</h1>
            </div>
        )
    }



  return (
    <div className="main">
      <div className="form-elem">
        <h1>Login</h1>
        <p>{error}</p>
        <form onSubmit={handleSubmit(login)} className="form-tag">
          <input
            {...register("username", {
              required: true,
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
            login
          </button>
        </form>
        <h3>
              do no have an account?
          <Link className="link" to="/register">
            Register
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Login