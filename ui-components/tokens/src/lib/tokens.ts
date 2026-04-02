import { base } from './generated/base/index';
import { brand1 } from './generated/brand-1/index';
import { brand2 } from './generated/brand-2/index';

export const brands = {
  'base': 'base',
  'brand1': 'brand-1',
  'brand2': 'brand-2',
} as const;

export type Brand = keyof typeof brands;
