import React from "react";

import './new-article.css'

export default function NewArticle() {
  return (
    <div className="create-article">
      <div className="create-article__content">
        <span className="create-article__content__title">Create new article</span>
        <form className="new-article-form">
          <label className="new-article-form__title">
            <span>Title</span>
            <input className="input__title" type="text" placeholder="Title"></input>
          </label>
          <label className="new-article-form__short-description">
              <span>Short description</span>
              <input type="text" placeholder="Description"></input>
          </label>
          <label className="new-article-form__text">
              <span>Text</span>
              <textarea placeholder="Text"></textarea>
          </label>
          {/* <Tags /> */}
          <button type="submit">
                    Send
          </button>
        </form>
      </div>
    </div>
  );
}