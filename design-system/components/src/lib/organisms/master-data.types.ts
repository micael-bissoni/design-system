export type EntityType = 'Laboratório' | 'Armazenista' | 'Farmácia';

export interface EntityAddress {
  address: string;
  postalCode: string;
  district: string;
  county: string;
}

export interface EntityIdentification {
  eik: string;
  type: EntityType;
  name: string;
  nif: string;
  isActive: boolean;
}

export interface EntityContact {
  email: string;
  phone: string;
  contactPerson: string;
}

export interface EntityData {
  identification: EntityIdentification;
  contactAndLocation: EntityContact & EntityAddress;
}

export type GeographyType = 'ARS' | 'ACES' | 'Distrito' | 'Concelho';

export interface GeographyData {
  id: string;
  name: string;
  type: GeographyType;
  parentRegionId?: string;
  externalCode: string;
  description: string;
  isActive: boolean;
}

export type ClusterType = 'Comercial' | 'Financeiro' | 'Logístico';

export interface ClusterData {
  id: string;
  name: string;
  type: ClusterType;
  segmentationCriteria: string;
  associatedEntityIds: string[];
  color?: string;
  icon?: string;
  isActive: boolean;
}
