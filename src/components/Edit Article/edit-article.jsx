import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditArticle } from "../../store/asyncActions/fetchEditArticle";
import { useNavigate, useParams } from "react-router-dom";

export default function EditArticle() {
  const { slug } = useParams();

  const { body, title, description, tagList } = useSelector(
    (state) => state.fullArticle.data,
  );

  let i = 0;
  const tagsList = tagList.map((tag) => {
    i++;
    return { id: i, value: tag };
  });

  const [tags, setTags] = useState(tagsList);

  const [tagsCounter, setTagsCounter] = useState(tagsList.length);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addTagField = () => {
    const prevId = tagsCounter;
    const newId = prevId + 1;
    const id = newId;
    setTagsCounter(newId);
    setTags([...tags, { id, value: "" }]);
  };

  const removeTagField = (id) => {
    const idx = tags.findIndex((tag) => tag.id === id);
    setTags((tags) => {
      return [...tags.slice(0, idx), ...tags.slice(idx + 1)];
    });
  };

  const handleTagValue = (e, id) => {
    const idx = tags.findIndex((tag) => tag.id === id);
    const newValue = { id, value: e.target.value };
    const prevTagsList = [...tags];
    const newTagsList = prevTagsList.with(idx, newValue);
    setTags(newTagsList);
  };

  const getTagsList = () => {
    let list = [];
    for (let key in tags) {
      list.push(tags[key].value);
    }
    return list;
  };

  const renderTagsFields = () => {
    return tags.map((tag) => {
      return (
        <div key={tag.id} className="tags-list__tag">
          <input
            defaultValue={tag.value}
            onChange={(e) => handleTagValue(e, tag.id)}
            className="tags-input"
            type="text"
            placeholder="Tag"
          />
          <button
            type="button"
            className="tags-delete-btn"
            onClick={() => removeTagField(tag.id)}
          >
            Delete
          </button>
        </div>
      );
    });
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const newData = { ...data, tagList: getTagsList() };
    dispatch(fetchEditArticle(newData, slug));
    navigate(`/articles/${slug}`);
  };

  return (
    <div className="create-article">
      <div className="create-article__content">
        <span className="create-article__content__title">Edit article</span>
        <form className="new-article-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="new-article-form__title">
            <span>Title</span>
            <input
              {...register("title", { required: "введите заголовок статьи" })}
              defaultValue={title}
              className="input__title"
              type="text"
              placeholder="Title"
            ></input>
          </label>
          <span className="error-validation">{errors.title?.message}</span>
          <label className="new-article-form__short-description">
            <span>Short description</span>
            <input
              {...register("description", {
                required: "введите описание статьи",
              })}
              defaultValue={description}
              type="text"
              placeholder="Description"
            ></input>
          </label>
          <span className="error-validation">
            {errors.description?.message}
          </span>
          <label className="new-article-form__text">
            <span>Text</span>
            <textarea
              {...register("body", { required: "введите текст статьи" })}
              placeholder="Text"
              defaultValue={body}
            ></textarea>
          </label>
          <span className="error-validation">{errors.text?.message}</span>
          {/* {tags} */}
          <label className="new-article-form__tags">
            {/* tags-list */}
            <div className="tags-list">
              <span>Tags</span>
              {renderTagsFields()}
            </div>
            <button
              type="button"
              className="new-article-form__tags__add-btn"
              onClick={() => addTagField()}
            >
              Add tag
            </button>
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
