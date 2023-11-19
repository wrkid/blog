import { clearData, addArticlesData, searchStoped, errorFetching } from "../actions"

export const fetchArticles = (page = 1) => async dispatch => {
  console.log('page', page)
  const offset = (page - 1 ) * 5;
    dispatch(clearData());
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`);
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