import type { Metadata } from 'next';

import { AuthPageShell } from '@/features/auth/components/auth-page-shell';
import { LoginForm } from '@/features/auth/components/login-form';

export const metadata: Metadata = {
  title: 'შესვლა — Dermako Academy',
};

export default function LoginPage() {
  return (
    <AuthPageShell>
      <LoginForm />
    </AuthPageShell>
  );
}
