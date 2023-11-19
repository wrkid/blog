import React from "react";

import { format } from "date-fns";
import  Markdown  from "react-markdown";

import './post-card.css';

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// import heart from '../../assets/img/heart.svg'

export default function PostCard({props, isCurrent = false}) {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const isOwner = false;
  
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
      <button className="btn delete">Delete</button>
      <button className="btn edit">Edit</button>
    </div>
  ) : null;


  const description = isCurrent ? 
        props.description :
        props.description.length > 219 ? props.description.slice(0, 220).concat('...') : props.description;

  return (
    <div className={fullArticleStyle}>
      <div className="post-card">
        <div className="post-card__content">
          <div className="post-card__info">
            <div className="post-card__info__title">
              <div className="post-card__info__title__header">
                  {headerTitle}
                  <button className="post-card__info__title__header__likes">
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