import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  authorized: false,
  username: null,
};

export const logIn = createAction<string>("LOG_IN");
export const logOut = createAction("LOG_OUT");

export default createReducer(initialState, {
  [logIn.type]: function (state: any, action) {
    return { authorized: true, username: action.payload };
  },
  [logOut.type]: function (state: any, action) {
    return { authorized: false, username: null };
  },
});
