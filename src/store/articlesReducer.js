const initialState = {
  page: 1,
  data: [],
  total: 0,
  stop: false,
  error: false
};

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ARTICLES_DATA':
      return {...state, page: action.payload[1], data: action.payload[0].articles, total: action.payload[0].articlesCount};
    case 'SEARCH_STOPED':
      return {...state, stop: true}
    case 'CLEAR_DATA':
      return initialState;
    case 'ERROR_FETCHING':
      return {...initialState, error: true};
    default:
      return state;
  }
}