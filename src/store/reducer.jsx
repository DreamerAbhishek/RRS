const initialState = {
  cardItems: "",
  cardItemFilters: "",
  active: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CARD_ITEM`:
      return { ...state, cardItems: action.payload };
    case `CARD_ITEM_FILTER`:
      return { ...state, cardItemFilters: action.payload };
    case `SEARCH_ACTIVE`:
      return { ...state, active: action.payload };
    default:
      return state;
  }
};

export default reducer;
