
import React, { FormEvent, useState, useContext } from "react";
import Modal from "react-modal";

import { TransactionsContext } from "../../TransactionsContext";
import { api } from "../../services/api";

import IncomeImg from "../../assets/income.svg"
import OutcomeImg from "../../assets/outcome.svg"
import CloseImg from "../../assets/close.svg"

import { Container, RadioBox, TransactionsTypeContainer } from "./styles";


interface newTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewtransactionModal({ isOpen, onRequestClose }: newTransactionModalProps) {

    const { createTransaction} = useContext(TransactionsContext)

    const [title, setTitle] = useState("");
    const [amount, setAmount]  = useState(0);
    const [category, setCategory] = useState("");
    const [type, setType] = useState("deposit")

   async function createNewTransaction(event: FormEvent) {
        event.preventDefault();

       await createTransaction({
            title,
            amount: amount,
            category,
            type
        })

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit')
       
        onRequestClose();

    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={CloseImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={createNewTransaction}>
                <h2>Nova transação</h2>

                <input
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}

                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionsTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit') }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={IncomeImg} alt="Entradas" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('withdraw') }}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={OutcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionsTypeContainer>

                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>

        </Modal>
    )
}