import { EMAIL, PHONE_NUMBER } from '@/shared/const/contacts.const';

// Inline styles are required for email HTML (clients strip <style>/classes),
// so these builders intentionally use style attributes.

const GREEN = '#18312B';
const CREAM = '#F7F3EA';
const BRONZE = '#B88945';
const TEXT = '#1E2521';

const shell = (inner: string): string =>
  `<div style="background:${CREAM};padding:24px;font-family:Arial,Helvetica,sans-serif;color:${TEXT}">
     <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e6e0d3">
       <div style="background:${GREEN};padding:24px;text-align:center">
         <div style="color:${CREAM};font-size:24px;font-weight:bold;letter-spacing:3px">DERMAKO</div>
         <div style="color:${BRONZE};font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-top:4px">Beauty · Academy</div>
       </div>
       <div style="padding:28px">${inner}</div>
       <div style="padding:18px 28px;background:${CREAM};font-size:12px;color:#6b6b6b">
         დახმარება: <a href="tel:${PHONE_NUMBER.replace(/\s/g, '')}" style="color:${GREEN}">${PHONE_NUMBER}</a>
         · <a href="mailto:${EMAIL}" style="color:${GREEN}">${EMAIL}</a>
       </div>
     </div>
   </div>`;

const BTN_STYLE = `background:${BRONZE};color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px`;

const row = (label: string, value: string): string =>
  `<tr><td style="padding:6px 0;color:#6b6b6b;font-size:13px">${label}</td>
       <td style="padding:6px 0;text-align:right;font-weight:bold;font-size:13px">${value}</td></tr>`;

export type BuyerEmailData = {
  code: string;
  amount: string;
  recipientName: string;
  delivery: string;
  location: string;
  status: string;
};

export function buildBuyerConfirmationEmail(d: BuyerEmailData): { subject: string; html: string } {
  const inner = `
    <h1 style="font-size:20px;margin:0 0 8px">შეკვეთა მიღებულია</h1>
    <p style="font-size:14px;line-height:1.6;color:#444;margin:0 0 16px">
      გმადლობთ! თქვენი სასაჩუქრე ბარათის მოთხოვნა მივიღეთ. ეს წერილი
      <b>არ არის</b> აქტიური ბარათი — ბარათი გააქტიურდება გადახდის დადასტურების შემდეგ.
    </p>
    <table style="width:100%;border-collapse:collapse">
      ${row('ბარათის კოდი', d.code)}
      ${row('თანხა / სერვისი', d.amount)}
      ${row('მიმღები', d.recipientName || '—')}
      ${row('მიწოდება', d.delivery)}
      ${row('ფილიალი', d.location)}
      ${row('სტატუსი', d.status)}
    </table>`;
  return { subject: 'Dermako — შეკვეთის დასტური', html: shell(inner) };
}

export type RecipientEmailData = {
  recipientName: string;
  amount: string;
  message: string;
  location: string;
  code: string;
  validUntil: string;
  qrDataUrl: string;
  verifyUrl: string;
  isAnonymous: boolean;
  displayFrom: string;
};

export function buildRecipientEmail(d: RecipientEmailData): { subject: string; html: string } {
  const senderLine = d.isAnonymous
    ? '<p style="font-size:14px;color:#444;margin:0 0 16px">თქვენ მიიღეთ Dermako-ს სასაჩუქრე ბარათი.</p>'
    : `<p style="font-size:14px;color:#444;margin:0 0 16px">გამგზავნი: <b>${d.displayFrom || 'Dermako-ს მეგობარი'}</b></p>`;
  const messageBlock =
    !d.isAnonymous && d.message
      ? `<p style="font-style:italic;color:${GREEN};background:${CREAM};padding:12px;border-radius:8px;margin:0 0 16px">„${d.message}“</p>`
      : '';
  const inner = `
    <h1 style="font-size:20px;margin:0 0 8px">${d.recipientName || 'ძვირფასო მეგობარო'}, თქვენთვის საჩუქარია!</h1>
    ${senderLine}
    ${messageBlock}
    <div style="background:${GREEN};border-radius:12px;padding:20px;text-align:center;color:${CREAM};margin:0 0 16px">
      <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:.8">სასაჩუქრე ბარათი</div>
      <div style="font-size:28px;font-weight:bold;margin:6px 0">${d.amount}</div>
      <div style="font-family:monospace;letter-spacing:2px">${d.code}</div>
    </div>
    <table style="width:100%;border-collapse:collapse">
      ${row('ფილიალი', d.location)}
      ${row('მოქმედებს', d.validUntil)}
    </table>
    <div style="text-align:center;margin:20px 0">
      <img src="${d.qrDataUrl}" alt="QR" width="200" height="200" style="border-radius:8px" />
      <div style="margin-top:10px">
        <a href="${d.verifyUrl}" style="${BTN_STYLE}">ბარათის შემოწმება</a>
      </div>
    </div>`;
  return { subject: 'თქვენ მიიღეთ Dermako-ს სასაჩუქრე ბარათი', html: shell(inner) };
}
