import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./polyfills";
import SolanaWalletProvider from "./wallet_provider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SolanaWalletProvider>
      <App />
    </SolanaWalletProvider>
  </React.StrictMode>
);
