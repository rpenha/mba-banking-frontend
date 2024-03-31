class BankingApi {
    constructor(accessToken) {
        this.accessToken = accessToken;
        this.baseUrl = "/api";
    }

    async getData(url) {
        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            }
            const response = await fetch(url, options);
            return await response.json();
        } catch (error) {
            console.log("error", error);
        }
    };

    async postData(url, data) {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
            return await fetch(url, options);
        } catch (error) {
            console.log("error", error);
        }
    };

    async getCustomer(customerId) {
        const {record} = await this.getData(`${this.baseUrl}/customers/${customerId}`);
        return record;
    }

    async getCustomerAccounts(customerId) {
        const {records} = await this.getData(`${this.baseUrl}/customers/${customerId}/accounts`);
        return records;
    };

    async getAccount(accountId) {
        const {record} = await this.getData(`${this.baseUrl}/accounts/${accountId}`);
        return record;
    }

    async getAccountTransactions({accountId, page, size, start, end}) {
        const qs = new URLSearchParams({
            page,
            size,
            start,
            end
        });
        return await this.getData(`${this.baseUrl}/accounts/${accountId}/transactions?${qs}`)
    };

    async withdraw(payload){
        const {accountId, amount, withdrawType} = payload;
        const body = {
            amount,
            withdrawType
        }
        await this.postData(`${this.baseUrl}/accounts/${accountId}/withdrawals`, body)
    }

    async deposit(payload){
        const {accountId, amount, depositType} = payload;
        const body = {
            amount,
            depositType
        }
        await this.postData(`${this.baseUrl}/accounts/${accountId}/deposits`, body)
    }
}

export const Api = (accessToken) => new BankingApi(accessToken);

//export const Api = new BankingApi();
