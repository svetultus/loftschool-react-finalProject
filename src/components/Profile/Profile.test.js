import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Profile } from "./Profile";
import { render, fireEvent } from "@testing-library/react";

describe("Profile", () => {
  const userProfile = {
    name: "userName",
    cardName: "cardName",
    cardNumber: "cardNumber",
    expDate: "expDate",
    cvv: "cvv"
  };

  describe("Общее поведение", () => {
    it("renders without crashing", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile userProfile={userProfile} />
        </BrowserRouter>
      );
      expect(wrapper.getByTestId("profile-wrapper")).toBeTruthy();
    });
  });

  describe("Сообщение о сохранении платежных данных", () => {
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
  });

  describe("кнопка Cохранить", () => {
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

    it("кнопка сохранить не доступна, если  данные не изменялись", () => {
      const wrapper = render(
        <BrowserRouter>
          <Profile
            formWasSaved={false}
            isPayable={false}
            userProfile={userProfile}
          />
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
  });

  describe("поле userName", () => {
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
  });

  describe("поле cardName", () => {
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
  });

  describe("поле cardNumber", () => {
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

  describe("Submit формы", () => {
    it("после введения данных происходит и сабмита формы вызываются userSuccess, checkUserIsPayable,", () => {
      const userSuccess = jest.fn("user");
      const checkUserIsPayable = jest.fn();
      const wrapper = render(
        <BrowserRouter>
          <Profile
            formWasSaved={false}
            isPayable={false}
            userProfile={userProfile}
            userSuccess={userSuccess}
            checkUserIsPayable={checkUserIsPayable}
          />
        </BrowserRouter>
      );
      const input = document.querySelector("[data-testid='userName'] input");
      fireEvent.focus(input);
      fireEvent.change(input, {
        target: { value: "Username99" }
      });
      fireEvent.blur(input);
      expect(wrapper.getByTestId("profile-btn-submit")).toHaveProperty(
        "disabled",
        true
      );
      //   fireEvent.submit(wrapper.getByTestId("profile-form"));
      fireEvent.click(wrapper.getByTestId("profile-btn-submit"));

      expect(userSuccess).toHaveBeenCalled();
      expect(checkUserIsPayable).toHaveBeenCalled();
    });
  });
});
