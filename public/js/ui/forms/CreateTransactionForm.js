class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    const selectElement = this.element.querySelector('.accounts-select');

    // Добавление проверки на авторизованного пользователя
    if (!User.current()) {
      console.error('Пользователь не авторизован');
      return;
    }

    Account.list({}, (err, response) => {
      if (err) {
        console.error('Ошибка при загрузке счетов:', err);
        return;
      }

      const accounts = response.data;

      // Накопление разметки с помощью reduce
      const optionsHTML = accounts.reduce((html, account) => {
        html += `<option value="${account.id}">${account.name}</option>`;
        return html;
      }, '');

      // Присвоение разметки одним действием
      selectElement.innerHTML = optionsHTML;
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (err) {
        console.error('Ошибка создания транзакции:', err);
        return;
      }

      this.element.reset();
      const modalId = this.element.closest('.modal').dataset.modalId;
      const modal = App.getModal(modalId);
      modal.close();
      App.update();
    });
  }
}
