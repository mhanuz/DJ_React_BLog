import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from './State/StateProvider';
import { reducer, initialstate } from './State/reducer';


ReactDOM.render(
  <StateProvider reducer={reducer} initialstate={initialstate}>
     <App />
  </StateProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

