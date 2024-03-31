import {AccountDetail} from "./AccountDetail";
import {Transactions} from "../Transactions/Transactions";
import {Panel} from "../Panels/Panel";
import {useEffect, useState} from "react";
import {useAuth} from "react-oidc-context";
import {Api} from "../../services/BankingApi";
import moment from "moment";
import {Withdraw} from "../Transactions/Withdraw";
import {Deposit} from "../Transactions/Deposit";

export const AccountInfo = ({accountId}) => {
    const initialState = {
        account: null,
        transactions: []
    }
    const [state, setState] = useState(initialState);
    const auth = useAuth();
    const api = Api(auth.user.access_token);

    const updateAccountInfo = async () => {
        const account = await getAccountInfo(accountId);
        const transactions = await getTransactions(accountId);
        setState(s => {
            return {
                ...s,
                account: {...account},
                transactions: [...transactions]
            }
        });
    }

    useEffect(() => {
        if (!accountId) return;
        const fetchData = async () => {
            await updateAccountInfo(accountId);
        };
        fetchData();
    }, [accountId]);

    const getAccountInfo = async (accountId) => await api.getAccount(accountId)

    const getTransactions = async (accountId) => {
        const {records} = await api.getAccountTransactions({
            accountId: accountId,
            page: 0,
            size: 1000,
            start: moment().subtract(3, "month").format("YYYY-MM-DD"),
            end: moment().format("YYYY-MM-DD")
        });
        return records;
    }

    return (
        <>
            {
                state.account && <Panel>
                    <AccountDetail account={state.account}/>
                    <hr/>
                    <Deposit account={state.account} onTransactionCompleted={updateAccountInfo}/>
                    <hr/>
                    <Withdraw account={state.account} onTransactionCompleted={updateAccountInfo}/>
                    <hr/>
                    <Transactions items={state.transactions}/>
                </Panel>
            }
        </>
    )
}