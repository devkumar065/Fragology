export interface CustomerProfile {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
  preferredScentFamily?: string;
  newsletterOptIn?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerAddress {
  id: string;
  userId?: string;
  label?: string; // 'Home', 'Atelier', 'Office'
  fullName: string;
  phone?: string;
  streetAddress1: string;
  streetAddress2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
  createdAt?: string;
}
