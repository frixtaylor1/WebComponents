class WCModalView extends HTMLElement {

  #innerContent = undefined;

  #onouterclick(event) {
    if (event.target == this) {
      this.close();
    }
  }

  constructor() {
    super();

    this.classList.add('w3-modal');
    this.style = 'display:block';
    this.contentChild = createElement('div', { class: 'w3-modal-content w3-card-4 w3-animate-top' });
    this.appendChild(this.contentChild);
  }

  connectedCallback() {
    this.addEventListener('click', this.#onouterclick.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onouterclick);
  }

  set content(innerContentElement) {
    if (innerContentElement instanceof HTMLElement) {
      this.#innerContent = innerContentElement;
      this.contentChild.innerHTML = '';
      this.contentChild.appendChild(innerContentElement);
    }
  }

  get content() {
    return this.#innerContent;
  }

  open() {
    if (!document.body.contains(this)) {
      document.body.appendChild(this);
    }
  }

  close() {
    if (document.body.contains(this)) {
      document.body.removeChild(this);
    }
  }

}
customElements.define('x-modal-view', WCModalView);