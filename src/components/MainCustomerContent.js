import {AccountsList} from './Account';
import {useEffect, useState} from "react";
import {Api} from "../services/BankingApi";
import {useAuth} from "react-oidc-context";
import {Panel} from "./Panels/Panel";
import {RegularTitle} from "./Headings/Headings";
import {Section} from "./Section/Section";

export const MainCustomerContent = () => {
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

        </Section>
    )
}

