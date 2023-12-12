import { createElement } from '../Utility/WCUtils.js'

class WCDashboardView extends HTMLElement {
  #header   = undefined;
  #sidebar  = undefined;
  #main     = undefined;
  #footer   = undefined;

  constructor() {
    super();

    this.#header   = createElement('div', { class: 'header',                /* textContent: 'header' */   });
    this.#sidebar  = createElement('div', { class: 'sidebar w3-hide-small', /* textContent: 'sidebar' */  });
    this.#main     = createElement('div', { class: 'body',                  /* textContent: 'body' */     });
    this.#footer   = createElement('div', { class: 'footer',                /* textContent: 'footer' */   });

    this.classList.add('app-container');
  }

  connectedCallback() {
    this.#render();
  }

  disconnectedCallback() {

  }

  #render() {
    this.appendChild(this.#header);
    this.appendChild(this.#sidebar);

    this.appendChild(this.#main);
    this.appendChild(this.#footer);
  }

  set addNodeInHeader(node) {
    this.#header.appendChild(node);
  }

  set removeNodeInHeader(node) {
    this.#header.removeChild(node);
  }

  set addNodeInMain(node) {
    this.#main.appendChild(node);
  }

  set removeNodeInMain(node) {
    this.#main.removeChild(node);
  }

  set addNodeInFooter(node) {
    this.#footer.appendChild(node);
  }

  set removeNodeInFooter(node) {
    this.#footer.removeChild(node);
  }
}
customElements.define('x-dashboard', WCDashboardView);

export { WCDashboardView };