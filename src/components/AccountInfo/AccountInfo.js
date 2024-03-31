import {AccountDetail} from "./AccountDetail";
import {LinkButton, Variations} from "../LinkButton/LinkButton";
import {Transactions} from "../Transactions/Transactions";
import {Panel} from "../Panels/Panel";
import {useEffect, useState} from "react";
import {useAuth} from "react-oidc-context";
import {Api} from "../../services/BankingApi";
import moment from "moment";
import {Withdraw} from "../Transactions/Withdraw";

export const AccountInfo = ({account}) => {
    const initialState = {
        transactions: []
    }
    const [state, setState] = useState(initialState);
    const auth = useAuth();
    const api = Api(auth.user.access_token);

    useEffect(() => {
        if (!account) return;
        const fetchData = async () => await loadTransactions();
        fetchData();
    }, [account]);

    const loadTransactions = async () => {
        const {records} = await api.getAccountTransactions({
            accountId: account.id,
            page: 0,
            size: 1000,
            start: moment().subtract(3, "month").format("YYYY-MM-DD"),
            end: moment().format("YYYY-MM-DD")
        });

        setState(s => {
            return {
                ...s,
                transactions: [...records]
            }
        });
    }

    if (!account) return null;

    return (
        <Panel>
            <AccountDetail account={account}/>
            <hr/>
            <Withdraw account={account} onTransactionCompleted={loadTransactions}/>
            <hr/>
            <Transactions items={state.transactions}/>
        </Panel>
    )
}