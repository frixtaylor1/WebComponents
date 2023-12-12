/**
 * @file WCLoginForm.js
 * @license GPL-3.0
 * 
 * Copyright (c) 2023 Kevin Taylor,
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * Year: 2023
 */

import { createElement }  from "../Utility/WCUtils.js";
import { createEvent }    from "../Utility/WCUtils.js";

class WCLoginFormView extends HTMLElement {
//public:
  constructor() {
    super();

    this.#titleView       = createElement('h3',     { textContent: 'LoginFormView' });
    this.#usernameInput   = createElement('input',  { type: 'text',     placeholder: 'username' });
    this.#passwordInput   = createElement('input',  { type: 'password', placeholder: 'password' });
    this.#loginButton     = createElement('button', { textContent: 'login' });
    this.#registerButton  = createElement('button', { textContent: 'register' });

    this.appendChild(this.#titleView);
    this.appendChild(this.#usernameInput);
    this.appendChild(this.#passwordInput);
    this.appendChild(this.#loginButton);
    this.appendChild(this.#registerButton);
  }

  connectedCallback() {
    //Forward public ui events ( eventtype is analogue to "method name" and details are the parameters of the request)
    this.#loginButton.onclick     = (event) => this.dispatchEvent(createEvent('wce-login', this.#readLoginParameters()));
    this.#registerButton.onclick  = (event) => this.dispatchEvent(createEvent('screenschange', 'register'));
  }

  disconnectedCallback() {
    this.#loginButton.onclick     = null;
    this.#registerButton.onclick  = null;
  }

  reset() {
    this.#usernameInput.value = '';
    this.#passwordInput.value = '';
  }

  //Design ( read() -> FormData)
  #readLoginParameters() {
    let fd = new FormData();

    fd.append("username", this.#usernameInput.value);
    fd.append("password", this.#passwordInput.value);

    return fd;
  }

  dispatchedEvents() {
    return ['wce-login'];
  }

//private:
  #titleView      = undefined;
  #usernameInput  = undefined;
  #passwordInput  = undefined;
  #loginButton    = undefined;
  #registerButton = undefined;
}

customElements.define('x-loginformview', WCLoginFormView);

export { WCLoginFormView };