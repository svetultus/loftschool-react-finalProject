describe("Выпускной проект", () => {
  before(() => {
    cy.visit("/");
  });

  describe("Логика", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("При входе показывается форма логина", () => {
      cy.get("input").type("Rick");
      cy.get("button")
        .contains("Войти")
        .click();
    });
  });
});
