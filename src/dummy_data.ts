export const DUMMY_CUSTOMERS = [
    {
      customerId: 'u1',
      name: 'John Doe',
      taxIdentificationNumber: '2',
      taxIdentificationType: '???',
      taxRegime: '??',
      annualRevenue: 2000,
      country: 'Germany',
      address: 'Dort 44',
      postalCode: '66677',
      businessSector: 'Content Creator',
      establishmentDate: '1970-01-01',
      notes: 'John Doe is a very special client ... very, very special',
      currencyId: 'EUR',
    },
  ];
  

  export const DUMMY_CONTRACTS = [
    {
      contract_id: 'c1',
      customer_id: 'u1',
      total_amount: 20000,
      contract_type: 'consulting',
      frequency: 'monthly',
      payment_day: 1,
      start_date: '2024-01-01',
      end_date: '2024-12-12',
      status: 'active',
      termination_clause: 'blabla',
      penalty_fee: 15.99,
    },
    {
      contract_id: 'c2',
      customer_id: 'u2',
      total_amount: 10000,
      contract_type: 'consulting',
      frequency: 'at once',
      payment_day: 1,
      start_date: '2024-01-01',
      end_date: '2024-12-12',
      status: 'active',
      termination_clause: 'blabla',
      penalty_fee: 19.99,
    }
  ]