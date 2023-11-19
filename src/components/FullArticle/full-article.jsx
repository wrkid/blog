import React, { useEffect } from "react";

import { Spin } from "antd";

import './full-article.css'
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchFullArticle } from "../../store/asyncActions/fetchFullArticle";
import PostCard from "../PostCard";

export default function FullArticle() {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const props = useSelector(state => state.fullArticle.data);

  const isLoaded = useSelector(state => state.fullArticle.stop);

  useEffect(() => {
    dispatch(fetchFullArticle(slug))
  }, [])

  console.log(props)

  return (
    <div className="post-container">
        {!isLoaded && <Spin  className="my-spinner" size="large"/>}
        {isLoaded && <PostCard props={props} isCurrent='true'/>}
    </div>
  );
}