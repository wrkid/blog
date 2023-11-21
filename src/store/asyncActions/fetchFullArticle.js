import { articleClearData, articleSearchStopped, articleErrorFetching, addFullArticle } from "../actions"

export const fetchFullArticle = (slug, token) => async dispatch => {
    dispatch(articleClearData());
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
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