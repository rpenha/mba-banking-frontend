import { formatNumber } from "./Utils";
import React, {useState} from "react";

export const Saque = (props) => {
    const {client} = props;
    const [budgetList, setBudgetList] = useState(client.transactions || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalValue, setModalValue] = useState({title: '', amount: ''});
    const [modalAction, setModalAction] = useState('add');
    const [errorMessage, setErrorMessage] = useState('');
    const [currentBalance, setCurrentBalance] = useState(client.balance);

    const addTransaction = (e) => {
        e.preventDefault();
        setModalValue({title: '', amount: ''});
        setModalAction('add');
        setIsModalOpen(true);
    }

    const saveTransaction = (amount, title) => {
        amount = parseFloat(amount);
        if(amount > 0 && amount <= currentBalance) {
            setCurrentBalance(currentBalance - amount);
            const newTransaction = {title: title, amount: amount, type: 'withdraw', date: new Date().toLocaleDateString()};
            const newTransactionList = [newTransaction, ...budgetList];
            setBudgetList(newTransactionList);
            setIsModalOpen(false);
            setErrorMessage('');
        } else {
            setErrorMessage('Saldo insuficiente para o saque.');
        }
    }

    const modal = isModalOpen ? <BudgetModal 
                  title={modalValue.title}
                  amount={modalValue.amount}
                  modalAction={modalAction} 
                  setIsModalOpen={setIsModalOpen}
                  saveTransaction={saveTransaction} /> : '';

    return (
        <div id="main-content">
            <form id="form" className="budget">
                <h1>Sacar</h1>
                <div>Faça saques rápidos e fáceis da sua conta com nosso aplicativo de orçamento</div>

                <div id="budget">
                    <div className="budget-menu">
                        <div>
                            <button className="btn2" onClick={addTransaction}><i className='bx bx-book-add'></i> Sacar</button>
                        </div>
                        <div>
                          <label>Saldo na conta</label>
                          <h1 className={currentBalance < 0 ? 'danger' : ''}>R$ {formatNumber(currentBalance)}</h1>
                        </div>
                    </div>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
            {modal}
        </div>
    )
}

const BudgetModal = (props) => {
    const { saveTransaction, setIsModalOpen, title, amount, modalAction } = props;
    const [modalValue, setModalValue] = useState({title: title, amount: amount});
    const [action, setAction] = useState(modalAction);

    const onSubmit = (e) => {
        e.preventDefault();

        if(action === 'add') {
            saveTransaction(modalValue.amount, modalValue.title);
        }
    }

    const onChangeAmount = (e) => {
        setModalValue({...modalValue, amount: parseFloat(e.target.value)});
    }

    return (
        <div className="overlay">
            <div className="modal">
                <form onSubmit={onSubmit}>
                    <h2 className="title">Sacar</h2>
                    <label>Valor</label>
                    <input type="number" name="amount" onChange={onChangeAmount} value={modalValue.amount} autoComplete="off" />
                    <button type="button" onClick={() => setIsModalOpen(false)} className="btn2 btn-muted">Cancelar</button>
                    <button type="submit" className="btn2">Confirmar</button>
                </form>
            </div>
        </div>
    )
}

export default Saque;
