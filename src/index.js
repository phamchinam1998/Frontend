import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { allReducers } from './redux/reducer';

const store = createStore(allReducers)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById("root")
);
