// write tests here
describe("Quotes App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234");
  });

  const textInput = () => cy.get('input[name="text"]');
  const authorInput = () => cy.get('input[name="author"]');
  const cancelBtn = () => cy.get("#cancelBtn");
  const submitBtn = () => cy.get("#submitBtn");
  const boboBtn = () => cy.get("#boboBtn");

  it("sanity checks", () => {
    expect(5).to.equal(5);
    expect(1 + 2).to.equal(3);
    expect({}).to.eql({});
    expect({}).to.not.equal({});
  });

  it("the proper elements exist", () => {
    textInput().should("exist");
    authorInput().should("exist");
    cancelBtn().should("exist");
    submitBtn().should("exist");
    boboBtn().should("not.exist");
  });

  describe("filling out inputs and cancelling", () => {
    it("submit button is disabled", () => {
      submitBtn().should("be.disabled");
    });

    it("can type inside the inputs", () => {
      textInput()
        .should("have.value", "")
        .type("Be nice to your CSS specialist")
        .should("have.value", "Be nice to your CSS specialist");
      authorInput()
        .should("have.value", "")
        .type("Afton Slone")
        .should("have.value", "Afton Slone");
    });

    it("The submit button enables if we type on both inputs", () => {
      textInput().type("test");
      authorInput().type("test");
      submitBtn().should("not.be.disabled");
    });

    it("The cancel button can reset inputs and disable button", () => {
      textInput().type("test");
      authorInput().type("test");
      cancelBtn().click();
      textInput().should("have.value", "");
      authorInput().should("have.value", "");
      submitBtn().should("be.disabled");
    });
  });

  describe("adding a new quote and deleteing it", () => {
    it("can submit and delete", () => {
      cy.contains(/Have Fun/).should("not.exist");
      textInput().type("Have Fun");
      authorInput().type("Afton Slone");
      submitBtn().click();
      cy.contains(/Have Fun/).should("exist");
      cy.contains(/Have Fun/)
        .next()
        .next()
        .click();
      cy.contains(/Have Fun/).should("not.exist");
    });
  });
});
