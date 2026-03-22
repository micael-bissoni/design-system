import { base } from '../../../public/tokens/ts/base/index';
import { brand1 } from '../../../public/tokens/ts/brand-1/index';
import { brand2 } from '../../../public/tokens/ts/brand-2/index';
export const brands = {
  'base': base,
  'brand-1': brand1,
  'brand-2': brand2
} as const;
export type Brand = keyof typeof brands;
  