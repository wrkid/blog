import React, { useEffect } from "react";

import "./signup-form.css";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistration } from "../../store/asyncActions/fetchRegistration";
import { notification } from "antd";

export default function SignUpForm() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [api, contextHolder] = notification.useNotification();

  const error = useSelector(state => state.auth.error);

  useEffect(() => {
    if (error) {
      openNotification();
    };
  }, [error])

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

  const onSubmit = (data) => {
    dispatch(fetchRegistration(data));
    if (!error) {
      navigate('/');
    }
  }

  const _usernameValidation = {
    required: "поле обязательно для заполнения",
    minLength: {
      value: 3,
      message: 'минимальная длина 3 символа'
    },
    maxLength: {
      value: 20,
      message: 'максимальная длина 20 символов'
    },
    pattern: {
      value: (/^[a-zA-Z](?=[\w.-]*?\w$)|^[a-zA-Z]$/g),
      message: "логин не должен содержать некоторых символов"
    }
  };

  const _emailValidation = {
    required: "введите email",
    pattern: {
      value: (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g),
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

  const __repeatpasswordValidation = {
    required: "Введенные пароли не совпадают",
    validate:(value) => value === watch("password") || 'Введенные пароли не совпадают',
  };

  const _checkboxValidation = {
    required: "необходимо подтвредить передачу данных",
  }

  // console.log(watch("username"))

  return (
    <div className="auth-container">
      {contextHolder}
      <div className="auth-container__content">
        <div className="auth-container__content__title">Create new account</div>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form" action="#">
           {/* Username */}
          <label className="auth-form__input">
            <span className="auth-form__input__title">Username</span>
            <input type="text" {...register('username', _usernameValidation)} placeholder="Username" ></input>
          </label>
          <span className="error-validation">{errors.username?.message}</span>
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
           {/* Repeat Password */}
          <label className="auth-form__input">
            <span className="auth-form__input__title">Repeat Password</span>
            <input type="password" {...register('repeatPassword', __repeatpasswordValidation)} placeholder="Password" ></input>
          </label>
          <span className="error-validation">{errors.repeatPassword?.message}</span>
          <div className="figure-line grey"/>
          <span className="error-validation">{errors.checkbox?.message}</span>
          <label className="auth-form__checkbox">
            <input type="checkbox" {...register('checkbox', _checkboxValidation)}/>
            <span>I agree to the processing of my personal information</span>
          </label>
          <button className="auth_button"
                  type="submit">
                    Create
          </button>
        </form>
        <span className="auth-bottom">Already have an account?<Link to="/sign-in">{` Sign in.`}</Link></span>
      </div>
    </div>
  );
}