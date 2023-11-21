import Cookies from "js-cookie";

export const fetchDeleteArticle = (slug) => async dispatch => {
  const token = Cookies.get('auth_realworld_blog');
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });
    const json = await response.json();
    console.log(json)
  } catch (err){
    console.log(err)
  }
}