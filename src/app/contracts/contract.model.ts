export interface Contract {
      contractId: string;
      customerId: string;
      totalAmount: number;
      frequency: string;
      paymentDay: string;
      start: string;
      end: string;
      status: string;
      type: string;
      terminationClause: string;
      penaltyFee: number;
      currencyId: string;
}

export interface StatusTransition {
      fromStatus: string;
      toStatus: string;
}