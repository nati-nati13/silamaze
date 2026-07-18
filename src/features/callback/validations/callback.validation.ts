import { z } from 'zod';

import { CALLBACK_INTEREST_TYPES } from '@/shared/const/callback.const';

// Georgian mobile: 9 digits starting with 5, optional +995 country code.
// Accepts "+995 599 12 34 56", "599 12 34 56", "995599123456", etc.
const GEORGIAN_PHONE_RE = /^(995)?5\d{8}$/;

const normalizePhone = (value: string): string => value.replace(/[\s-]/g, '').replace(/^\+/, '');

export const PublicCallbackSchema = z.object({
  name: z.string().optional(),
  phone: z
    .string()
    .min(1, 'ტელეფონი სავალდებულოა')
    .refine((v) => GEORGIAN_PHONE_RE.test(normalizePhone(v)), 'შეიყვანეთ სწორი ნომერი'),
  interestType: z.enum(CALLBACK_INTEREST_TYPES),
  message: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: 'აუცილებელია თანხმობა',
  }),
});

export type PublicCallbackType = z.infer<typeof PublicCallbackSchema>;
