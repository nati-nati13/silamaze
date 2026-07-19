import QRCode from 'qrcode';

/**
 * Generates a QR code as a PNG data-URI for embedding in emails/pages.
 * The QR only ever encodes a public verification URL (never buyer data,
 * amounts, or the Mongo id).
 */
class QrCodeGenerator {
  async toDataUrl(text: string): Promise<string> {
    return QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 240,
      color: { dark: '#18312B', light: '#F7F3EA' },
    });
  }
}

export const qrCode = new QrCodeGenerator();
export { QrCodeGenerator };
