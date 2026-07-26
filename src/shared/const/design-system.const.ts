export type ColorToken = {
  name: string;
  variable: string;
  hex: string;
  swatchClassName: string;
  textClassName: string;
};

export const COLOR_TOKENS: ColorToken[] = [
  {
    name: 'Background',
    variable: '--background',
    hex: '#F7F2E9',
    swatchClassName: 'bg-background border border-border',
    textClassName: 'text-foreground',
  },
  {
    name: 'Foreground',
    variable: '--foreground',
    hex: '#20241F',
    swatchClassName: 'bg-foreground',
    textClassName: 'text-background',
  },
  {
    name: 'Card',
    variable: '--card',
    hex: '#FBF8F2',
    swatchClassName: 'bg-card border border-border',
    textClassName: 'text-card-foreground',
  },
  {
    name: 'Primary',
    variable: '--primary',
    hex: '#132A20',
    swatchClassName: 'bg-primary',
    textClassName: 'text-primary-foreground',
  },
  {
    name: 'Secondary',
    variable: '--secondary',
    hex: '#1C3B2C',
    swatchClassName: 'bg-secondary',
    textClassName: 'text-secondary-foreground',
  },
  {
    name: 'Muted',
    variable: '--muted',
    hex: '#F1EADC',
    swatchClassName: 'bg-muted border border-border',
    textClassName: 'text-muted-foreground',
  },
  {
    name: 'Accent',
    variable: '--accent',
    hex: '#E4DDCD',
    swatchClassName: 'bg-accent border border-border',
    textClassName: 'text-accent-foreground',
  },
  {
    name: 'Brand Gold',
    variable: '--brand-academy',
    hex: '#C9974F',
    swatchClassName: 'bg-brand-academy',
    textClassName: 'text-primary',
  },
  {
    name: 'Brand Green',
    variable: '--brand-green',
    hex: '#1C3B2C',
    swatchClassName: 'bg-brand-green',
    textClassName: 'text-primary-foreground',
  },
  {
    name: 'Border',
    variable: '--border',
    hex: '#E4DDCD',
    swatchClassName: 'bg-border',
    textClassName: 'text-foreground',
  },
  {
    name: 'Destructive',
    variable: '--destructive',
    hex: '',
    swatchClassName: 'bg-destructive',
    textClassName: 'text-white',
  },
];

export type TypeScaleToken = {
  label: string;
  sampleClassName: string;
  usage: string;
};

export const TYPE_SCALE_TOKENS: TypeScaleToken[] = [
  { label: 'H1 / Display', sampleClassName: 'font-heading text-5xl font-bold', usage: 'Playfair Display · hero headlines' },
  { label: 'H2', sampleClassName: 'font-heading text-4xl font-bold', usage: 'Playfair Display · section titles' },
  { label: 'H3', sampleClassName: 'font-heading text-2xl font-semibold', usage: 'Playfair Display · card / block titles' },
  { label: 'Body Large', sampleClassName: 'font-sans text-lg font-normal', usage: 'Poppins · intro paragraphs' },
  { label: 'Body', sampleClassName: 'font-sans text-base font-normal', usage: 'Poppins · default copy' },
  { label: 'Small', sampleClassName: 'font-sans text-sm font-normal', usage: 'Poppins · secondary text' },
  { label: 'Caption', sampleClassName: 'font-sans text-xs font-medium', usage: 'Poppins · labels, meta' },
];

export type RadiusToken = {
  name: string;
  className: string;
};

export const RADIUS_TOKENS: RadiusToken[] = [
  { name: 'sm', className: 'rounded-sm' },
  { name: 'md', className: 'rounded-md' },
  { name: 'lg', className: 'rounded-lg' },
  { name: 'xl', className: 'rounded-xl' },
  { name: '2xl', className: 'rounded-2xl' },
  { name: '3xl', className: 'rounded-3xl' },
  { name: 'full (pill)', className: 'rounded-full' },
];

export type ShadowToken = {
  name: string;
  className: string;
};

export const SHADOW_TOKENS: ShadowToken[] = [
  { name: 'sm', className: 'shadow-sm' },
  { name: 'md', className: 'shadow-md' },
  { name: 'lg', className: 'shadow-lg' },
  { name: 'xl', className: 'shadow-xl' },
  { name: '2xl', className: 'shadow-2xl' },
];

export type SpacingToken = {
  name: string;
  className: string;
};

export const SPACING_TOKENS: SpacingToken[] = [
  { name: '1', className: 'w-1' },
  { name: '2', className: 'w-2' },
  { name: '3', className: 'w-3' },
  { name: '4', className: 'w-4' },
  { name: '6', className: 'w-6' },
  { name: '8', className: 'w-8' },
  { name: '10', className: 'w-10' },
  { name: '12', className: 'w-12' },
  { name: '16', className: 'w-16' },
  { name: '20', className: 'w-20' },
  { name: '24', className: 'w-24' },
  { name: '32', className: 'w-32' },
];
