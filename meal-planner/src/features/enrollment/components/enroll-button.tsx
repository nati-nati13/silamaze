'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { http } from '@/shared/lib/http';

type EnrollButtonProps = {
  courseId: string;
  courseTitle: string;
};

export const EnrollButton = ({ courseId, courseTitle }: EnrollButtonProps) => {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEnroll = async () => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/akademia');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await http.post('/enrollments', { courseId, courseTitle });
      setEnrolled(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'შეცდომა';
      if (msg === 'ALREADY_ENROLLED') {
        setEnrolled(true);
      } else {
        setError('შეცდომა. სცადე კვლავ.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (enrolled) {
    return (
      <p className="text-center text-sm font-semibold text-secondary">
        ✓ ჩარიცხული ხარ
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <Button size="sm" className="w-full font-semibold" onClick={handleEnroll} disabled={loading}>
        {loading ? 'დამუშავება...' : 'ჩარიცხვა'}
      </Button>
      {error && <p className="text-center text-xs text-destructive">{error}</p>}
    </div>
  );
};
