import React, { useEffect } from "react";

import { format } from "date-fns";
import  Markdown  from "react-markdown";

import { Button, Popconfirm } from 'antd';

import './post-card.css';

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchLike } from '../../store/asyncActions/fetchLike';

import { fetchUnlike } from '../../store/asyncActions/fetchUnlike';
import { fetchLikeFull } from "../../store/asyncActions/fetchLikeFull";
import { fetchUnlikeFull } from "../../store/asyncActions/fetchUnlikeFull";
import { fetchDeleteArticle } from '../../store/asyncActions/fetchDeleteArticle'
import Cookies from "js-cookie";

export default function PostCard({props, isCurrent = false}) {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const myUN = useSelector(state => state.auth.username);

  const token = Cookies.get('auth_realworld_blog')//useSelector(state => state.auth.token);

  const isOwner = props.author.username === myUN && isCurrent;

  const { favorited, slug } = props;

  useEffect(() => {

  }, [favorited])

  let i = 0;
  const tagList = props.tagList.map(tag => {
    i++;
    return (
      <div 
        key={`tag${i}`}
        className="tag">
        {tag.slice(0,10)}
      </div>
    )
  })

  const fullArticleStyle = isCurrent ? "full-article" : "";

  const headerTitle = !isCurrent ? 
        (<Link to={`/articles/${props.slug}`} params={{slug: props.slug}}>
            <span className="post-card__info__title__header__title">{props.title.slice(0, 50)}</span>
        </Link>) : 
        (<span className="post-card__info__title__header__title">{props.title.slice(0, 50)}</span>);

  const editButtons = isCurrent && isLoggedIn && isOwner ? (
    <div className="edit-buttons">
      <Popconfirm
        title="Delete the article"
        description="Are you sure to delete this task?"
        okText="Yes"
        cancelText="No"
        onConfirm={() => handleDelete()}
      >
        <Button danger className='btn delete'>Delete</Button>
      </Popconfirm>
      <Link to={`/articles/${slug}/edit`} params={{slug: props.slug}}><button className="btn edit">Edit</button></Link>
    </div>
  ) : null;


  const description = isCurrent ? 
        props.description :
        props.description.length > 219 ? props.description.slice(0, 220).concat('...') : props.description;

  let isLikedStyle = favorited ? "post-card__info__title__header__liked" : "post-card__info__title__header__unliked";


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(fetchDeleteArticle(slug));
    navigate('/');
  }


  const handleLike = () => {
    if (isLoggedIn && !favorited && isCurrent) {
      dispatch(fetchLikeFull(slug, token))
    } else if (isLoggedIn && favorited && isCurrent){
      dispatch(fetchUnlikeFull(slug, token))
    } else if (isLoggedIn && !favorited) {
      dispatch(fetchLike(slug, token));
    } else if (isLoggedIn && favorited) {
      dispatch(fetchUnlike(slug, token))
    }
  };

  return (
    <div className={fullArticleStyle}>
      <div className="post-card">
        <div className="post-card__content">
          <div className="post-card__info">
            <div className="post-card__info__title">
              <div className="post-card__info__title__header">
                  {headerTitle}
                  <button className={isLikedStyle} onClick={() => handleLike()}>
                    <span>{props.favoritesCount}</span>
                  </button>
              </div>
              <div className="post-card__info__title__tags">
                  {tagList.slice(0, 5)}
              </div>
            </div>
            <div className="post-card__author">
                <div className="post-card__author__info">
                  <span className="post-card__author__info__username">{props.author.username}</span>
                  <span className="post-card__author__info__date-of-post">{format(new Date(props.createdAt), 'MMMM d, yyyy')}</span>
                </div>
                <img src={props.author.image} alt='author_img'/>
            </div>
          </div>
          <div className="post-card__description">
            <span>{description}</span>
            {editButtons}
          </div>
          {isCurrent && (
          <div className="post-card__content__body">
            <Markdown>{props.body}</Markdown> 
          </div>)}
        </div>
      </div>
    </div>
  );
}