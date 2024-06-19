const createRequest = options => {
  const xhr = new XMLHttpRequest();
  const url = options.method === 'GET' ? `${options.url}?${new URLSearchParams(options.data).toString()}` : options.url;

  // Устанавливаем метод запроса
  xhr.open(options.method, url);

  // Устанавливаем тип ответа
  xhr.responseType = 'json';

  // Создаем объект FormData для передачи данных в случае POST запроса
  const formData = new FormData();

  // Перебираем данные из параметра options.data и добавляем их в FormData
  if (options.data) {
    for (const key in options.data) {
      formData.append(key, options.data[key]);
    }
  }

 // Обработчик события завершения запроса
  xhr.onload = () => {
  // Запрос успешен
    options.callback(null, xhr.response);
};

  // Обработчик события ошибки запроса
  xhr.onerror = () => {
    options.callback(new Error('Ошибка сети: не удалось выполнить запрос'), null);
  };

  try {
    // Отправка запроса
    xhr.send(options.method === 'GET' ? null : formData);
    
  } catch (e) {
    // перехват сетевой ошибки
    options.callback(e, null);
  }
};

