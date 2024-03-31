import {RegularTitle} from "../Headings/Headings";
import {Money} from "../Money/Money";
import {DataList, DataListItem} from "../DataList/DataList";

export const AccountDetail = ({account}) => {
    return (
        <div>
            <RegularTitle>
                {`${account.bankBranch}/${account.accountNumber}`}
            </RegularTitle>

            <DataList>
                <DataListItem title="Balance:" data={<Money amount={account.balance} currency={account.currency}/>}/>
                <DataListItem title="Limit:" data={<Money amount={account.totalLimit} currency={account.currency}/>}/>
                <DataListItem title="Used limit:" data={<Money amount={account.usedLimit} currency={account.currency}/>}/>
                <DataListItem title="Current limit:" data={<Money amount={account.currentLimit} currency={account.currency}/>}/>
                <DataListItem title="Available amount:" data={<Money amount={account.availableAmount} currency={account.currency}/>}/>
            </DataList>
        </div>
    )
}