import {useEffect, useState} from "react";
import {Section} from "../components/Section/Section";
import {Panel} from "../components/Panels/Panel";
import {AccountDetail} from "../components/AccountInfo/AccountDetail";
import {useParams} from "react-router-dom";
import {Api} from "../services/BankingApi";
import {Transactions} from "../components/Transactions/Transactions";
import {useAuth} from "react-oidc-context";

export const AccountPage = () => {
    const {accountId} = useParams();
    const [state, setState] = useState({
        account: null
    });

    const auth = useAuth();
    const api = Api(auth.user.access_token);

    useEffect(() => {
        if (!accountId) return;
        const fetchData = async () => {
            const account = await api.getAccount(accountId);

            setState(s => {
                return {
                    ...s,
                    account: account
                }
            });
        };

        fetchData();
    }, [accountId]);

    return (
        <Section>
            {
                state.account &&
                <>
                    <Panel>
                        <AccountDetail account={state.account}/>
                    </Panel>

                    <Panel>
                        <Transactions accountId={accountId}/>
                    </Panel>
                </>
            }
        </Section>
    )
}