import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ticketReducer from './reducers/ticket';
import allTicketsReducer from './reducers/allTickets'

const rootReducers = combineReducers({
  ticket: ticketReducer,
  allTickets: allTicketsReducer
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
