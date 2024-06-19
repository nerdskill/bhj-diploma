/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => { 
      if (response.success && response.user) { 
        App.setState('user-logged'); 
        const modal = App.getModal('register'); 
        modal.close(); 
        this.element.reset(); 
      } else {
        console.error('Ошибка регистрации:', err); 
      }
    });
  }
}