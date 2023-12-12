/**
 * @file WCLoginFormController.js
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

import { WCLoginFormView } from "./WCLoginForm.js";
import { WCLoginFormModel } from "./WCLoginFormModel.js";

class WCLoginController {
//public:
  constructor(viewReference = new WCLoginFormView(), modelReference = new WCLoginFormModel()) {
    this.#view  = viewReference;
    this.#model = modelReference;
  }

//private:
  #view   = undefined;
  #model  = undefined;
}

export { WCLoginController };