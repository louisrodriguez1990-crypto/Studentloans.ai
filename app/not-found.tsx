import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-lg text-gray-600">Page not found</p>
      <p className="mt-1 text-sm text-gray-500">The page you&apos;re looking for doesn&apos;t exist.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button variant="primary">Back to home</Button>
        </Link>
        <Link href="/assess">
          <Button variant="secondary">Get my assessment</Button>
        </Link>
      </div>
    </div>
  );
}
