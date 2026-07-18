export type GiftCardBuilderState = {
  tab: 'beauty' | 'academy';
  mode: 'amount' | 'procedure';
  selectionId: string;
  purpose: 'gift' | 'self';
  recipient: string;
  sender: string;
  phone: string;
  email: string;
  usage: 'თბილისი' | 'საგარეჯო' | 'ორივე';
  message: string;
  themeId: string;
};

export type GiftCardPatch = Partial<GiftCardBuilderState>;
