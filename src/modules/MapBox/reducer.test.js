import reducer from "./reducer";
import {
  addressListRequest,
  addressListSuccess,
  addressListFailure,
  routeRequest,
  routeSuccess,
  routeFailure,
  newOrderRequest
} from "./actions";

import {
  take,
  takeEvery,
  takeLatest,
  put,
  call,
  select
} from "redux-saga/effects";
// import { fetchAddressList, fetchRoute, drawRoute, flyTo } from "./api.js";

const randomAction = {
  type: `RANDOM_ACTION_${parseInt(Math.random() * 1000, 10)}`
};

describe("Reducer MapBox", () => {
  describe("Reducer addressListRequest", () => {
    const state0 = reducer(undefined, randomAction);
    const state1 = reducer(
      state0,
      addressListSuccess({ addresses: ["1", "2", "3"] })
    );
    it("Добавляет массив адресов", () => {
      expect(state1.addressList).toEqual(["1", "2", "3"]);
    });
  });

  describe("Reducer routeRequest", () => {
    const state0 = reducer(undefined, randomAction);
    debugger;
    const state1 = reducer(
      state0,
      routeRequest({ address1: "from", address2: "to" })
    );
    debugger;
    it("Устанавливает route (маршрут) в null", () => {
      expect(state1.route).toEqual(null);
    });
    it("Устанавливает order (заказ) в false", () => {
      expect(state1.order).toBeFalsy();
    });
  });

  describe("Reducer routeSuccess", () => {
    const state0 = reducer(undefined, randomAction);
    const state1 = reducer(
      state0,
      routeSuccess([[30.348308, 59.932573], [30.360506, 59.931051]])
    );
    it("Устанавливает route (маршрут) из action.payload", () => {
      expect(state1.route).toEqual([
        [30.348308, 59.932573],
        [30.360506, 59.931051]
      ]);
    });
    it("Устанавливает order (заказ) в true", () => {
      expect(state1.order).toBeTruthy();
    });
  });

  describe("Reducer routeFailure", () => {
    const state0 = reducer(undefined, randomAction);
    const state1 = reducer(state0, routeFailure("Ошибка"));
    it("Устанавливает route (маршрут) в null", () => {
      expect(state1.route).toEqual(null);
    });
    it("Устанавливает order (заказ) в false", () => {
      expect(state1.order).toBeFalsy();
    });
  });

  describe("Reducer newOrderRequest", () => {
    const state0 = reducer(undefined, randomAction);
    const state1 = reducer(state0, newOrderRequest());
    it("Устанавливает route (маршрут) в null", () => {
      expect(state1.route).toEqual(null);
    });
    it("Устанавливает order (заказ) в false", () => {
      expect(state1.order).toBeFalsy();
    });
  });
});
