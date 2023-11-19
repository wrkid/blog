export const createNewProfile = (payload) => ({type: 'CREATE_NEW_PROFILE', payload});

export const errorCreate = (payload) => ({type: 'ERROR_CREATE', payload});

export const logOut = () => ({type: 'LOG_OUT'});

export const logIn = (payload) => ({type: 'LOG_IN', payload})