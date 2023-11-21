import Cookies from "js-cookie";
import { clearData, addArticlesData, searchStoped, errorFetching } from "../actions"

export const fetchArticles = (page = 1) => async dispatch => {
  const token = Cookies.get('auth_realworld_blog');
  const offset = (page - 1 ) * 5;
    dispatch(clearData());
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
      const json = await response.json();
      if (response.status === 200) {
        dispatch(addArticlesData([json, page]));
        dispatch(searchStoped());
      } else {
        throw Error;
      }
    } catch (err){
      dispatch(errorFetching());
    }
  }