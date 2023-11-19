export const logging = (store) => (next) => (action) => {
  console.log('dispatching: ', action.type);
  const result = next(action);
  console.log(store.getState());
  return result;
}