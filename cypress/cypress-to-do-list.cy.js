
describe('template spec', () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it('carregamento inicial', () => {
    cy.get(".top-bar").should("be.visible");
    cy.get("#btnAdd").should("be.visible");
    cy.get("#filterSelect").should("be.visible");
  })

  it('adicionar tarefa', () => {
    cy.get("#tarefasTitle").should("not.be.visible");
    cy.get("#tarefasDesc").should("not.be.visible");
    cy.get("#saveTarefasBtn").should("not.be.visible");

    cy.get('#btnAdd').click();

    cy.get("#tarefasTitle").should("be.visible");
    cy.get("#tarefasDesc").should("be.visible");
    cy.get("#saveTarefasBtn").should("be.visible");

    cy.get('#tarefasTitle').type('Titulo tarefa 1');
    cy.get('#tarefasDesc').type('Descricao tarefa 1');
    cy.get('#saveTarefasBtn').click();

    cy.get("#tarefasTitle").should("not.be.visible");
    cy.get("#tarefasDesc").should("not.be.visible");
    cy.get("#saveTarefasBtn").should("not.be.visible");


  })


  it('adicionar tarefa vazia', () => {
    cy.get("#errorMsg").should("not.be.visible");
    cy.get("#btnAdd").click();
    cy.get("#saveTarefasBtn").click()
    cy.get("#errorMsg").should("be.visible");
    cy.contains("título é obrigatório")
  })


  it('concluir tarefa', () => {
    cy.get('#btnAdd').click();
    cy.get('#tarefasTitle').type('Titulo tarefa 2');
    cy.get('#tarefasDesc').type('Descricao tarefa 2');
    cy.get('#saveTarefasBtn').click();


    cy.contains('.task-title', 'Titulo tarefa 2')
      .parents('.task-card')
      .find('.input-check')
      .check();

  })



  it("remover tarefa", () => {
    cy.get('#btnAdd').click();
    cy.get('#tarefasTitle').type('Titulo tarefa 3');
    cy.get('#tarefasDesc').type('Descricao tarefa 3');
    cy.get('#saveTarefasBtn').click();

    cy.contains('Titulo tarefa 3');

    cy.contains('.task-title', 'Titulo tarefa 3')
      .parents('.task-card')
      .find('.remove-btn')
      .click();


  })

  it('filtrar tarefas', () => {
    cy.get("#btnAdd").click()
    cy.get("#tarefasTitle").type("Titulo tarefa 4");
    cy.get("#tarefasDesc").type("Descricao tarefa 4");
    cy.get("#saveTarefasBtn").click();

    cy.get("#btnAdd").click()
    cy.get("#tarefasTitle").type("Titulo tarefa 5");
    cy.get("#tarefasDesc").type("Descricao tarefa 5");
    cy.get("#saveTarefasBtn").click();

    cy.contains("Titulo tarefa 4");
    cy.contains("Titulo tarefa 5");

    cy.contains('.task-title', "Titulo tarefa 4")
      .parents(".task-card")
      .find('.input-check')
      .check();

      cy.get("#filterSelect").select("Concluídas")

    
      cy.contains("Titulo tarefa 4");
      cy.get(".task-card").should("not.contain", "Titulo tarefa 5");

  })

  it("iniciar pagina", () => {
    cy.visit("index.html");
    cy.get("#tarefasGrid").children().should("have.length", 0);    
  })
})
