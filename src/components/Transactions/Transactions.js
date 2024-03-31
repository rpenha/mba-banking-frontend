import moment from "moment/moment";
import styles from "./Transactions.module.css";
import {Money} from "../Money/Money";

export const Transactions = ({items}) => {

    if (!items || items.length === 0)
        return <h4>Nothing here!</h4>

    return (
        <div className={styles.Transactions}>
            {
                items.map(transaction => (
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