import React, { useEffect } from "react";

import "./main.css";
import PostsList from "../PostsList/";
import FullArticle from "../FullArticle";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "../SignupForm";
import SignInForm from "../SigninForm";
import EditProfile from "../EditProfile";
import NewArticle from "../CreateArticle";
import EditArticle from "../Edit Article";
import RequireAuth from "../hoc/require-auth";

export default function Main() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/articles/:slug" element={<FullArticle />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <EditProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/new-article"
          element={
            <RequireAuth>
              <NewArticle />
            </RequireAuth>
          }
        />
        <Route path="articles/:slug/edit" element={<EditArticle />} />
      </Routes>
    </div>
  );
}
