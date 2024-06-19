
class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error('Переданный элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(this.element);
      this.submit(formData);
    });
  }

getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
  }

  onSubmit(data) {
  }

  submit(formData) {
    const data = this.getData(formData);
    this.onSubmit(data); 
  }
}
