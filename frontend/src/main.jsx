import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import cartReducer from '../store/cart/cartReducer.js';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    cartStore: cartReducer,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
       <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
