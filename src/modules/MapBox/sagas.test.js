import {
  take,
  takeEvery,
  takeLatest,
  put,
  call,
  select
} from "redux-saga/effects";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { expectSaga, testSaga } from "redux-saga-test-plan";

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
import { fetchAddressList, fetchRoute } from "./api.js";
import { userRequest, getUserData } from "../User";
import reducer, { getAddressList } from "./reducer";

describe("fetchAddressListFlow", () => {
  const map = true;
  const iterator = cloneableGenerator(fetchMapFlow)(mapRequest(map));

  it("fetchAddressListFlow", () => {
    let response;

    return expectSaga(fetchAddressListFlow, map)
      .withReducer(reducer)
      .provide([
        [call(fetchAddressList), response],
        [put(addressListSuccess(response))]
      ])
      .run()
      .then(result => {
        expect(result.storeState.addressList).toEqual([
          "Пулково (LED)",
          "Шаверма на Невском",
          "Инфекционная больница им. Боткина",
          "Волковское кладбище"
        ]);
      });
  });

  // it("Первый yield — select(getUserData)", () => {
  //   expect(iterator.next().value).toEqual(put(select(getUserData)));
  // });

  // it("Второй yield — put(userRequest(user.name)), если авторизация прошла успешно", () => {
  //   const clone = iterator.clone();
  //   expect(clone.next({ user: { name: "testName" } }).value).toEqual(
  //     put(userRequest(testName))
  //   );
  // });

  // it("Второй yield — put(mapFailure(error.message)), если авторизация прошла неуспешно", () => {
  //   const clone = iterator.clone();
  //   expect(clone.next({}).value).toEqual(put(mapFailure("Ошибка")));
  // });
});
