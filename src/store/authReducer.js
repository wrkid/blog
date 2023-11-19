import Cookies from "js-cookie";

const initialState = {
  isLoggedIn: false,
  email: '',
  token: '',
  username: '',
  bio: '',
  image: null,
  error: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ERROR_CREATE':
      console.log('GOT ERROR', action.payload);
      return {...initialState, error: action.payload};
    case 'LOG_IN':
      const { email, token, username, bio, image } = action.payload;
      Cookies.set('auth_realworld_blog', token, {expires: 1})
      return {...initialState, isLoggedIn: true, email, token, username, bio, image}
    case 'LOG_OUT':
      Cookies.remove('auth')
      return {...initialState};
    default:
      return state;
  }
}