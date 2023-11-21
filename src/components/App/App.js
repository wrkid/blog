import React, { useEffect } from "react";
import Header from "../Header";
import Main from "../Main";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { fetchCurrnetUser } from "../../store/asyncActions/fetchCurrentUser";

export default function App() {
  const token = Cookies.get('auth_realworld_blog');
  const dispatch = useDispatch();

  useEffect(() => {
    if (token ) {
      dispatch(fetchCurrnetUser(token));
    }
  }, [])

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}
