import { brand1 } from '../../../public/tokens/ts/brand-1/index';
import { brand2 } from '../../../public/tokens/ts/brand-2/index';
import { defaultBrand } from '../../../public/tokens/ts/default-brand/index';
export const brands = {
  'brand-1': brand1,
  'brand-2': brand2,
  'default-brand': defaultBrand
} as const;
export type Brand = keyof typeof brands;
  