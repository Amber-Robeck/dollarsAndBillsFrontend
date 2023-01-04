import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BudgetProvider } from "./utils/BudgetContext"

ReactDOM.render(
  <React.StrictMode>
    {/* <BudgetProvider> */}
    <App />
    {/* </BudgetProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
