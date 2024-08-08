"use strict";
const apiKey = 'cb7c83c50734e4a274deb707b19eb1a0';
const apiToken = 'ATTAa99b46e6cea8027ecc5b9fccda1ee1383bad406da849a9f0de9a1f1f3cd87b191556138F';

describe('Trello API Tests', () => {
      it('Отримати список дошок за допомогою GET запиту', () => {
        cy.request({
        method: 'GET',
        url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`,
        }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        const boards = response.body;
        cy.log(`Загальна кількість дошок: ${boards.length}`);
       });
      });

 
      it('Створити дошку за допомогою POST запиту', () => {
        const boardData = {
        name: 'TEST_BOARD',
        defaultLabels: false,
        defaultLists: false,
        prefs_permissionLevel: 'private',
        };
      cy.request({
      method: 'POST',
      url: `https://api.trello.com/1/boards?key=${apiKey}&token=${apiToken}`,
      body: boardData,
      }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      const newBoardId = response.body.id;
      cy.log(`ID нової дошки: ${newBoardId}`);
    });
    });

    it('PUT: Оновлення деталей дошки', () => {
    const boardId = 'Afcp1q90';
    const updatedData = {
    name: 'Оновлена назва дошки',
    };
    cy.request({
      method: 'PUT',
      url: `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`,
      body: updatedData,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', updatedData.name);
    });
    });

    it('GET: Кастомні заголовки', () => {
    cy.request({
      method: 'GET',
      url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`,
      headers: {
        'X-Custom-Header': 'Custom Value',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    });

    it('GET: Query параметри', () => {
    const randomParam = Math.floor(Math.random() * 100);
    cy.request({
      method: 'GET',
      url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}&param=${randomParam}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
    });

    it('GET: Перевірка вмісту відповіді', () => {
    cy.request({
      method: 'GET',
      url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
    });

    it('GET: Перевірка тривалості виконання', () => {
    cy.request({
      method: 'GET',
      url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(5000);
    });
    });

    it('GET: Стандартні заголовки (User-Agent)', () => {
    cy.request({
    method: 'GET',
    url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`,
    headers: {
      'User-Agent': 'Cypress User Agent',
    },
    }).then((response) => {
    expect(response.status).to.eq(200);
    });
    });
 
    it('GET: Деталі дошки', () => {
    const boardId = 'Afcp1q90';
    cy.request({
    method: 'GET',
    url: `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`,
    }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('name');
    });
    });

    it('GET: Список карток у дошці', () => {
    const boardId = 'Afcp1q90';
    cy.request({
    method: 'GET',
    url: `https://api.trello.com/1/boards/${boardId}/cards?key=${apiKey}&token=${apiToken}`,
    }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');
    });
    });

});