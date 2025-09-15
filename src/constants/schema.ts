import { z } from 'zod';

export const primitiveSchema = z.union([z.boolean(), z.number(), z.string(), z.null()]);
