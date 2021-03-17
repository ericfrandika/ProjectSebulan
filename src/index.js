import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import persistReducer from 'redux-persist/es/persistReducer';
import reducer from './reducer';
import { createStore } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'
// import "bootstrap/dist/css/bootstrap.min.css";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['AuthReducer','PrinReducer','DisReducer']
}
const persistedReducer = persistReducer(persistConfig, reducer);
let store = createStore(persistedReducer);
const persistor = persistStore(store);
ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
