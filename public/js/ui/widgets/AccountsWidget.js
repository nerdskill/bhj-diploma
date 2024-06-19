// /**
//  * Класс AccountsWidget управляет блоком
//  * отображения счетов в боковой колонке
//  * */



class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не может быть пустым');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    const createAccount = document.querySelector('.create-account');
    createAccount.addEventListener('click', () => {
      const modal = App.getModal('createAccount'); 
      modal.open();
    });

    // Обработчик выбора счета
    this.element.addEventListener('click', (event) => {
      const accountItem = event.target.closest('.account');
      if (!accountItem) return;
      this.onSelectAccount(accountItem);
    });
  }

  update() {
    const currentUser = User.current();

    if (!currentUser) {
        console.log('Пользователь не авторизован');
        return;
    }

    Account.list({}, (err, response) => {
        if (err) {
            console.error('Ошибка при загрузке счетов:', err);
            return;
        }

        const accounts = response.data; // Массив счетов

        this.clear(); // Очистка предыдущего списка счетов

        // Для каждого счета в массиве вызываем метод renderItem()
        accounts.forEach(account => {
            this.renderItem(account);
        });
    });
}

  clear() {
    const accountList = document.querySelectorAll('.account');
  accountList.forEach(account => {
    account.remove();
  });
  }

  onSelectAccount(element) {
    const accountId = element.dataset.id;
    const prevActiveAccount = this.element.querySelector('.account.active');
    if (prevActiveAccount) {
      prevActiveAccount.classList.remove('active');
    }
    element.classList.add('active');
    App.showPage('transactions', { account_id: accountId });
  }

  getAccountHTML(item) {
    return `
      <li class="account" data-id="${item.id}">
          <a href="#">
              <span>${item.name}</span> /
              <span>${item.sum.toFixed(2)} ₽</span>
          </a>
      </li>
    `;
  }

  renderItem(data) {
    const accountListHTML = this.getAccountHTML(data);
    const accountPanel = document.querySelector('.accounts-panel');
    accountPanel.insertAdjacentHTML('beforeend', accountListHTML);
}
}