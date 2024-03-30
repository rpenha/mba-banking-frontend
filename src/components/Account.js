import {NavLink} from "react-router-dom";
import {AccountInfo} from "./AccountInfo/AccountInfo";
import {Panel} from "./Panels/Panel";
import {LinkButton, Variations} from "./LinkButton/LinkButton";
import {Transactions} from "./Transactions/Transactions";

export const Account = ({customer, accounts}) => {

    return (
        <div className="account">
            <div className="details">
                {customer && <AccountHolder fullname={`${customer.firstName} ${customer.lastName}`}/>}
                {/*<AccountsList records={accounts}/>*/}
                {/*<AccountType type={type}/>*/}
                {/*<AccountNumber accountNumber={accountNumber}/>*/}
            </div>
            {/*<AccountBalance balance={(balance)}/>*/}
        </div>
    )
}

export const AccountsList = ({records}) => {
    return (
        <>
            {
                records.map((account) => (
                        <Panel key={account.id}>
                            <AccountInfo account={account}/>
                            <hr/>
                            <div>
                                {/*<LinkButton to={`/accounts/${account.id}`} variation={Variations.Primary}>*/}
                                {/*    Transactions*/}
                                {/*</LinkButton>*/}
                                {/*&nbsp;*/}
                                <LinkButton to={`/accounts/${account.id}`} variation={Variations.Danger}>
                                    Withdraw
                                </LinkButton>
                                &nbsp;
                                <LinkButton to={`/accounts/${account.id}`} variation={Variations.Success}>
                                    Deposit
                                </LinkButton>
                            </div>
                            <hr/>
                            <Transactions accountId={account.id}/>
                            <hr/>
                        </Panel>
                    )
                )
            }
        </>
    )
}

export const AccountHolder = ({fullname}) => {
    return (
        <h1>{fullname}</h1>
    )
}


export const AccountType = (props) => {
    return (
        <h3>{props.type}</h3>
    )
}


export const AccountNumber = ({accountNumber}) => {
    return (
        <h4>{accountNumber}</h4>
    )
}