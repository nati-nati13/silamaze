export type GiftCardBuilderState = {
  tab: 'beauty' | 'academy';
  mode: 'amount' | 'procedure';
  selectionId: string;
  purpose: 'gift' | 'self';
  // 1. buyer / payer identity (authoritative)
  buyerFirstName: string;
  buyerLastName: string;
  buyerPhone: string;
  buyerEmail: string;
  // 2. personalization
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  displayFrom: string;
  usage: 'თბილისი' | 'საგარეჯო' | 'ორივე';
  message: string;
  themeId: string;
};

export type GiftCardPatch = Partial<GiftCardBuilderState>;

export type BuyerFieldErrors = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
};
