import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { api } from '../services/api';


interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createAt: string,
}

// abaixo nós temos algumas formas de criar uma interface ou types que são semelhantes a interface ja criadas, os types vao herdar a interface
//com Pick escolhemos quais atributos vamos querer e com omit escolhemos quais atributos vamos remover
//ou podemos fazer uma nova interface com os atributos desejados

// interface TransactionImput {
//     title: string,
//     amount: number,
//     type: string,
//     category: string,
// }

//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>

type TransactionInput = Omit<Transaction, 'id'| 'createAt'>

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
    );

export function TransactionsProvider({children}: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api('/transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

   async function createTransaction(transactionInput: TransactionInput) {
      const response = await api.post('/transactions', {...transactionInput, createAt: new Date(), })
      const {transaction} = response.data;
      setTransactions([
          ...transactions,
          transaction,
      ])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )

}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    return context;
}