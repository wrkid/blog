import { errorCreate, logIn } from "../action-auth";

export const fetchEditProfile = (body) => async dispatch => {
  const data = {
    "user": body[0],
  };

  try {
    const response = await fetch(`https://blog.kata.academy/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${body[1]}`,
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    if (response.status === 200) {
      const request_info = await fetch(`https://blog.kata.academy/api/user`, {
        headers: {
          'Authorization': `Bearer ${json.user.token}`,
        }
      })
      const info = await request_info.json();
      dispatch(logIn(info.user));
    } else {
      throw new Error();
    }
  } catch (err){
    dispatch(errorCreate(err.message));
  }
}