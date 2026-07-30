export type ProductCategory = {
  id: string;
  label: string;
  icon: 'droplet' | 'pipette' | 'eye' | 'spray-can' | 'waves' | 'sun' | 'flask-conical';
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: 'face-creams', label: 'სახის კრემები', icon: 'droplet' },
  { id: 'serums', label: 'შრატები', icon: 'pipette' },
  { id: 'eye-care', label: 'თვალის მოვლა', icon: 'eye' },
  { id: 'cleansers', label: 'გამწმენდი საშუალებები', icon: 'spray-can' },
  { id: 'moisturizers', label: 'დამატენიანებლები', icon: 'waves' },
  { id: 'spf', label: 'SPF', icon: 'sun' },
  { id: 'professional', label: 'პროფესიონალური კოსმეტიკა', icon: 'flask-conical' },
];
