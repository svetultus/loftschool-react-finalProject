import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { render, fireEvent, getBy } from "@testing-library/react";

describe("Login", () => {
  it("renders without crashing", () => {
    const wrapper = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(wrapper.getByTestId("form-login")).toBeTruthy();
  });

  it("если пользователь авторизован, то срабатывает переадресация на страницу Карты /map", () => {
    const wrapper = render(
      <BrowserRouter>
        <Login isAuthorized={true} />
      </BrowserRouter>
    );
    expect(location.pathname).toBe("/map");
  });

  it("Если пользователь не авторизован, есть форма ввода логина", () => {
    const wrapper = render(
      <BrowserRouter>
        <Login isAuthorized={false} />
      </BrowserRouter>
    );
    expect(wrapper.getByTestId("form-login")).toBeTruthy();
  });

  it("если пользователь пытается авторизоваться с пустыми данными, кнопка отправки формы отключена", () => {
    const wrapper = render(
      <BrowserRouter>
        <Login isAuthorized={false} />
      </BrowserRouter>
    );

    expect(wrapper.getByTestId("login-btn-submit")).toHaveProperty(
      "disabled",
      true
    );
  });

  it("если пользователь пытается авторизоваться с неверными данными, остается на странице входа", () => {
    expect(location.pathname).toBe("/login");
    const wrapper = render(
      <BrowserRouter>
        <Login isAuthorized={false} />
      </BrowserRouter>
    );
    fireEvent.change(document.querySelector(".t-input-userName input"), {
      target: { value: "testUser" }
    });
    fireEvent.change(document.querySelector(".t-input-userPassword input"), {
      target: { value: "testPassword" }
    });

    wrapper.getByTestId("login-btn-submit").click();
    expect(location.pathname).toBe("/login");
  });

  it("если пользователь пытался авторизоваться с неверными данными, получает сообщение об ошибке", () => {
    const wrapper = render(
      <BrowserRouter>
        <Login isAuthorized={false} authError={true} />
      </BrowserRouter>
    );
    expect(wrapper.getByTestId("form-login-error")).toBeTruthy;
    expect(wrapper.getByTestId("form-login-error").textContent).toEqual(
      "Неверная пара логин/пароль"
    );
  });
});
