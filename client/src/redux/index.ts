import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user';
import ticketReducer from './reducers/ticket';
import allTicketsReducer from './reducers/allTickets'

const rootReducers = combineReducers({
  user: userReducer,
  ticket: ticketReducer,
  allTickets: allTicketsReducer
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
