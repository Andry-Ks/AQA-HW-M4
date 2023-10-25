describe('Trello API Tests', () => {
  //1 тест
      it('Отримати список дошок за допомогою GET запиту', () => {
    //Ключ і токен
    const apiKey = 'cb7c83c50734e4a274deb707b19eb1a0';
    const apiToken = 'ATTAa99b46e6cea8027ecc5b9fccda1ee1383bad406da849a9f0de9a1f1f3cd87b191556138F';
    // Виконуємо GET запит до Trello API
    cy.request({
      method: 'GET',
      url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`,
    }).then((response) => {
      // Перевіряємо статус відповіді
      expect(response.status).to.eq(200);

      // Перевіряємо вміст відповіді
      expect(response.body).to.be.an('array');

      const boards = response.body;
      cy.log(`Загальна кількість дошок: ${boards.length}`);
    });
  });

 //2 тест
 it('Створити дошку за допомогою POST запиту', () => {
   //Ключ і токен
   const apiKey = 'cb7c83c50734e4a274deb707b19eb1a0';
   const apiToken = 'ATTAa99b46e6cea8027ecc5b9fccda1ee1383bad406da849a9f0de9a1f1f3cd87b191556138F';
  // Дані для створення дошки
  const boardData = {
    name: 'TEST_BOARD',
    defaultLabels: false,
    defaultLists: false,
    prefs_permissionLevel: 'private',
  };
  // Виконуємо POST запит для створення нової дошки
  cy.request({
    method: 'POST',
    url: `https://api.trello.com/1/boards?key=${apiKey}&token=${apiToken}`,
    body: boardData,
  }).then((response) => {
    // Перевіряємо статус відповіді
    expect(response.status).to.eq(200);

    // Перевіряємо вміст відповіді
    expect(response.body).to.have.property('id');

    const newBoardId = response.body.id;
    cy.log(`ID нової дошки: ${newBoardId}`);
  });
});

//3 тест
  it('PUT: Оновлення деталей дошки', () => {
    const apiKey = 'cb7c83c50734e4a274deb707b19eb1a0';
    const apiToken = 'ATTAa99b46e6cea8027ecc5b9fccda1ee1383bad406da849a9f0de9a1f1f3cd87b191556138F';
    //ID дошки
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

  //4 тест
  it('GET: Кастомні заголовки', () => {
    const apiKey = 'cb7c83c50734e4a274deb707b19eb1a0';
    const apiToken = 'ATTAa99b46e6cea8027ecc5b9fccda1ee1383bad406da849a9f0de9a1f1f3cd87b191556138F';

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

  //5 тест
  it('GET: Query параметри', () => {
    const apiKey = 'cb7c83c50734e4a274deb707b19eb1a0';
    const apiToken = 'ATTAa99b46e6cea8027ecc5b9fccda1ee1383bad406da849a9f0de9a1f1f3cd87b191556138F';
    const randomParam = Math.floor(Math.random() * 100);
    cy.request({
      method: 'GET',
      url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}&param=${randomParam}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  //6 тест
  it('GET: Перевірка вмісту відповіді', () => {
    const apiKey = 'cb7c83c50734e4a274deb707b19eb1a0';
    const apiToken = 'ATTAa99b46e6cea8027ecc5b9fccda1ee1383bad406da849a9f0de9a1f1f3cd87b191556138F';

    cy.request({
      method: 'GET',
      url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  //7 тест
  it('GET: Перевірка тривалості виконання', () => {
    const apiKey = 'cb7c83c50734e4a274deb707b19eb1a0';
    const apiToken = 'ATTAa99b46e6cea8027ecc5b9fccda1ee1383bad406da849a9f0de9a1f1f3cd87b191556138F';

    cy.request({
      method: 'GET',
      url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(5000); // Перевірка, що запит виконується менше 5 секунд
    });
  });

 //8 тест
 it('GET: Стандартні заголовки (User-Agent)', () => {
  const apiKey = 'cb7c83c50734e4a274deb707b19eb1a0';
  const apiToken = 'ATTAa99b46e6cea8027ecc5b9fccda1ee1383bad406da849a9f0de9a1f1f3cd87b191556138F';
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

 //9 тест
 it('GET: Деталі дошки', () => {
  const apiKey = 'cb7c83c50734e4a274deb707b19eb1a0';
  const apiToken = 'ATTAa99b46e6cea8027ecc5b9fccda1ee1383bad406da849a9f0de9a1f1f3cd87b191556138F';
  //ID дошки
  const boardId = 'Afcp1q90';
  cy.request({
    method: 'GET',
    url: `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('name');
  });
});

 //10 тест
it('GET: Список карток у дошці', () => {
  const apiKey = 'cb7c83c50734e4a274deb707b19eb1a0';
  const apiToken = 'ATTAa99b46e6cea8027ecc5b9fccda1ee1383bad406da849a9f0de9a1f1f3cd87b191556138F';
  //ID дошки
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









