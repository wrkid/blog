export const fetchNewArticle = (data, token) => async dispatch => {
  const body = {"article": data};
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    });
    const json = await response.json();
    console.log(json)
  } catch (err){
    console.log(err)
  }
}