import Cookies from "js-cookie";

export const fetchEditArticle = (data, slug) => async dispatch => {
  const body = {"article": data};
  const token = Cookies.get('auth_realworld_blog');
  try {
    await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    });
  } catch (err){
  }
}