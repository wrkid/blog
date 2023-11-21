import React, { useEffect } from "react";

import { useForm } from "react-hook-form";

import { notification } from "antd";

import './signin-form'

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogIn } from "../../store/asyncActions/fetchLogIn";

export default function SignInForm() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: 'Something went wrong',
      description:
        `${error}`,
      className: 'custom-class',
      style: {
        width: 600,
      },
    });
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isSignedIn = useSelector(state => state.auth.isLoggedIn);
  const error = useSelector(state => state.auth.error)

  useEffect(() => {
    if (isSignedIn)
      navigate('/');
    if (error) {
      openNotification();
    }
  }, [isSignedIn, error])

  const onSubmit = (data) => {
    dispatch(fetchLogIn(data)); 
  }

  const _emailValidation = {
    required: "введите email",
    pattern: {
      value: (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
      message: "введите корректный email"
    },
  };

  const _passwordValidation = {
    required: "поле обязательно для заполнения",
    minLength: {
      value: 6,
      message: 'минимальная длина 6 символов'
    },
    maxLength: {
      value: 40,
      message: 'максимальная длина 40 символов'
    }
  };

  return (
    <div className="auth-container">
      {contextHolder}
      <div className="auth-container__content">
        <div className="auth-container__content__title">Sign In</div>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label className="auth-form__input">
            <span className="auth-form__input__title">Email address</span>
            <input type="text" {...register('email', _emailValidation)} placeholder="Email Address" ></input>
          </label>
          <span className="error-validation">{errors.email?.message}</span>
          {/* Password */}
          <label className="auth-form__input">
            <span className="auth-form__input__title">Password</span>
            <input type="password" {...register('password', _passwordValidation)} placeholder="Password" ></input>
          </label>
          <span className="error-validation">{errors.password?.message}</span>
          <button className="auth_button"
                  type="submit">
            Login
          </button>
        </form>
        <span className="auth-bottom">Don't have an account?<Link to="/sign-up">{` Sign up.`}</Link></span>
      </div>
    </div>
  );
}