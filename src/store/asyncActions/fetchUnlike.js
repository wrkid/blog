import { editArticle } from '../actions'

export const fetchUnlike = (slug, token) => async dispatch => {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });
    const json = await response.json();
    dispatch(editArticle(json.article));
  } catch (err){
    console.log(err)
  }
}