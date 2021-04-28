import { GlobalStyle } from "./styles/global";
import { Header } from './components/Header'
import { Dashboard } from "./components/Dashboard";
import Modal from "react-modal";
import { useState } from "react";
import { NewtransactionModal } from "./components/NewTransactionsModal";

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
    <>
      <Header openNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewtransactionModal
        isOpen={inNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </>
  );
}