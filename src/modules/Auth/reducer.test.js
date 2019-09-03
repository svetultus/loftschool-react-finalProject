import reducer from "./reducer";
import {
  authRequest,
  authSuccess,
  authFailure,
  logoutRequest
} from "./actions";

const randomAction = {
  type: `RANDOM_ACTION_${parseInt(Math.random() * 1000, 10)}`
};

describe("Reducer Auth", () => {
  describe("Reducer AuthRequest", () => {
    const state0 = reducer(undefined, randomAction);
    const state1 = reducer(
      state0,
      authRequest({ userName: "test", userPassword: "" })
    );

    it("authRequest устанавливает isAuthorized в false", () => {
      expect(state1.isAuthorized).toEqual(false);
    });
    const state2 = reducer(state1, authFailure("test"));
    const state3 = reducer(state2, authRequest());
    it("authRequest сбрасывает предыдущую ошибку", () => {
      expect(state3.error).toEqual(null);
    });
  });

  describe("Reducer authSuccess", () => {
    const state0 = reducer(undefined, randomAction);
    const state1 = reducer(state0, authSuccess());

    it("authSuccess устанавливает isAuthorized в true", () => {
      expect(state1.isAuthorized).toEqual(true);
    });

    const state2 = reducer(state1, authRequest());

    it("устанавливает isAuthorized в false при повторном запросе authRequest", () => {
      expect(state2.isAuthorized).toEqual(false);
    });

    const state3 = reducer(state1, authFailure("test"));
    const state4 = reducer(state3, authSuccess());
    it("authSuccess сбрасывает предыдущую ошибку", () => {
      expect(state4.error).toEqual(null);
    });
  });

  describe("Reducer authFailure", () => {
    const state0 = reducer(undefined, randomAction);
    const state1 = reducer(state0, authSuccess());
    const state2 = reducer(state1, authFailure("test"));

    it("устанавливает isAuthorized в false ", () => {
      expect(state2.isAuthorized).toEqual(false);
    });
    it("authRequest устанавливает ошибку", () => {
      expect(state2.error).toEqual("test");
    });
  });

  describe("Reducer logoutRequest", () => {
    const state0 = reducer(undefined, randomAction);
    const state1 = reducer(state0, authSuccess());
    const state2 = reducer(state1, logoutRequest());

    it("устанавливает isAuthorized в false ", () => {
      expect(state2.isAuthorized).toEqual(false);
    });
  });
});
