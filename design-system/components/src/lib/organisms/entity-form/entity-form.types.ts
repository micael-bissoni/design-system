export type EntityType = 'Laboratório' | 'Armazenista' | 'Farmácia';

export interface EntityIdentification {
  eik: string;
  type: EntityType | string;
  name: string;
  nif: string;
  isActive: boolean;
  logo?: string;
}

export interface EntityContact {
  email: string;
  phone?: string;
  contactPerson?: string;
}

export interface EntityAddress {
  address?: string;
  postalCode?: string;
  district?: string;
  county?: string;
}

export interface EntityData {
  identification: EntityIdentification;
  contactAndLocation: EntityContact & EntityAddress;
}