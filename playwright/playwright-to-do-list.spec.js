// @ts-check
import { test, expect } from '@playwright/test';

const pagina = "C:/Users/Aluno_Tarde/Desktop/to-do-list/index.html"

test('Adicionar uma nova tarefa', async ({ page }) => {
  await page.goto(pagina);

  await page.getByRole('button', { name: 'Nova Tarefa' }).click();
  await page.locator('#tarefasTitle').fill('Titulo da tarefa 1');
  await page.locator('#tarefasDesc').fill('Descricao da tarefa 1');
  await page.getByRole('button', { name: 'Salvar' }).click();


  await expect(page.getByText('Titulo da tarefa 1')).toBeVisible();
  await expect(page.getByText('Descricao da tarefa 1')).toBeVisible();


});

test("Tentar adicionar uma tarefa com campo vazio", async ({ page }) => {
  await page.goto(pagina);
  await page.getByRole('button', { name: 'Nova Tarefa' }).click();
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('título é obrigatório')).toBeVisible();


})



test("Marcar uma tarefa como concluída", async ({ page }) => {
  await page.goto(pagina);


  await page.getByRole('button', { name: 'Nova Tarefa' }).click();
  await page.locator('#tarefasTitle').fill('Titulo da tarefa 2');
  await page.locator('#tarefasDesc').fill('Descricao da tarefa 2');
  await page.getByRole('button', { name: 'Salvar' }).click();


  await expect(page.getByText('Titulo da tarefa 2')).toBeVisible();
  await expect(page.getByText('Descricao da tarefa 2')).toBeVisible();

  const card = page.locator('.task-card', { hasText: 'Titulo da tarefa 2' });
  await card.locator('input[type="checkbox"]').check();
  await expect(card.locator('input[type="checkbox"]')).toBeChecked();



})


test("Remover uma tarefa da lista", async ({ page }) => {
  await page.goto(pagina);


  await page.getByRole('button', { name: 'Nova Tarefa' }).click();
  await page.locator('#tarefasTitle').fill('Titulo da tarefa 3');
  await page.locator('#tarefasDesc').fill('Descricao da tarefa 3');
  await page.getByRole('button', { name: 'Salvar' }).click();

  await expect(page.getByText('Titulo da tarefa 3')).toBeVisible();
  await expect(page.getByText('Descricao da tarefa 3')).toBeVisible();


  const card = page.locator('.task-card', { hasText: 'Titulo da tarefa 3' });
  await card.locator('.remove-btn').click();


  await expect(page.getByText('Titulo da tarefa 3')).toBeHidden();
  await expect(page.getByText('Descricao da tarefa 3')).toBeHidden();

})


test("Adicionar duas tarefas e concluir 1, aplicar o filtro concluídas", async ({ page }) => {
  await page.goto(pagina);

  await page.getByRole('button', { name: 'Nova Tarefa' }).click();
  await page.locator('#tarefasTitle').fill('Titulo da tarefa 4');
  await page.locator('#tarefasDesc').fill('Descricao da tarefa 4');
  await page.getByRole('button', { name: 'Salvar' }).click();

  await expect(page.getByText('Titulo da tarefa 4')).toBeVisible();
  await expect(page.getByText('Descricao da tarefa 4')).toBeVisible();


  await page.getByRole('button', { name: 'Nova Tarefa' }).click();
  await page.locator('#tarefasTitle').fill('Titulo da tarefa 5');
  await page.locator('#tarefasDesc').fill('Descricao da tarefa 5');
  await page.getByRole('button', { name: 'Salvar' }).click();

  await expect(page.getByText('Titulo da tarefa 5')).toBeVisible();
  await expect(page.getByText('Descricao da tarefa 5')).toBeVisible();


  const card = page.locator('.task-card', { hasText: 'Titulo da tarefa 4' });
  await card.locator('input[type="checkbox"]').check();
  await expect(card.locator('input[type="checkbox"]')).toBeChecked();

  await page.selectOption('select#filterSelect', { label: 'Concluídas' });


  await expect(page.getByText('Titulo da tarefa 4')).toBeVisible();
  await expect(page.getByText('Descricao da tarefa 4')).toBeVisible();
  await expect(page.getByText('Titulo da tarefa 5')).toBeHidden();
  await expect(page.getByText('Descricao da tarefa 5')).toBeHidden();

})

test("Acessar a página pela primeira vez", async ({ page }) => {
  await page.goto(pagina)
  const itens = page.locator('#task-card');
  await expect(itens).toHaveCount(0);


})
