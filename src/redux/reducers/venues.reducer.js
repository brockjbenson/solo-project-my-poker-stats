import { combineReducers } from "redux";

const allVenuesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_VENUES":
      return action.payload;
    default:
      return state;
  }
};

const getSpecificVenueStatsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SPECIFIC_VENUE_STATS":
      return action.payload;
    default:
      return state;
  }
};

const getVenuesSessionsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SPECIFIC_VENUE_SESSIONS":
      return action.payload;
    default:
      return state;
  }
};

const getVenuesStatsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_VENUES_STATS":
      return action.payload;
    default:
      return state;
  }
};

const getSpecificSessionReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SPECIFIC_SESSION":
      return action.payload;
    default:
      return state;
  }
};

const getSpecificVenueReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SPECIFIC_VENUE":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
export default combineReducers({
  allVenuesReducer,
  getSpecificVenueStatsReducer,
  getVenuesStatsReducer,
  getVenuesSessionsReducer,
  getSpecificSessionReducer,
  getSpecificVenueReducer,
});
