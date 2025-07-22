export interface Contract {
      contractId: string;
      customerId: string;
      customer?: any;
      totalAmount: number;
      frequency: string;
      paymentDay: string;
      start: string;
      end: string;
      status: string;
      type: string;
      terminationClause: string;
      penaltyFee: number;
      description: string;
      currencyId: string;
}

export interface StatusTransition {
      fromStatus: string;
      toStatus: string;
}