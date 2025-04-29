export interface Customer {
    id: string;
    name: string;
    tax_identification_number: string;
    tax_identification_type: string;
    tax_regime: string;
    annual_revenue: number;
    currency: string;
    country: string;
    address: string;
    postal_code: string;
    business_sector: string;
    establishment_date: string;
    notes: string;
}