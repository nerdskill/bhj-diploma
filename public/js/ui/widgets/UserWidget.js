/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

 class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    if (!element) {
      throw new Error('Элемент не может быть пустым');
    }
    this.element = element;
  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
  update(){
    // const currentUser = User.current();
    // const nameUser = this.element.querySelector('.user-name');
    // nameUser.textContent = currentUser.name;
    const currentUser = User.current();
    if (currentUser) {
        const nameUser = this.element.querySelector('.user-name');
        nameUser.textContent = currentUser.name;
    } else {
        console.error('Данные о текущем пользователе не были получены');
  }
} 
}
