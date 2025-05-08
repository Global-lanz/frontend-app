export interface Customer {
    customerId: string;
    name: string;
    taxIdentificationNumber: string;
    taxIdentificationType: string;
    taxRegime: string;
    annualRevenue: number;
    country: string;
    address: string;
    postalCode: string;
    businessSector: string;
    establishmentDate: string;
    notes: string;
    currencyId: string;
}