/**
 * @file DataTableView.js
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

import { createElement, createEvent } from "../Utility/WCUtils.js";

class WCDataTableView extends HTMLElement {
//public:
  constructor(columns, pageSize = 10, filter = null) {
    super();

    this.#columns     = columns;
    this.#table       = createElement('table');
    this.#nbRows      = 0;
    this.#pageSize    = pageSize;
    this.#currentPage = 1;
    
    if (filter) {
      this.#filterInput = createElement('input', { class: 'wc-data-table-filter', placeholder: 'Search...' });
    }
    
    this.#nextPageButton  = createElement('button', { class: 'wc-data-table-next-page-button' });
    this.#prevPageButton  = createElement('button', { class: 'wc-data-table-prev-page-button' });
    this.#pageIndicator   = createElement('div',    { class: 'wc-data-table-indicator' });
    this.#container       = createElement('div',    { class: 'wc-data-table-container' });

    this.#prevPageButton.textContent = '<';
    this.#nextPageButton.textContent = '>';

    if (filter) {
      this.appendChild(this.#filterInput);
    }
  }

  set data(data) {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }

  set table(table) {
    this.#table = table;
  }

  get table() {
    return this.#table;
  }

  set pageSize(pageSize) {
    this.#pageSize = pageSize;
  }

  get pageSize() {
    return this.#pageSize;
  }

  set currentPage(newCurrentPage) {
    this.#currentPage = newCurrentPage;
  }

  get currentPage() {
    return this.#currentPage;
  }

  connectedCallback() {
    this.#allowDispatchEvents();
  }

  disconnectedCallback() {
    this.#deniedDispatchEvents();
  }
  
  reload() {
    this.#clearTable();
    this.#initColumns();
    this.processData();
    this.#render();
  }

  getTotalPages() {
    return Math.ceil(this.#data.length / this.#pageSize);
  }

  processData() {
    const headerRow     = createElement('tr', { class: 'wc-data-table-tr' });
    const startIndex    = (this.#currentPage - 1) * this.#pageSize;
    const endIndex      = startIndex + this.#pageSize;
    const dataToDisplay = this.#data.slice(startIndex, endIndex);
  
    this.#columns.forEach(column => {
      if (column !== undefined) {
        const headerCell        = createElement('th', { class: 'wc-data-table-th' });
        headerCell.textContent  = column.Header;
        headerRow.appendChild(headerCell);
        if (column.hasOwnProperty('sorter')) {
          let sorterElement = createElement('span', { class: `wc-data-table-sorter-${column.id}` });
          if (this.#sortOrder === 'asc') {
            sorterElement.textContent = '▲';
          } else {
            sorterElement.textContent = '▼';
          }
          headerCell.appendChild(sorterElement);
          headerCell.addEventListener('click', () => {
            this.dispatchEvent(createEvent('wce-data-table-header-cell-sort', {'column_id': column.id}));
            console.log('Header clicked => ', column.id);
          });
        }
      }
    });
    this.#pushRow(headerRow);

    dataToDisplay.forEach(item => {
      const dataRow = createElement('tr', { class: 'wc-data-table-tr' });
      this.#columns.forEach(column => {
        if (column !== undefined) {
          const accessor        = column.accessor;
          const dataCell        = createElement('td', { class: 'wc-data-table-td' });
          dataCell.textContent  = accessor ? item[accessor] : '';
          dataRow.appendChild(dataCell);
        }
      });
      dataRow.addEventListener('click', () => {
        this.dispatchEvent(createEvent('wce-data-table-row-clicked', item))
      });
      this.#pushRow(dataRow);
    });
  }
  
//private:
  #pushRow(childNode) {
    this.#nbRows++;
    this.#table.appendChild(childNode);
  }

  #initColumns() {
    this.#columns.forEach(group => {
      if (group !== undefined) {
        if (group.columns !== undefined) {
          group.columns.forEach(column => {
            const accessor = column.accessor;
            if (accessor) {
              const accessorParts = accessor.split('.');
              column.accessor = (data) => {
                let value = data;
                for (const part of accessorParts) {
                  value = value[part];
                }
                return value;
              };
            }
          });
        }
      }
    });
  }

  #allowDispatchEvents() {
    if (this.#filterInput !== undefined) {
      this.#filterInput.addEventListener('input', () => {
        this.dispatchEvent(createEvent('wce-data-table-filter', {filterValue: this.#filterInput.value}));
      });
    }

    this.#nextPageButton.addEventListener('click', () => {
      this.dispatchEvent(createEvent('wce-data-table-next-page'));
    });

    this.#prevPageButton.addEventListener('click', () => {
      this.dispatchEvent(createEvent('wce-data-table-prev-page'));
    })

    this.addEventListener('wce-data-table-header-cell-sort', (event) => {
      console.log(event.detail.column_id);
      this.getElementsByClassName(`wc-data-table-sorter-${event.detail.column_id}`)[0].textContent 
        = this.getElementsByClassName(`wc-data-table-sorter-${event.detail.column_id}`)[0].textContent === '▼' ? '▲' : '▼';
    })
  }

  #deniedDispatchEvents() {
    if (this.#filterInput) {
      this.#filterInput.removeEventListener('input', undefined);
    }
  }

  #render() {
    this.appendChild(this.#prevPageButton);
    this.appendChild(this.#nextPageButton);
    this.#container.appendChild(this.#table);
    this.#pageIndicator.textContent = `Page ${this.#currentPage} of ${this.getTotalPages()}`;
    this.#container.appendChild(this.#pageIndicator);
    this.appendChild(this.#container);
  }

  #clearTable() {
    while (this.#table.firstChild) {
      this.#table.removeChild(this.#table.firstChild);
    }
  }

  #columns        = undefined;
  #nbRows         = undefined;
  #table          = undefined;
  #data           = undefined;
  #filterInput    = undefined;
  #pageSize       = undefined;
  #nextPageButton = undefined;
  #prevPageButton = undefined;
  #currentPage    = undefined;
  #container      = undefined;
  #pageIndicator  = undefined;
  #sortOrder      = undefined;
}
// ################################################################ //
customElements.define('x-data-table', WCDataTableView);
// ################################################################ //

export { WCDataTableView };