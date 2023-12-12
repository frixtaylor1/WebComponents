class WCQuestionDialog extends HTMLElement {
  constructor(options) {
    super();
    this.classList.add('w3-container');
    this.style.padding = '0px';

    this.header = createElement('header', { class: 'w3-container w3-teal' });
    this.dialogTitle = createElement('h2');
    this.dialogTitle.innerText = options.titleText;

    this.bodyContent = createElement('div', { class: 'w3-container' });
    this.question = createElement('p');
    this.question.innerText = options.questionText;

    this.footer = createElement('footer', { class: 'w3-container w3-teal' });
    this.confirmButton = createElement('button', { class: 'w3-button w3-right' });
    this.confirmButton.innerText = options.confirmText;
    this.cancelButton = createElement('button', { class: 'w3-button w3-right' });
    this.cancelButton.innerText = options.cancelText;


    this.header.appendChild(this.dialogTitle);
    this.bodyContent.appendChild(this.question);
    this.footer.appendChild(this.confirmButton);
    this.footer.appendChild(this.cancelButton);


    this.appendChild(this.header);
    this.appendChild(this.bodyContent);
    this.appendChild(this.footer);
  }

  get response() {
    return new Promise((resolve, reject) => {

      this.confirmButton.onclick = () => {
        resolve('true');
      };

      this.cancelButton.onclick = () => {
        resolve('false');
      };
    });
  }
}
customElements.define('x-question-dialog', WCQuestionDialog);