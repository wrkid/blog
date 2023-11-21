import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

import { articlesReducer } from './articlesReducer';
import { fullArticleReducer } from "./fullArticleReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
  articles: articlesReducer,
  fullArticle: fullArticleReducer,
  auth: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));