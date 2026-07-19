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
  // 2. recipient
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  // 3. personalization
  displayFrom: string;
  message: string;
  isAnonymous: boolean;
  usage: 'თბილისი' | 'საგარეჯო' | 'ორივე';
  themeId: string;
  // 4. delivery
  deliveryMethod: 'ელექტრონული' | 'ბეჭდური';
  deliveryTiming: 'immediate' | 'scheduled';
  deliveryDate: string;
  address: string;
};

export type GiftCardPatch = Partial<GiftCardBuilderState>;

export type GiftCardFieldErrors = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  recipientName?: string;
  recipientEmail?: string;
  address?: string;
  deliveryDate?: string;
};
