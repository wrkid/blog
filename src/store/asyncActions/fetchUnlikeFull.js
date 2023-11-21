import { articleEdit } from '../actions'

export const fetchUnlikeFull = (slug, token) => async dispatch => {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });
    const json = await response.json();
    dispatch(articleEdit(json.article));
  } catch (err){
    console.log(err)
  }
}