import React, { useEffect, useState } from "react";

import './posts-list.css'

import { Spin } from "antd";

import PostCard from '../PostCard'
import MyPagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../store/asyncActions/fetchArticles";

export default function PostsList() {

  const [  page, setPage ] = useState(1);

  const dispatch = useDispatch();

  const isLoaded = useSelector(state => state.articles.stop);

  useEffect(() => {
    dispatch(fetchArticles(page))
  }, [dispatch, page])

  const articles = useSelector(state => state.articles.data);

  const total = useSelector(state => state.articles.total);

  const changePage = (page) => {
    setPage(page);
  }

  const postCardList = articles.map(article => <PostCard props={article} key={`${article.slug}`} />)

  return (
      <div className="posts-list">
        {!isLoaded && <Spin className="my-spinner" size="large"/>}
        {postCardList}
        <MyPagination total={total} current={page} changePage={(page) => changePage(page)}/>
      </div>
  );
}