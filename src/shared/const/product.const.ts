export const PRODUCT_DIVISIONS = ['beauty', 'academy', 'products'] as const;

export type ProductDivision = (typeof PRODUCT_DIVISIONS)[number];
