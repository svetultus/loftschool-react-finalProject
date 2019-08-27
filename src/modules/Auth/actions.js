import { createAction } from "redux-actions";

export const authRequest = createAction("AUTH_REQUEST");
export const authSuccess = createAction("AUTH_SUCCESS");
export const authFailure = createAction("AUTH_FAILURE");

export const logoutRequest = createAction("LOGOUT_REQUEST");
