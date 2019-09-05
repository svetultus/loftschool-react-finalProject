import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MapForm } from "./MapForm";
import { render, fireEvent } from "@testing-library/react";

describe("MapForm", () => {
  describe("Общее поведение", () => {
    it("renders without crashing", () => {
      const wrapper = render(
        <BrowserRouter>
          <MapForm />
        </BrowserRouter>
      );
      expect(wrapper.getByTestId("MapForm-wrapper")).toBeTruthy();
    });

    it("пользователь получает сообщение о необходимости заполнить платежные данные, если они не заполнены", () => {
      const wrapper = render(
        <BrowserRouter>
          <MapForm isPayable={false} order={false} />
        </BrowserRouter>
      );
      expect(wrapper.getByTestId("messageToFillProfile")).toBeTruthy();
    });
  });

  describe("Форма вызова такси", () => {
    it("отображается форма вызова такси, если заполнены платежные данные", () => {
      const wrapper = render(
        <BrowserRouter>
          <MapForm isPayable={true} order={false} />
        </BrowserRouter>
      );
      expect(wrapper.getByTestId("formTaxiRequest")).toBeTruthy();
    });

    it("Кнопка Заказать не активна, если не выбраны поля Пункт отправления и Пункт назначения", () => {
      const wrapper = render(
        <BrowserRouter>
          <MapForm
            isPayable={true}
            order={false}
            addressList={[1, 2, 3, 4]}
            routeRequest={jest.fn()}
          />
        </BrowserRouter>
      );
      expect(wrapper.getByTestId("mapForm-btn-submit-order")).toHaveProperty(
        "disabled",
        true
      );
    });

    it("Кнопка Заказать активна, если выбраны поля Пункт отправления и Пункт назначения и после клика на Вызвать такси вызывается функция routeRequest", () => {
      const routeRequest = jest.fn();
      const wrapper = render(
        <BrowserRouter>
          <MapForm
            isPayable={true}
            order={false}
            addressList={[1, 2, 3, 4]}
            routeRequest={routeRequest}
          />
        </BrowserRouter>
      );
      fireEvent.focus(document.querySelector(".t-mapForm-input-from input"));
      fireEvent.change(document.querySelector(".t-mapForm-input-from input"), {
        target: { value: "Пулково (LED)" }
      });
      fireEvent.blur(document.querySelector(".t-mapForm-input-from input"));

      fireEvent.focus(document.querySelector(".t-mapForm-input-to input"));
      fireEvent.change(document.querySelector(".t-mapForm-input-to input"), {
        target: { value: "Шаверма на Невском" }
      });
      fireEvent.blur(document.querySelector(".t-mapForm-input-to input"));

      // expect(wrapper.getByTestId("mapForm-btn-submit-order")).toHaveProperty(
      //   "disabled",
      //   false
      // );

      wrapper.getByTestId("mapForm-btn-submit-order").click();

      expect(routeRequest).toHaveBeenCalled();
    });
  });

  describe("Форма нового заказа", () => {
    it("отображается сообщение о сделанном заказе и кнопка для возможности нового заказа", () => {
      const wrapper = render(
        <BrowserRouter>
          <MapForm isPayable={true} order={true} />
        </BrowserRouter>
      );
      expect(wrapper.getByTestId("formNewOrder")).toBeTruthy();
    });

    it("При клике на кнопку Новый заказ, выполняется функция newOrderRequest", () => {
      const newOrderRequest = jest.fn();
      const wrapper = render(
        <BrowserRouter>
          <MapForm
            isPayable={true}
            order={true}
            newOrderRequest={newOrderRequest}
          />
        </BrowserRouter>
      );

      wrapper.getByTestId("mapForm-btn-submit-newOrder").click();

      expect(newOrderRequest).toHaveBeenCalled();
    });
  });
});
