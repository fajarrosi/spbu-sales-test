import { z } from 'zod';
import { primitiveSchema } from './constants/schema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueTypeOfMap<T> = T extends Map<any, infer V> ? V : never;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Nullish<T> = T | null | undefined;

export type NonOptional<T> = T extends undefined ? never : T;

export type Primitive = z.infer<typeof primitiveSchema>;

export type DiscountGroup = {
  disc_grp_id: number;
  disc_grp_code: string;
  disc_grp_name: string;
  is_active: boolean;
  updated_by: number;
  updated_at: string;
  updated_by_name: string;
};

export type DiscountStatus = {
  discount_status_id: number;
  discount_status_desc: string;
};
