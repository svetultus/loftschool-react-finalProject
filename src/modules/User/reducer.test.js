import reducer from "./reducer";
import {
  userRequest,
  userSuccess,
  userFailure,
  checkUserIsPayable
} from "./actions";
import { authSuccess } from "../Auth";

const randomAction = {
  type: `RANDOM_ACTION_${parseInt(Math.random() * 1000, 10)}`
};

describe("Reducer User", () => {
  const state0 = reducer(undefined, randomAction);
  const state1 = reducer(state0, userRequest());

  it("Экшен userRequest устанавливает userIsPayable в false", () => {
    expect(state1.userIsPayable).toBeFalsy;
  });

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
  const state2 = reducer(state0, userSuccess(userProfile));
  it("Экшен userSuccess устанавливает userProfile равным action.payload", () => {
    expect(state2.userProfile).toEqual(userProfile.user);
  });

  const storage = localStorage;
  const userFormStorage = storage.getItem("loftTaxiUser");
  it("Экшен userSuccess записывает данные User в LocalStorage", () => {
    expect(JSON.parse(userFormStorage)).toEqual(userProfile.user);
  });

  const state3 = reducer(state0, authSuccess("test@test.com"));
  it("Экшен authSuccess устанавливаетuserProfile.name равным action.payload", () => {
    expect(state3.userProfile.name).toEqual("test@test.com");
  });

  const state4 = reducer(state0, userFailure("Ошибка"));
  it("Экшен authSuccess устанавливает userIsPayable в false", () => {
    expect(state4.userIsPayable).toBeFalsy;
  });
});
