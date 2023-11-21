import { errorCreate, logIn } from "../action-auth";

export const fetchLogIn = (body) => async dispatch => {
  const data = {
    "user": {
      "email": body.email,
      "password": body.password
    }
  };
  try {
    const response = await fetch(`https://blog.kata.academy/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    if (response.status === 200) {
      dispatch(logIn(json.user));
    } else {
      const key = Object.keys(json.errors)[0];
      const value = json.errors[key];
      const error = key + ' ' + value;
      throw new Error(error);
    }
  } catch (err){
    dispatch(errorCreate(err.message));
    setTimeout(() => {
      dispatch(errorCreate(false))
    }, 2000)
  }
}