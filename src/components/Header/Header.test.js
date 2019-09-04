import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./Header";
import { render } from "@testing-library/react";

describe("Header", () => {
  it("renders without crashing", () => {
    const wrapper = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(wrapper.getByTestId("header-wrapper")).toBeTruthy();
  });

  it("если пользователь авторизован, есть пункт меню Выйти", () => {
    const wrapper = render(
      <BrowserRouter>
        <Header isAuthorized={true} />
      </BrowserRouter>
    );
    expect(wrapper.getByTestId("logout-btn")).toBeTruthy();
  });

  it("Если пользователь не авторизован, есть пункт меню Войти", () => {
    const wrapper = render(
      <BrowserRouter>
        <Header isAuthorized={false} />
      </BrowserRouter>
    );
    expect(wrapper.getByTestId("login-btn")).toBeTruthy();
  });

  it("при нажатии на кнопку Выйти пользователь становится не авторизованным", () => {
    const logoutRequest = jest.fn();
    const wrapper = render(
      <BrowserRouter>
        <Header isAuthorized={true} logoutRequest={logoutRequest} />
      </BrowserRouter>
    );

    wrapper.getByTestId("logout-btn").click();
    expect(logoutRequest).toHaveBeenCalled();
  });
});
