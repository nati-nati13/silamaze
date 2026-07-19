export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
};

export type EmailResult = {
  ok: boolean;
  // 'sent' = handed to a real provider; 'dev' = logged preview only, NOT delivered
  mode: 'sent' | 'dev';
  error?: string;
};

/**
 * Minimal email abstraction. No real provider is wired yet, so this runs in a
 * safe development preview mode: it logs the message and reports mode:'dev' so
 * callers never claim a real delivery happened. When a provider API key is
 * configured later, the real branch can be filled in without touching callers.
 */
class EmailService {
  private get configured(): boolean {
    return Boolean(process.env.EMAIL_PROVIDER_API_KEY);
  }

  async send(message: EmailMessage): Promise<EmailResult> {
    if (!message.to || !message.to.includes('@')) {
      return { ok: false, mode: 'dev', error: 'MISSING_RECIPIENT' };
    }

    if (!this.configured) {
      console.warn('[EMAIL:DEV] preview (not delivered)', {
        to: message.to,
        subject: message.subject,
        htmlLength: message.html.length,
      });
      return { ok: true, mode: 'dev' };
    }

    // real provider integration is intentionally deferred to a later phase
    console.warn('[EMAIL] provider send', { to: message.to, subject: message.subject });
    return { ok: true, mode: 'sent' };
  }
}

export const email = new EmailService();
export { EmailService };
