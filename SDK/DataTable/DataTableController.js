/**
 * @file DataTableController.js
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


import { WCDataTableView } from './DataTableView.js';
import { WCDataTableModel } from './DataTableModel.js';

class WCDataTableController {
//private:
  #viewReference  = undefined;
  #modelReference = undefined;
//public:
  constructor(viewReference = new WCDataTableView(), modelReference = new WCDataTableModel()) {
    this.#viewReference   = viewReference;
    this.#modelReference  = modelReference;

    this.enable();
  }

  enable() {
    this.#onLoad();
    this.#onFilteredData();
    this.#onNextPage();
    this.#onPrevPage();
    this.#onSortedData();
  }

  async #onLoad() {
    this.#viewReference.data = await this.#modelReference.getData();
    this.#viewReference.reload();
  }

  #onPrevPage() {
    this.#viewReference.addEventListener('wce-data-table-prev-page', () => {
      this.#prevPage();
    });
  }

  #prevPage() {
    if (this.#viewReference.currentPage > 1) {
      this.#viewReference.currentPage--;
      this.#viewReference.reload();
    }
  }

  #onNextPage() {
    this.#viewReference.addEventListener('wce-data-table-next-page', () => {
      this.#nextPage();
    });
  }

  #nextPage() {
    if (this.#viewReference.currentPage < this.#viewReference.getTotalPages()) {
      this.#viewReference.currentPage++;
      this.#viewReference.reload();
    }
  }

  #onSortedData() {
    this.#viewReference.addEventListener('wce-data-table-header-cell-sort', (event) => {
      this.#sortData(event.detail.column_id);
    });
  }

  #sortData(column_id) {
    this.#modelReference.getData().then(res => {
      const sortedData = res.sort((a, b) => {
        if (a[column_id] < b[column_id]) {
          return -1;
        }
        if (a[column_id] > b[column_id]) {
          return 1;
        }
        return 0;
      });
  
      if (this.#viewReference.lastSortedColumn === column_id && this.#viewReference.sortOrder === 'asc') {
        sortedData.reverse();
        this.#viewReference.sortOrder = 'desc';
      } else {
        this.#viewReference.sortOrder = 'asc';
      }
  
      this.#viewReference.lastSortedColumn = column_id;
      this.#viewReference.data = sortedData;
      this.#viewReference.reload();
    });
  }

  #onFilteredData() {
    this.#viewReference.addEventListener('wce-data-table-filter', (event) => {
      this.#filterData(event.detail.filterValue);
    });
  }

  #filterData(searchValue) {
    this.#modelReference.getData().then(res => {
      const filteredData = res.filter(item => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
      });

      this.#viewReference.data = filteredData;
      this.#viewReference.reload();
    });
  }
}

export { WCDataTableController };