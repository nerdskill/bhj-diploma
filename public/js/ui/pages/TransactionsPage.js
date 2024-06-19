
class TransactionsPage {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не может быть пустым');
    }
    this.element = element;
    this.lastOptions = null;
    this.registerEvents();
  }

  update() {
    // Убираем проверку на наличие предоставленных опций
    this.render(this.lastOptions);
  }

  registerEvents() {
    // Добавляем обработчик события на весь родительский блок
    this.element.addEventListener('click', (event) => {
      const target = event.target;
      // Проверяем на каком элементе произошло событие
      if (target.classList.contains('remove-account')) {
        this.removeAccount();
      } else if (target.classList.contains('transaction__remove')) {
        const transactionId = target.dataset.id;
        this.removeTransaction(transactionId);
      }
    });
  }

  removeAccount() {
    if (!this.lastOptions || !this.lastOptions.account_id) {
      return;
    }
    if (!confirm('Вы действительно хотите удалить счёт?')) {
      return;
    }
    Account.remove({ id : this.lastOptions.account_id }, (err) => {
      if (err) {
        console.error('Ошибка при удалении счёта:', err);
        return;
      }
      this.clear();
      App.updateWidgets();
      App.updateForms();
    });
  }

  removeTransaction(id) {
    if (!confirm('Вы действительно хотите удалить эту транзакцию?')) {
      return;
    }
    Transaction.remove({ id: id }, (err) => {
      if (err) {
        console.error('Ошибка при удалении транзакции:', err);
        return;
      }
      
      App.update();
    });
  }

  render(options) {
    if (!options || !options.account_id) {
      return;
    }
    this.lastOptions = options;
    Account.get(options.account_id, (err, account) => {
      if (err) {
        console.error('Ошибка при получении счета:', err);
        return;
      }
      this.renderTitle(account.data.name);
    });
    Transaction.list({ account_id: options.account_id }, (err, transactions) => {
      if (err) {
        console.error('Ошибка при получении транзакций:', err);
        return;
      }
      this.renderTransactions(transactions);
    });
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOptions = null;
  }

  renderTitle(name) {
    const titleElement = this.element.querySelector('.content-title');
    if (titleElement) {
      titleElement.textContent = name;
    }
  }

  formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('ru-RU', options);
    return formattedDate.replace(',', ' г. в ');
  }

  getTransactionHTML(item) {
    const transactionClass = item.type === 'expense' ? 'transaction_expense' : 'transaction_income';
    const formattedDate = this.formatDate(item.created_at);
    const transactionHTML = `
         <div class="transaction ${transactionClass} row">
             <div class="col-md-7 transaction__details">
                 <div class="transaction__icon">
                     <span class="fa fa-money fa-2x"></span>
                 </div>
                 <div class="transaction__info">
                     <h4 class="transaction__title">${item.name}</h4>
                     <div class="transaction__date">${formattedDate}</div>
                 </div>
             </div>
             <div class="col-md-3">
                 <div class="transaction__summ">
                     ${item.sum} <span class="currency">₽</span>
                 </div>
             </div>
             <div class="col-md-2 transaction__controls">
                 <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                     <i class="fa fa-trash"></i>  
                 </button>
             </div>
         </div>
     `;
    return transactionHTML;
  }

  renderTransactions(data) {
    const contentSection = this.element.querySelector('.content');
    
    if (!data || !data.data || data.data.length === 0) {
        contentSection.innerHTML = '<p>Нет транзакций для отображения</p>';
        return;
    }
    
    const transactionsHTML = data.data.map(item => this.getTransactionHTML(item)).join('');
    contentSection.innerHTML = transactionsHTML;
  }
}