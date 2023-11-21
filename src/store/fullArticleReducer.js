const initialState = {
  slug: '#',
  data: [],
  stop: false,
  error: false
};

export const fullArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ARTICLE_ADD_DATA':
      return {...state, slug: action.payload.slug, data: action.payload};
    case 'ARTICLE_SEARCH_STOPED':
      return {...state, stop: true}
    case 'ARTICLE_CLEAR_DATA':
      return initialState;
    case 'ARTICLE_ERROR_FETCHING':
      return {...initialState, error: true};
    case 'ARTICLE_EDIT':
      return {...state, data: action.payload}
    default:
      return state;
  }
}