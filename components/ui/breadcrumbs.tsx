import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { BASE_URL } from '@/lib/constants';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const schemaItems = [
    { name: 'Home', url: BASE_URL },
    ...items.map((item) => ({ name: item.label, url: `${BASE_URL}${item.href}` })),
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 text-sm text-gray-500', className)}>
        <Link href="/" className="flex items-center gap-1 hover:text-[#1a1f36] transition-colors">
          <Home className="h-3.5 w-3.5" />
          <span className="sr-only">Home</span>
        </Link>
        {items.map((item, i) => (
          <span key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
            {i === items.length - 1 ? (
              <span className="font-medium text-[#1a1f36]">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-[#1a1f36] transition-colors">
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
