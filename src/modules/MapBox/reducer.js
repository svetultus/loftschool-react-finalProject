import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  addressListSuccess,
  routeRequest,
  routeSuccess,
  routeFailure,
  newOrderRequest
} from "./actions";

import { createSelector } from "reselect";

const addressList = handleActions(
  {
    [addressListSuccess]: (state, action) => action.payload.addresses
  },
  null
);

const route = handleActions(
  {
    [routeRequest]: state => null,
    [routeSuccess]: (state, action) => action.payload,
    [routeFailure]: state => null,
    [newOrderRequest]: state => null
  },
  null
);

const order = handleActions(
  {
    [routeRequest]: state => false,
    [routeSuccess]: state => true,
    [routeFailure]: state => false,
    [newOrderRequest]: state => false
  },
  false
);

export const getAddressList = createSelector(
  state => state.mapBox.addressList,
  addressList => addressList
);

export const getAddressesForRoute = createSelector(
  state => state.mapBox.addressesForRoute,
  addressesForRoute => addressesForRoute
);

export const getRoute = createSelector(
  state => state.mapBox.route,
  route => route
);

export const getOrder = createSelector(
  state => state.mapBox.order,
  order => order
);

export default combineReducers({
  addressList,
  route,
  order
});
