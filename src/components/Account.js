import {AccountInfo} from "./AccountInfo/AccountInfo";

export const Account = ({customer}) => {
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
    return <>{records.map((account) => <AccountInfo key={account.id} account={account}/>)}</>
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