import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  mapRequest,
  mapSuccess,
  mapFailure,
  addressListRequest,
  addressListSuccess,
  addressListFailure,
  routeRequest,
  routeSuccess,
  routeFailure,
  newOrderRequest,
  newOrderSuccess,
  newOrderFailure
} from "./actions";

import { createSelector } from "reselect";

const map = handleActions(
  {
    [mapRequest]: (state, action) => null,
    // [mapSuccess]: (state, action) => ({ ...state, map: action.payload }),
    [mapFailure]: (state, action) => null
  },
  null
);
const addressList = handleActions(
  {
    [addressListRequest]: state => state,
    [addressListSuccess]: (state, action) => action.payload.addresses,
    [addressListFailure]: state => state
  },
  null
);

const addressesForRoute = handleActions(
  {
    [routeRequest]: (state, action) => action.payload.addresses,
    [routeSuccess]: state => state,
    [routeFailure]: state => null,
    [newOrderSuccess]: state => null
  },
  null
);

const route = handleActions(
  {
    [routeRequest]: state => null,
    [routeSuccess]: (state, action) => action.payload,
    [routeFailure]: state => null,
    [newOrderSuccess]: state => null
  },
  null
);

const order = handleActions(
  {
    [routeRequest]: state => false,
    [routeSuccess]: state => true,
    [routeFailure]: state => false,
    [newOrderSuccess]: state => false
  },
  false
);

export const getMap = createSelector(
  state => state.mapBox.map,
  map => map
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

export default combineReducers({ map, addressList, route, order });
