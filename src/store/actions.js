export const addArticlesData = (payload) => ({type: "ADD_ARTICLES_DATA", payload});

export const clearData = () => ({type: "CLEAR_DATA"})

export const searchStoped = () => ({type: "SEARCH_STOPED"});

export const errorFetching = () => ({type: "ERROR_FETCHING"});

export const addFullArticle = (payload) => ({type: 'ARTICLE_ADD_DATA', payload});

export const articleClearData = () => ({type: "ARTICLE_CLEAR_DATA"})

export const articleSearchStopped = () => ({type: "ARTICLE_SEARCH_STOPED"});

export const articleErrorFetching = () => ({type: "ARTICLE_ERROR_FETCHING"});