export const Account = ({customer, accounts}) => {

  return (
    <div className="account">
      <div className="details">
        {customer && <AccountHolder fullname={`${customer.firstName} ${customer.lastName}`}/>}
        <AccountsList records={accounts}/>
        {/*<AccountType type={type}/>*/}
        {/*<AccountNumber accountNumber={accountNumber}/>*/}
      </div>
      {/*<AccountBalance balance={(balance)}/>*/}
    </div>
  )
}

const AccountsList = ({records}) => {
  return (
    <>
      {records.length > 0 && <h4>My accounts</h4>}
      {
        records.map(x => (
          <div key={x.id}>
            <AccountNumber accountNumber={`${x.bankBranch} ${x.accountNumber}`}/>
          </div>
        )
        )
      }
    </>
  )
}

export const AccountHolder = (props) => {
  return (
    <h1>{props.fullname}</h1>
  )
}


export const AccountType = (props) => {
  return (
    <h3>{props.type}</h3>
  )
}


export const AccountNumber = (props) => {
  return (
    <div>{props.accountNumber}</div>
  )
}


export const AccountBalance = (props) => {
  const balance = props.balance;
  const formattedBalance = parseFloat(balance).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
  return (
    <div className="balance">{formattedBalance}</div>
  )
}

