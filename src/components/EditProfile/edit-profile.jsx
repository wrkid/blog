import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditProfile } from "../../store/asyncActions/fetchEditProfile";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {

  const auth = useSelector(state => state.auth);

  const { username, email, token, error } = auth;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username,
      email 
    }
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    let body = {}
    if (data.password) {
      body = {...body, password: data.password};
    };
    if (data.avatarImage) {
      body = {...body, image: data.avatarImage}
    };
    dispatch(fetchEditProfile([body, token]))
    if(!error) {
      navigate('/');
    }
  };

  const _usernameValidation = {
    disabled: true
  };

  const _emailValidation = {
    disabled: true
  };

  const _passwordValidation = {
    minLength: {
      value: 6,
      message: 'минимальная длина 6 символов'
    },
    maxLength: {
      value: 40,
      message: 'максимальная длина 40 символов'
    }
  };

  const _imageUrlValidation = {
    pattern: {
      value: (/(https?:\/\/.*\.(?:png|jpg))/i),
      message: "Введите корректный url"
    },
  }

  return (
    <div className="auth-container">
      <div className="auth-container__content">
        <div className="auth-container__content__title">Edit Profile</div>
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
          {/* New Password */}
          <label className="auth-form__input">
            <span className="auth-form__input__title">New Password</span>
            <input type="password" {...register('password', _passwordValidation)} placeholder="Password" ></input>
          </label>
          <span className="error-validation">{errors.password?.message}</span>
          {/* Avatar Image */}
          <label className="auth-form__input">
            <span className="auth-form__input__title">Avatar Image (url)</span>
            <input type="text" {...register('avatarImage', _imageUrlValidation)} placeholder="Avatar Image" ></input>
          </label>
          <span className="error-validation">{errors.avatarImage?.message}</span>
          <button className="auth_button"
                  type="submit">
                    Save
          </button>
        </form>
      </div>
    </div>
  );
};