const setLoadingActions = (state, action) => {
  state.isMainLoading = action.payload;
};
export { setLoadingActions };
