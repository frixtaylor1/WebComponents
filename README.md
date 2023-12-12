Certainly! Below is a sample README for your SDK application for vanilla JavaScript using web components with an MVC approach:

---

# SDK Application for JavaScript Vanilla

## Overview

This project is an SDK application for JavaScript vanilla, focusing on the implementation of web components using a Model-View-Controller (MVC) architecture. The web components are created entirely with vanilla JavaScript, providing a lightweight and versatile solution for building modular and reusable elements.

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0). See the [LICENSE](LICENSE) file for details.

## Example Usage

The following example demonstrates how to utilize one of the web components, specifically a datatable, within your JavaScript application:

```javascript
/* UTILITY... */
import { 
  createElement, 
  createEvent 
} from './WebComponents/SDK/Utility/WCUtils.js';

/* WCLOGIN COMPONENT... */
import { WCLoginFormView } from './WebComponents/SDK/Form/WCLoginForm.js';

/* DATATABLE COMPONENT... */
import { WCDataTableController } from './WebComponents/SDK/DataTable/DataTableController.js';
import { WCDataTableModel } from './WebComponents/SDK/DataTable/DataTableModel.js';
import { WCDataTableView } from './WebComponents/SDK/DataTable/DataTableView.js';

/* DASHBOARD COMPONENT... ALMOST GLOBAL CONTEXT VIEW... */
import { WCDashboardView } from './WebComponents/SDK/Dashboard/WCDashboardView.js';

/* ELEMENTS STATES... */
/*From Prof. Matias Gastón*/
import { HTMLViewStateElement } from './WebComponents/SDK/StateElement/WCStateElement.js';

// ... (omitting parts of the code for brevity)

const htmlViewStateElement  = new HTMLViewStateElement();
const wcDashboardView       = new WCDashboardView();

// Define columns for the datatable
const columns = [
  // ... (define the structure of your columns here) for example:
    {
      id      : 'name',
      Header  : 'Name',
      accessor: 'name',
      sorter  : true,
    },
];

const nbOfRowsPerPage = 9;
const availableFilter = true;

// Create and initialize the datatable
const dataTable = new WCDataTableView(columns, nbOfRowsPerPage, availableFilter);
new WCDataTableController(dataTable, new WCDataTableModel());

// Create the home view
const home = new InitView();

// Add state transition for when the user is logged in
htmlViewStateElement.addStateTransition(home, wcDashboardView, 'wce-logged');
htmlViewStateElement.setCurrentState(home);

// Add styles for dashboard and datatable
let style = createElement('style');
style.innerText = `
  @import './WebComponents/SDK/Style/WCDashboard.css';
  @import './WebComponents/SDK/Style/WCDataTable.css';
`;

wcDashboardView.addNodeInMain = dataTable;

// Append elements to the document body
document.body.appendChild(htmlViewStateElement);
document.body.appendChild(style);

// ... (additional customization or configuration code)
```

## Getting Started

1. Clone the repository to your local machine.
2. Explore the web components in the `WebComponents` directory, each following the MVC architecture.
3. Customize and integrate these components into your JavaScript application as needed.

## Contribution

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests to improve the functionality and usability of the web components in this SDK application.

---