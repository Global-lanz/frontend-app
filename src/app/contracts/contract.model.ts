export interface Contract {
      contract_id: string;
      //company_id: string;
      customer_id: string;
      total_amount: number;
      contract_type: string;
      frequency: string;
      payment_day: number;
      start_date: string;
      end_date: string;
      status: string;
      termination_clause: string;
      penalty_fee: number;
}