import { GlobalStyle } from "./styles/global";
import { Header } from './components/Header'
import { Dashboard } from "./components/Dashboard";
import Modal from "react-modal";
import React, { useState } from "react";
import { NewtransactionModal } from "./components/NewTransactionsModal";
import { TransactionsProvider } from "./TransactionsContext";

Modal.setAppElement('#root');

export function App() {

  const [inNewTransactionModalOpen, setInNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setInNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setInNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header openNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewtransactionModal
        isOpen={inNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}