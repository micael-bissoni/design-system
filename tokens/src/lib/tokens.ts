import {brand1} from '../../build/ts/brand-1';
import {brand2} from '../../build/ts/brand-2';
import {defaultBrand} from '../../build/ts/default-brand';;
export const brands = {brand1, brand2, defaultBrand} as const;
export type Brand = keyof typeof brands;
  