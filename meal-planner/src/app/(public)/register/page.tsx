import type { Metadata } from 'next';

import { AuthPageShell } from '@/features/auth/components/auth-page-shell';
import { SignUpForm } from '@/features/auth/components/signup-form';

export const metadata: Metadata = {
  title: 'რეგისტრაცია — Dermako Academy',
};

export default function RegisterPage() {
  return (
    <AuthPageShell>
      <SignUpForm />
    </AuthPageShell>
  );
}
