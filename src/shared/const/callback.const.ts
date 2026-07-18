export const CALLBACK_INTEREST_TYPES = [
  'მომსახურება',
  'აკადემიის კურსი',
  'სხვა',
] as const;

export type CallbackInterestType = (typeof CALLBACK_INTEREST_TYPES)[number];

export const CALLBACK_STATUSES = ['new', 'contacted', 'closed'] as const;

export type CallbackStatus = (typeof CALLBACK_STATUSES)[number];

export const CALLBACK_SOURCE_HOMEPAGE = 'homepage-cta';
