import {useEffect, useState} from "react";
import {Api} from "../../services/BankingApi";
import moment from "moment/moment";
import styles from "./Transactions.module.css";

import {Money} from "../Money";
import {useAuth} from "react-oidc-context";

export const Transactions = ({accountId}) => {
    const initialState = {
        transactions: []
    }
    const [state, setState] = useState(initialState);
    const auth = useAuth();
    const api = Api(auth.user.access_token);

    useEffect(() => {
        if (!accountId) return;
        const fetchData = async () => {
            const {records} = await api.getAccountTransactions({
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

    }, [accountId]);


    if (!state.transactions || state.transactions.length === 0)
        return <h4>Nothing here!</h4>

    return (
        <div className={styles.Transactions}>
            {
                state.transactions.map(transaction => (
                    <div key={transaction.id} className={transaction.direction === "CashIn" ? styles.CashIn : styles.CashOut}>
                        <div>{moment(transaction.timestamp).format("YYYY-MM-DD")}</div>
                        <div>{`${transaction.description} (${transaction.direction})`}</div>
                        <div>
                            <Money amount={transaction.amount} currency={transaction.currency}/>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};