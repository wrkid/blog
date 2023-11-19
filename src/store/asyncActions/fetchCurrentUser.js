import { logIn } from "../action-auth";

export const fetchCurrnetUser = (token) => async dispatch => {
  const request_info = await fetch(`https://blog.kata.academy/api/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
  if (request_info.status === 200) {
    const info = await request_info.json();
    console.log('got token and info is: ', info)
    dispatch(logIn(info.user));
  } else {
    alert('error')
  }
}