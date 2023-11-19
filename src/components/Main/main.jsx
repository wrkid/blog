import React, { useEffect } from "react";

import './main.css'
import PostsList from "../PostsList/";
import FullArticle from '../FullArticle'
import { Route, Routes } from "react-router-dom";
import SignUpForm from "../SignupForm";
import SignInForm from '../SigninForm'
import EditProfile from "../EditProfile";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { fetchCurrnetUser } from "../../store/asyncActions/fetchCurrentUser";
import NewArticle from "../CreateArticle";

export default function Main() {
  const token = Cookies.get('auth_realworld_blog');
  const dispatch = useDispatch();

  useEffect(() => {
    if (token ) {
      dispatch(fetchCurrnetUser(token));
    }
  }, [])

  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<PostsList />}/>
        <Route path="/articles/:slug" element={<FullArticle />}/>
        <Route path="/sign-in" element={<SignInForm />}/>
        <Route path="/sign-up" element={<SignUpForm />}/>
        <Route path='/profile' element={<EditProfile />}/>
        <Route path="/new-article" element={<NewArticle />} />
      </Routes>
    </div>
  );
}