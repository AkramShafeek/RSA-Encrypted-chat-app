import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { persistentStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={persistentStore}>
      <PersistGate loading={null} persistor={persistStore(persistentStore)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
