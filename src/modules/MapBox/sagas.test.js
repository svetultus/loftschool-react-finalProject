import {
  take,
  takeEvery,
  takeLatest,
  put,
  call,
  select
} from "redux-saga/effects";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { expectSaga } from "redux-saga-test-plan";

import {
  fetchMapFlow,
  fetchAddressListFlow,
  fetchRouteFlow,
  fetchRouteSuccessFlow
} from "./sagas";
import { apiKey } from "./apiKey.js";
import {
  mapRequest,
  mapSuccess,
  mapFailure,
  addressListRequest,
  addressListSuccess,
  addressListFailure,
  routeRequest,
  routeSuccess,
  routeFailure
} from "./actions";
// import {
//   mapInit,
//   fetchAddressList,
//   fetchRoute,
//   drawRoute,
//   flyTo
// } from "./api.js";
// import { userRequest, getUserData } from "../MapBox";

describe("fetchMapFlow", () => {
  it("just works!", () => {
    const api = {
      fetchUser: id => ({ id, name: "Tucker" })
    };
    const fetchMapFlow = true;

    return (
      expectSaga(fetchMapFlow, api)
        // Assert that the `put` will eventually happen.
        .put({
          type: "RECEIVE_USER",
          payload: { id: 42, name: "Tucker" }
        })

        // Dispatch any actions that the saga will `take`.
        .dispatch({ type: "REQUEST_USER", payload: 42 })

        // Start the test. Returns a Promise.
        .run()
    );
  }).then(result => expect(result.storeState.clickCount).toBe(14));
});
