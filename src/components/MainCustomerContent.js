import {AccountHolder, AccountsList} from './Account';
import {useEffect, useState} from "react";
import {Api} from "../services/BankingApi";
import {useAuth} from "react-oidc-context";
import {Transactions} from "./Transactions/Transactions";
import {Panel} from "./Panels/Panel";
import {RegularTitle} from "./Headings/Headings";
import {Section} from "./Section/Section";

export const MainCustomerContent = props => {
    const initialState = {
        loaded: false,
        accounts: [],
        selectedAccount: null
    };
    const [state, setState] = useState(initialState);
    const auth = useAuth();
    const api = Api(auth.user.access_token);

    const customerId = auth.user?.profile.sub;

    useEffect(() => {
        const fetchData = async () => {
            const accounts = await api.getCustomerAccounts(customerId);

            setState(s => {
                return {
                    ...s,
                    accounts: accounts,
                    selectedAccount: accounts[0] ?? null
                }
            });
        };

        fetchData();

    }, [customerId]);

    return (
        <Section>
            <Panel>
                <RegularTitle>
                    {auth.user?.profile.name}
                </RegularTitle>
            </Panel>

            <AccountsList records={state.accounts}/>

            {/*/!*<Account customer={state.customer} accounts={state.accounts}/>*!/*/}
            {/*{*/}
            {/*    state.selectedAccount &&*/}
            {/*    <div id="transactions">*/}
            {/*        /!*<h2>{state.selectedAccount.bankBranch}/{state.selectedAccount.accountNumber} transactions</h2>*!/*/}
            {/*        <h2>Transactions</h2>*/}
            {/*        <div id="transaction-div">*/}
            {/*            <Transactions accountId={state.selectedAccount?.id}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}
        </Section>
    )
}

