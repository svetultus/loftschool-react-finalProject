import { createAction } from "redux-actions";

export const userRequest = createAction("USER_REQUEST");
export const userSuccess = createAction("USER_SUCCESS");
export const userFailure = createAction("USER_FAILURE");
export const checkUserIsPayable = createAction("CHECK_USER_IS_PAYABLE");
