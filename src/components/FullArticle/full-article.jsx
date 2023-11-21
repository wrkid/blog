import React, { useEffect } from "react";

import { Spin } from "antd";

import "./full-article.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchFullArticle } from "../../store/asyncActions/fetchFullArticle";
import PostCard from "../PostCard";
import Cookies from "js-cookie";

export default function FullArticle() {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const props = useSelector((state) => state.fullArticle.data);

  const isLoaded = useSelector((state) => state.fullArticle.stop);

  const token = Cookies.get("auth_realworld_blog"); //useSelector(state => state.auth.token)

  useEffect(() => {
    dispatch(fetchFullArticle(slug, token));
  }, []);

  return (
    <div className="post-container">
      {!isLoaded && <Spin className="my-spinner" size="large" />}
      {isLoaded && <PostCard props={props} isCurrent="true" />}
    </div>
  );
}
