import { errorCreate, logIn } from "../action-auth";

export const fetchRegistration = (body) => async dispatch => {
  const data = {
    "user": {
      "username": body.username,
      "email": body.email,
      "password": body.password
    }
  }
  try {
    const response = await fetch(`https://blog.kata.academy/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      throw Error;
    }
  } catch (err){
    dispatch(errorCreate(err));
  }
}