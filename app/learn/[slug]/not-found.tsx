import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LearnNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
      <p className="mt-2 text-gray-600">
        This article doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/">
          <Button variant="secondary">Back to home</Button>
        </Link>
        <Link href="/faq">
          <Button variant="primary">Browse FAQ</Button>
        </Link>
      </div>
    </div>
  );
}
