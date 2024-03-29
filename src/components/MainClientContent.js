import {Account} from './Account';
import {useEffect, useState} from "react";
import {Api} from "../services/BankingApi";
import moment from 'moment';

export const MainClientContent = props => {

    const initialState = {
        loaded: false,
        customer: null,
        accounts: [],
        selectedAccount: null,
        transactions: []
    };
    const [state, setState] = useState(initialState);
    //const Api = useBankingApi();

    useEffect(() => {
        const fetchData = async () => {
            //const customerId = "0f41344a-3a2c-4f2c-89e0-7aadc5c819d3";
            const customerId = "eb1def70-0ec2-40b3-a2fb-617b3ea2b8f1";
            const customer = await Api.getCustomer(customerId);
            const accounts = await Api.getCustomerAccounts(customerId);

            setState(s => {
                return {
                    ...s,
                    customer: customer,
                    accounts: accounts,
                    selectedAccount: accounts[0].id ?? null
                }
            });
        };

        fetchData();

    }, []);

    useEffect(() => {
        if (!state.selectedAccount) return;
        const accountId = state.selectedAccount;
        console.log(accountId);
        const fetchData = async () => {
            const {records} = await Api.getAccountTransactions({
                accountId: accountId,
                page: 0,
                size: 50,
                start: moment().subtract(3, "month").format("YYYY-MM-DD"),
                end: moment().format("YYYY-MM-DD")
            });

            setState(s => {
                return {
                    ...s,
                    transactions: [...records]
                }
            })
        };

        fetchData();

    }, [state.selectedAccount]);


    const {user} = props;
    console.log(user);

    // const transactions = user.transactions.map((transaction, index) => {
    //   const className = index % 2 === 0 ? 'even' : 'odd'
    //   return <div className={`transaction-item ${className}`}>
    //     <div>{transaction.date}</div>
    //     <div>{transaction.title}</div>
    //     <div>{transaction.type === 'debit' ? formatNumber((transaction.amount * -1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })) : formatNumber(transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}</div>
    //   </div>
    // });


    return (
        <section id="main-content">
            <h1 className="main">My Info</h1>
            <Account customer={state.customer} accounts={state.accounts}/>
            <div id="transactions">
                <h2>Histórico</h2>
                <div id="transaction-div">
                    <AccountTransactions transactions={state.transactions}/>
                </div>
            </div>
        </section>
    )
}

const AccountTransactions = ({transactions}) => {
    return (
        <>
            {
                transactions && transactions.length > 0 && transactions.map(x => (
                    <div key={x.id} className="transaction-item">
                        <div>{moment(x.timestamp).format("YYYY-MM-DD")}</div>
                        <div>{`${x.description} (${x.direction})`}</div>
                        <div>
                            {
                                x.amount.toLocaleString(
                                    "pt-BR", {
                                        style: "currency",
                                        currency: x.currency
                                    }
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}
