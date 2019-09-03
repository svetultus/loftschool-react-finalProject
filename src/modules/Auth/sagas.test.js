import { cloneableGenerator } from "@redux-saga/testing-utils";
import { fetchAuthFlow } from "./sagas";
import { authUser } from "./api.js";
import { take, takeLatest, put, call } from "redux-saga/effects";
import {
  authRequest,
  authSuccess,
  authFailure,
  logoutRequest
} from "./actions";

describe("fetchAuthFlow", () => {
  const iterator = cloneableGenerator(fetchAuthFlow)(
    authRequest({
      userName: "test@test.com",
      userPassword: "123123"
    })
  );
  //   const iterator = fetchAuthFlow(
  //     authRequest({
  //       userName: "test@test.com",
  //       userPassword: "123123"
  //     })
  //   );

  it('Первый yield — call(authUser, "userName", "userPassword")', () => {
    expect(
      iterator.next({
        userName: "test@test.com",
        userPassword: "123123"
      }).value
    ).toEqual(call(authUser, "test@test.com", "123123"));
  });

  it('Второй yield — put(authSuccess("userName")), если авторизация прошла успешно', () => {
    const clone = iterator.clone();
    expect(clone.next({ success: true }).value).toEqual(
      put(authSuccess("test@test.com"))
    );
  });

  it('Второй yield — put(authSuccess("userName")), если авторизация прошла неуспешно', () => {
    const clone = iterator.clone();
    expect(clone.next({ success: false }).value).toEqual(
      put(authFailure("Ошибка авторизации"))
    );
  });
});
