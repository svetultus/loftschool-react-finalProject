import { fetchUserFlow } from "./sagas";
import { cloneableGenerator } from "@redux-saga/testing-utils";
import { take, takeLatest, put, call } from "redux-saga/effects";
import {
  userRequest,
  userSuccess,
  userFailure,
  checkUserIsPayable
} from "./actions";
import { getUserData } from "./api.js";

describe("fetchUserFlow", () => {
  const iterator = cloneableGenerator(fetchUserFlow)(
    userRequest("test@test.com")
  );
  const userProfile = {
    success: true,
    user: {
      name: "test@test.com",
      cardName: "sfsdf",
      cardNumber: "1111111111111111",
      expDate: "1111-11-11",
      cvv: "111"
    }
  };

  it("Первый yield — call(getUserData, userName)", () => {
    expect(iterator.next("test@test.com").value).toEqual(
      call(getUserData, "test@test.com")
    );
  });

  it("Второй yield — put(userSuccess(result)), если данные пользователя получены", () => {
    const clone = iterator.clone();
    expect(clone.next(userProfile}).value).toEqual(
      put(userSuccess(userProfile))
    );
  });
  
  it("Третий yield — put(userSuccess(result)), если данные пользователя получены", () => {
    const clone = iterator.clone();
    expect(clone.next(userProfile).value).toEqual(
      put(checkUserIsPayable(userProfile))
    );
  });

  userProfile.success = false;
  it('Второй yield — put(userFailure("Ошибка")), если авторизация не прошла неуспешно', () => {
    const clone = iterator.clone();
    expect(clone.next("Ошибка").value).toEqual(put(userFailure("Ошибка")));
  });
});
