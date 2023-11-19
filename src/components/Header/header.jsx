import React from "react";

import './header.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/action-auth";
import Cookies from "js-cookie";

export default function Header() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/');
    dispatch(logOut());
    Cookies.remove('auth_realworld_blog');
  }

  const img = useSelector(state => state.auth.image);

  const username = useSelector(state => state.auth.username);

  const menu = isLoggedIn ? 
    (
      <div className="page-header__profile-menu">
          <Link to='/new-article'>
            <button type="button" className="profile-menu__create-article--btn">
              Create article
            </button>
          </Link>
          <Link to="/profile">
            <label className="profile-menu__userinfo">
              <span>{username}</span>
              <img src={img} alt='profile_img'></img>
            </label>
          </Link>
          <Link onClick={() => handleLogOut()}>
            <button type="button" className="profile-menu__logout--btn">
              Log Out
            </button>
          </Link>
        </div>
    ) :
    (
      <div className="page-header__auth-menu">
          <Link to={`/sign-in`}>
            <button type="button" className="signin-button">Sign in</button>
          </Link>
          <Link to={`/sign-up`}>
            <button type="button" className='signup-button'>Sign up</button>
          </Link>
        </div>
    );

  return (
    <div>
      <header className="page-header">
        <Link to={`/`}>
          <div className="page-header__title">
            <span>RealWorld Blog</span>
          </div>
        </Link>
        {menu}
      </header>
    </div>
  );
}