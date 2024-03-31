import {AccountInfo} from "./AccountInfo/AccountInfo";

export const AccountsList = ({records}) => {
    return <>{records.map((account) => <AccountInfo key={account.id} account={account}/>)}</>
}


export const AccountHolder = ({fullname}) => {
    return (
        <h1>{fullname}</h1>
    )
}