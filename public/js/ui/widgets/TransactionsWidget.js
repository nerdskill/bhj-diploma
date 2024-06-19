/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

 class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не может быть пустым');
    }
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const createIncomeButton = this.element.querySelector('.create-income-button');
    const createExpenseButton = this.element.querySelector('.create-expense-button');

    createIncomeButton.addEventListener('click', () => {
      const modal = App.getModal('newIncome');
      modal.open();
    });

    createExpenseButton.addEventListener('click', () => {
      const modal = App.getModal('newExpense');
      modal.open();
    });
  }
}