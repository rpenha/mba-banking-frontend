class BankingApi {
  constructor() {
    this.baseUrl = "/api";
  }

  async getData(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log("error", error);
    }
  };

  async getCustomer(customerId){
    const {record} = await this.getData(`${this.baseUrl}/customers/${customerId}`);
    return record;
  }

  async getCustomerAccounts(customerId){
    const {records} = await this.getData(`${this.baseUrl}/customers/${customerId}/accounts`);
    return records;
  };

  async getAccountTransactions({accountId, page, size, start, end}) {
    const qs = new URLSearchParams({
      page,
      size,
      start,
      end
    });
    return await this.getData(`${this.baseUrl}/accounts/${accountId}/transactions?${qs}`)
  };
}

export const Api = new BankingApi();
