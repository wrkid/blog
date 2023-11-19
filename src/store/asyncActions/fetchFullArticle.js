import { articleClearData, articleSearchStopped, articleErrorFetching, addFullArticle } from "../actions"

export const fetchFullArticle = (slug) => async dispatch => {
  console.log('fetchint slag: ', slug)
    dispatch(articleClearData());
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
      const json = await response.json();
      if (response.status === 200) {
        dispatch(addFullArticle(json.article));
        dispatch(articleSearchStopped());
      } else {
        throw Error;
      }
    } catch (err){
      dispatch(articleErrorFetching());
    }
}