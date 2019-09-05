import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Profile } from "./Profile";
import { render, fireEvent } from "@testing-library/react";

describe("Profile", () => {
  describe("Общее поведение", () => {
    const userProfile = {
      name: "userName",
      cardName: "cardName",
      cardNumber: "cardNumber",
      expDate: "expDate",
      cvv: "cvv"
    };

    it("renders without crashing", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile userProfile={userProfile} />
        </BrowserRouter>
      );
      expect(wrapper.getByTestId("profile-wrapper")).toBeTruthy();
    });

    it("пользователь не видит сообщение о том, что  платежные данные были сохранены, если форма не изменялась", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile
            formWasSaved={false}
            isPayable={true}
            userProfile={userProfile}
          />
        </BrowserRouter>
      );
      expect(
        document.getElementsByClassName("t-info-dataWasSaved").length
      ).toEqual(0);
    });

    it("пользователь получает сообщение о том, что  платежные данные были сохранены, после сохранения формы", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile
            formWasSaved={true}
            isPayable={true}
            userProfile={userProfile}
          />
        </BrowserRouter>
      );
      expect(wrapper.getByTestId("info-dataWasSaved").textContent).toEqual(
        "Платежные данные сохранены"
      );
    });

    it("кнопка сохранить не доступна, если не введены данные", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile formWasSaved={false} isPayable={false} userProfile={{}} />
        </BrowserRouter>
      );
      expect(wrapper.getByTestId("profile-btn-submit")).toHaveProperty(
        "disabled",
        true
      );
    });

    it("кнопка сохранить доступна, если введены данные", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile
            formWasSaved={false}
            isPayable={false}
            userProfile={userProfile}
          />
        </BrowserRouter>
      );
      const input = document.querySelector("[data-testid='userName'] input");
      fireEvent.focus(input);
      fireEvent.change(input, {
        target: { value: "Username" }
      });
      fireEvent.blur(input);
      expect(wrapper.getByTestId("profile-btn-submit")).toHaveProperty(
        "disabled",
        true
      );
    });

    it("при потере фокуса поле userName не должно быть пустым, иначе выводится ошибка валидации", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile formWasSaved={false} isPayable={false} userProfile={{}} />
        </BrowserRouter>
      );
      const input = document.querySelector("[data-testid='userName'] input");
      fireEvent.change(input, {
        target: { value: "" }
      });
      fireEvent.blur(input);
      expect(wrapper.getByTestId("profile-btn-submit")).toHaveProperty(
        "disabled",
        true
      );
      expect(
        document.querySelector(
          "[data-testid='userName'] .MuiFormHelperText-root.Mui-error"
        ).textContent
      ).toContain("Обязательное поле");
    });

    it("при потере фокуса поле cardName не должно быть пустым,  иначе выводится ошибка валидации", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile formWasSaved={false} isPayable={false} userProfile={{}} />
        </BrowserRouter>
      );
      const input = document.querySelector("[data-testid='cardName'] input");
      fireEvent.change(input, {
        target: { value: "" }
      });
      fireEvent.blur(input);

      expect(
        document.querySelector(
          "[data-testid='cardName'] .MuiFormHelperText-root.Mui-error"
        ).textContent
      ).toContain("Обязательное поле");
    });

    it("при потере фокуса поле cardName  должно содержать только буквы, иначе выводится ошибка валидации", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile formWasSaved={false} isPayable={false} userProfile={{}} />
        </BrowserRouter>
      );
      const input = document.querySelector("[data-testid='cardName'] input");
      fireEvent.change(input, {
        target: { value: "1" }
      });
      fireEvent.blur(input);

      expect(
        document.querySelector(
          "[data-testid='cardName'] .MuiFormHelperText-root.Mui-error"
        ).textContent
      ).toContain("Можно использовать только буквы");
    });

    it("при потере фокуса поле cardNumber не должно быть пустым,  иначе выводится ошибка валидации", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile formWasSaved={false} isPayable={false} userProfile={{}} />
        </BrowserRouter>
      );
      const input = document.querySelector("[data-testid='cardNumber'] input");
      fireEvent.change(input, {
        target: { value: "" }
      });
      fireEvent.blur(input);

      expect(
        document.querySelector(
          "[data-testid='cardNumber'] .MuiFormHelperText-root.Mui-error"
        ).textContent
      ).toContain("Обязательное поле");
    });

    it("при потере фокуса поле cardNumber  должно содержать только цифры, иначе выводится ошибка валидации", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile formWasSaved={false} isPayable={false} userProfile={{}} />
        </BrowserRouter>
      );
      const input = document.querySelector("[data-testid='cardNumber'] input");
      fireEvent.change(input, {
        target: { value: "s" }
      });
      fireEvent.blur(input);

      expect(
        document.querySelector(
          "[data-testid='cardNumber'] .MuiFormHelperText-root.Mui-error"
        ).textContent
      ).toContain("Должно быть числом");
    });

    it("при потере фокуса поле cardNumber  должно иметь длину 16 символов, иначе выводится ошибка валидации", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile formWasSaved={false} isPayable={false} userProfile={{}} />
        </BrowserRouter>
      );
      const input = document.querySelector("[data-testid='cardNumber'] input");
      fireEvent.change(input, {
        target: { value: "s" }
      });
      fireEvent.blur(input);

      expect(
        document.querySelector(
          "[data-testid='cardNumber'] .MuiFormHelperText-root.Mui-error"
        ).textContent
      ).toContain("Количество знаков должно быть");
    });
  });
});
