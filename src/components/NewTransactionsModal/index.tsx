
import React, { FormEvent, useState } from "react";
import Modal from "react-modal";
import IncomeImg from "../../assets/income.svg"
import OutcomeImg from "../../assets/outcome.svg"
import CloseImg from "../../assets/close.svg"
import { api } from "../../services/api";

import { Container, RadioBox, TransactionsTypeContainer } from "./styles";

interface newTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewtransactionModal({ isOpen, onRequestClose }: newTransactionModalProps) {

    const [title, setTitle] = useState("");
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState("");
    const [type, setType] = useState("deposit")

    function createNewTransaction(event: FormEvent) {
        event.preventDefault();
        const data = {
            title,
            value,
            category,
            type
        }

        api.post('/transactions', data)

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
                    value={value}
                    onChange={event => setValue(Number(event.target.value))}
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