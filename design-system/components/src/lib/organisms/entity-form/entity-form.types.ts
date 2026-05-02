export type EntityType = 'Laboratório' | 'Armazenista' | 'Farmácia';

export interface EntityData {
  eik: string;
  type: EntityType | string;
  name: string;
  nif: string;
  isActive: boolean;
  logo?: string;
}