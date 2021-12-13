import { createAction, createReducer } from "@reduxjs/toolkit";
import { IUser } from "../../models/redux.interfaces";

const initialState = {
  authorized: false,
  username: null,
} as IUser;

export const logIn = createAction<IUser>("LOG_IN");
export const logOut = createAction("LOG_OUT");

export default createReducer(initialState, {
  [logIn.type]: function (state: any, action) {
    return {
      authorized: true,
      username: action.payload.username,
      img: action.payload.img,
      firstName: action.payload.firstName,
      secondName: action.payload.secondName,
      phone: action.payload.phone,
    };
  },
  [logOut.type]: function (state: any, action) {
    return { authorized: false, username: null };
  },
});
